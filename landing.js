const search_button = document.getElementById("search-btn");
const search = document.getElementById("search-book");
const book_show = document.getElementById("book-show");
let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
search_button.addEventListener("click", (e) => {
  e.preventDefault();
  const search_input = search.value.trim();

  const h3 = document.createElement("h3");
  h3.textContent = `Book Results for "${search_input}"`;

  if (search_input !== "") {
    book_show.innerHTML = "";
    book_show.appendChild(h3);

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${search_input}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          data.items.forEach((item) => {
            const bookTitle = item.volumeInfo.title;
            const bookAuthor = item.volumeInfo.authors?.join(", ");
            const bookCoverImage = item.volumeInfo.imageLinks?.thumbnail;
            const bookPages = item.volumeInfo.pageCount;
            const bookPublisher = item.volumeInfo.publisher;

            const show_history = document.getElementById("show-history");
            show_history.classList.remove("hidden");

            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");

            const coverImage = document.createElement("img");
            coverImage.src = bookCoverImage;
            bookCard.appendChild(coverImage);

            const title = document.createElement("p");
            title.textContent = `Title : ${bookTitle}`;
            bookCard.appendChild(title);

            const author = document.createElement("p");
            author.textContent = `Author: ${bookAuthor}`;
            bookCard.appendChild(author);

            const pageCount = document.createElement("p");
            pageCount.textContent = `Page Count: ${bookPages}`;
            bookCard.appendChild(pageCount);

            const publisher = document.createElement("p");
            publisher.textContent = `Publisher: ${bookPublisher}`;
            bookCard.appendChild(publisher);

            const buyButton = document.createElement("button");
            buyButton.classList.add("buy-button");
            buyButton.textContent = "Buy Now";
            bookCard.appendChild(buyButton);

            book_show.appendChild(bookCard);
          });
          history.unshift(search_input);
          localStorage.setItem("searchHistory", JSON.stringify(history));
          updateSearchHistory();
        } else {
          const message = document.createElement("p");
          message.textContent = "No _book_show found.";
          book_show.appendChild(message);
        }
      });
  }
});

const show_history = document.getElementById("show-history");

show_history.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "history.html";
  updateSearchHistory();
});

const searchHistory = document.getElementById("search-history");

function updateSearchHistory() {
  searchHistory.innerHTML = "";
  for (let i = 0; i < history.length; i++) {
    const li = document.createElement("li");
    li.style.textAlign = "center";
    li.style.cursor = "pointer";
    li.style.border = "2px solid white";
    li.style.padding = "10px";
    li.textContent = `${i + 1}. ${history[i]} Searched On: `;

    li.addEventListener("click", (event) => {
      event.preventDefault();
      search_input.value = history[i];
      search_button.dispatchEvent(new Event("submit"));
    });
    searchHistory.appendChild(li);
  }
}
