import DataSource from "./datasource";
import $ from "jquery";
import moment from "moment";

const main = () => {

    const baseUrl = "https://kitsu.io/api/edge";

    const getTrendingManga = async () => {
        try {
            const response = await fetch(`${baseUrl}/trending/manga`);
            const responseJson = await response.json();
            if (responseJson.error) {
                showResponseMessage(responseJson.message);
            } else {
                renderAllBooks(responseJson.data);
                console.log(responseJson)
            }
        } catch (error) {
            showResponseMessage(error);
        }
    }

    const displayTime = () => {
        moment.locale("en");
        $(".time").text(moment().format('LTS'));
        $(".date").text(moment().format("l"));
    };

    const updateTime = () => {
        displayTime();
        setTimeout(updateTime, 1000)
    };

    const searchElement = document.querySelector("search-bar");
    const mangaListElement = document.querySelector("#searchlist");

    const onButtonSearchClicked = async () => {
        try {
            const result = await DataSource.searchManga(searchElement.value);
            renderResult(result);
        } catch (message) {
            fallbackResult(message)
        }
    };

    const renderResult = results => {
        mangaListElement.innerHTML = "";
        results.forEach(manga => {
            const {
                canonicalTitle,
                posterImage,
                serialization
            } = manga.attributes;
            const mangaElement = document.createElement("div");
            mangaElement.setAttribute("class", "manga");

            mangaElement.innerHTML = `
                    <div class="custom-cards">
                    <img src=${posterImage.original} alt="" >
                    <div class="info">
                        <div class="manga-title">
                            <h5>${canonicalTitle}</h5>
                        </div>
                        <div class="author">
                            <p>${serialization}</p>
                        </div>
                    </div>
                </div>
                `;

            mangaListElement.appendChild(mangaElement);
        })
    };

    const fallbackResult = message => {
        mangaListElement.innerHTML = "";
        mangaListElement.innerHTML += `<h2 class="placeholder">${message}</h2>`;
    };

    searchElement.clickEvent = onButtonSearchClicked;

    const renderAllBooks = (books) => {
        const listBookElement = document.querySelector("#listBook");
        listBookElement.innerHTML = "";

        books.forEach(book => {
            listBookElement.innerHTML += `
                <div class="custom-cards">
                <img src=${book.attributes.posterImage.original} alt="" >
                <div class="information">
                    <div class="rating-box">
                        <h5>&#9733; ${Math.round(book.attributes.averageRating)}</h5>
                    </div>
                    <div class="title">
                        <h5>${book.attributes.canonicalTitle}</h5>
                    </div>
                    <div class="desc">
                        <p>${book.attributes.status}</p>
                    </div>
                </div>
            </div>
            `;
        });

        const buttons = document.querySelectorAll(".button-delete");
        buttons.forEach(button => {
            button.addEventListener("click", event => {
                const bookId = event.target.id;
                removeBook(bookId);
            })
        })
    };

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {
        getTrendingManga();
        updateTime();
    });
}

export default main;