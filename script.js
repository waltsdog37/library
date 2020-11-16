let myLibrary = [];
let newBook;
let title;
let author;
let pages;
let read;

let mainContainer = document.querySelector(".main-container");
let modalBox = document.getElementById("modal-box");

// constructor for books
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// adding function to Books prototype
Book.prototype.addBook = function() {
    myLibrary.push(this);
    createCards();
}

// takes input and creates a new book, then adds to myLibrary array
function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    newBook.addBook();
}

// create HTML cards to display all books
function createCards(){
    for (let i=0; i < myLibrary.length; i++) {
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
function modalSubmit() {
    title = document.getElementById("input-title");
    author = document.getElementById("input-author");
    pages = document.getElementById("input-pages");
    read = true;
    addBookToLibrary(title, author, pages, read);
    modalBox.style.display = "none";
}



// dummy books - can be deleted
title = "hobbit";
author = "JRR";
pages = 259;
read = true;

addBookToLibrary(title, author, pages, read);

title = "Dragons of Autumn Twilight";
author = "Margaret Weis";
pages = 350;
read = true;

addBookToLibrary(title, author, pages, read);

title = "Dragons of Winter Night";
author = "Margaret Weis";
pages = 300;
read = true;

addBookToLibrary(title, author, pages, read);
createCards();
