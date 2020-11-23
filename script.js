let myLibrary;
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
    addStorage();
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
        newCardDiv.setAttribute("index", "index" + i);
        mainContainer.appendChild(newCardDiv);

        let cardFlip = document.createElement("div");
        cardFlip.classList.add("card-flip");
        newCardDiv.appendChild(cardFlip);

        let newFront = document.createElement("div");
        newFront.classList.add("card-front");
        cardFlip.appendChild(newFront);

        let newBack = document.createElement("div");
        newBack.classList.add("card-back");
        cardFlip.appendChild(newBack);

        // create title div and add book's title as text
        let newTitle = document.createElement("div");
        newTitle.classList.add("title");
        newFront.appendChild(newTitle);
        let cardTitle = myLibrary[i].title.toUpperCase();
        newTitle.innerText = cardTitle;

        // create author div and add book's author as text
        let newAuthor = document.createElement("div");
        newAuthor.classList.add("author");
        newBack.appendChild(newAuthor);
        let cardAuthor = myLibrary[i].author;
        newAuthor.innerText = cardAuthor;

        // create pages div and add book's # of pages as text
        let newPages = document.createElement("div");
        newPages.classList.add("pages");
        newBack.appendChild(newPages);
        let cardPages = myLibrary[i].pages;
        newPages.innerText = cardPages + " pages";

        // create read div and add checkbox for if read
        let newReadButton = document.createElement("button");
        newReadButton.classList.add("read");
        newReadButton.innerText = "Read";
        newReadButton.addEventListener("click", function () {
            readStatus(i);
        });
        newBack.appendChild(newReadButton);

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteBook(i);
        });
        newBack.appendChild(deleteButton);

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
    document.getElementById("input-author").value = "";
    document.getElementById("input-pages").value = "";
    errorMessage.textContent = "";
}

// change the bg colour of the card, if book is read
function colourOfCard() {
    let frontContainer = document.querySelectorAll(".card-front");
    //let button = document.querySelectorAll("button");
    for (let j = 0; j < myLibrary.length; j++) {
        let ifRead = myLibrary[j].read;
        if (ifRead === true) {
            frontContainer[j].style.backgroundColor = "green";
        } else {
            frontContainer[j].style.backgroundColor = "rgb(105, 58, 58)";
        }
    }
}

// change read status when checkbox is checked
function readStatus(i) {
    if (myLibrary[i].read === false) {
        myLibrary[i].read = true;
    } else {
        myLibrary[i].read = false;
    }
    addStorage();
    colourOfCard();
}

// delete a book from the array and reload cards
function deleteBook(i) {
    myLibrary.splice(i, 1);
    addStorage();
    clearCards();
    createCards();
}

// add myLibrary to local storage
function addStorage() {
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

// retrieve myLibrary from local storage
function getStorage() {
    myLibrary = JSON.parse(localStorage.getItem("library"));
    if (myLibrary == null) {
        myLibrary = [];
    }
    createCards();
}

getStorage();