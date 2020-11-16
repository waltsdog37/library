let myLibrary = [];

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
    console.log(myLibrary);
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
        let newCardDiv = document.createElement("div");
        newCardDiv.classList.add("card-container");
        mainContainer.appendChild(newCardDiv);

        // create title div and add books title as text
        let newTitle = document.createElement("div");
        newTitle.classList.add("title");
        newCardDiv.appendChild(newTitle);
        let cardTitle = myLibrary[i].title;
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
        newPages.innerText = cardPages;
    }
}

// create pop up for user input of new book
function modalInput() {
    modalBox.style.display = "block";
}

// submit user data from modal pop up
function modalSubmit(event) {
    title = document.getElementById("input-title").value;
    author = document.getElementById("input-author").value;
    pages = document.getElementById("input-pages").value;
    read = true;
    modalBox.style.display = "none";
    addBookToLibrary(title, author, pages, read);

    // clear input fields
    //form.reset();
}


// dummy books - can be deleted
title = "The Hobbit";
author = "JRR Tolkien";
pages = 259;
read = true;

addBookToLibrary(title, author, pages, read);

title = "Queen's Gambit";
author = "Walter Tevis";
pages = 243;
read = true;

addBookToLibrary(title, author, pages, read);

