import DataSource from "./datasource";

const main = () => {
    
    const baseUrl = "https://kitsu.io/api/edge";

    const getTrendingManga = async () => {
        try {
            const response = await fetch(`${baseUrl}/trending/manga`);
            const responseJson = await response.json();
            if(responseJson.error) {
               showResponseMessage(responseJson.message);
            } else {
               renderAllBooks(responseJson.data);
               console.log(responseJson)
            }
          } catch(error) {
             showResponseMessage(error);
          }
    }

    const searchElement = document.querySelector("search-bar");
    const clubListElement = document.querySelector("#searchlist");
  
    const onButtonSearchClicked = async () => {
        try {
            const result = await DataSource.searchManga(searchElement.value);
            renderResult(result);
        } catch (message) {
            fallbackResult(message)
        }
    };
  
    const renderResult = results => {
        clubListElement.innerHTML = "";
        results.forEach(club => {
            const { canonicalTitle, posterImage, description, averageRating } = club.attributes;
            const clubElement = document.createElement("div");
            clubElement.setAttribute("class", "club");
  
            clubElement.innerHTML = `
                    <div class="custom-cards">
                    <img src=${posterImage.original} alt="" >
                    <div class="information">
                        <div class="rating-box">
                            <h5>&#9733; ${Math.round(averageRating)}</h5>
                        </div>
                        <div class="title">
                            <h5>${canonicalTitle}</h5>
                        </div>
                        <div class="desc">
                            <p>${description}</p>
                        </div>
                    </div>
                </div>
                `;
  
            clubListElement.appendChild(clubElement);
        })
    };
  
    const fallbackResult = message => {
        clubListElement.innerHTML = "";
        clubListElement.innerHTML += `<h2 class="placeholder">${message}</h2>`;
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
    });
}


export default main;