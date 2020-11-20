let myLibrary = [];
let errorMessage;
let mainContainer = document.getElementById("main-container");
let modalBox = document.getElementById("modal-box");

// constructor for books
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// adding function to Books prototype
Book.prototype.addBook = function (event) {
    myLibrary.push(this);
    clearCards();
    createCards();
}

// takes input and creates a new book, then adds to myLibrary array
function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    newBook.addBook();
}

// clear existing cards
function clearCards() {
    mainContainer.innerHTML = "";
}

// create HTML cards to display all books
function createCards() {
    for (let i = 0; i < myLibrary.length; i++) {

        // create new card
        // also adds a data tag for the index in myLibrary array
        let newCardDiv = document.createElement("div");
        newCardDiv.classList.add("card-container");
        newCardDiv.setAttribute("index", "index"+(i+1));
        mainContainer.appendChild(newCardDiv);

        // create title div and add books title as text
        let newTitle = document.createElement("div");
        newTitle.classList.add("title");
        newCardDiv.appendChild(newTitle);
        let cardTitle = myLibrary[i].title.toUpperCase();
        newTitle.innerText = cardTitle;

        // create author div and add books author as text
        let newAuthor = document.createElement("div");
        newAuthor.classList.add("author");
        newCardDiv.appendChild(newAuthor);
        let cardAuthor = myLibrary[i].author;
        newAuthor.innerText = cardAuthor;

        // create pages div and add books # of pages as text
        let newPages = document.createElement("div");
        newPages.classList.add("pages");
        newCardDiv.appendChild(newPages);
        let cardPages = myLibrary[i].pages;
        newPages.innerText = cardPages + " pages";

        // create read div and add checkbox for if read
        let newRead = document.createElement("INPUT");
        newRead.classList.add("read");
        newRead.setAttribute("type", "checkbox");
        newCardDiv.appendChild(newRead);
        let cardRead = myLibrary[i].read;
        if (cardRead === true) {
            newRead.checked = true;
        }

        // newRead.addEventListener("change", colourOfCard());
    } colourOfCard();
}

// create pop up for user input of new book
function modalInput() {
    modalBox.style.display = "block";
}

// submit user data from modal pop up
function modalSubmit() {
    title = document.getElementById("input-title").value;
    author = document.getElementById("input-author").value;
    pages = document.getElementById("input-pages").value;
    pages = parseInt(pages);
    read = document.getElementById("check-read").checked;
    errorMessage = document.getElementById("error-message");

    // prevent submit with blank info
    while (title == "") {
        errorMessage.textContent = "Please enter a title";
        return false;
    }
    while (author == "") {
        errorMessage.textContent = "Please enter an author";
        return false;
    }
    while (pages == "" || isNaN(pages)) {
        errorMessage.textContent = "Please enter the number of pages"
        return false;
    }

    // hide modal box on submit
    modalBox.style.display = "none";
    addBookToLibrary(title, author, pages, read);

    // clear input fields
    document.getElementById("input-title").value = "";
    document.getElementById("input-author").value = '';
    document.getElementById("input-pages").value = '';
    errorMessage.textContent = "";
}

// change the bg colour of the card, if book is read
function colourOfCard () {
    let cardContainer = document.querySelectorAll(".card-container");
    for (let j = 0; j < myLibrary.length; j++) {
        let checkmark = cardContainer[j].querySelector(".read").checked;
        if (checkmark === true) {
            cardContainer[j].style.backgroundColor = "green";
        } else {
            cardContainer[j].style.backgroundColor = "rgb(105, 58, 58)";
        }
    }
}

addBookToLibrary("hobbit", "JRR", "259", true);
addBookToLibrary("queen's gambit", "Tevis", "72", false);