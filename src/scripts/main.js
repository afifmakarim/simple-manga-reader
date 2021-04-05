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

    const renderAllBooks = (books) => {
        const listBookElement = document.querySelector("#listBook");
        listBookElement.innerHTML = "";

        books.forEach(book => {
            listBookElement.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
                    <div class="card">
                        <div class="card-body">
                            <h5>(${book.attributes.slug}) ${book.attributes.slug}</h5>
                            <p>${book.attributes.slug}</p>
                            <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
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