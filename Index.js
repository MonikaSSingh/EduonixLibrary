console.log("Index Page");

function Book(Name, Author, Description, Genre, ISBN,PubComp) {
    this.Name = Name;
    this.Author = Author;
    this.Description = Description;
    this.Genre = Genre;
    this.ISBN = ISBN;
    this.PubComp= PubComp;
}

//Display Constructor

function Display() {
    //store.getBooks();
}

//add methods to display prototype

Display.prototype.add = function (book) {
    console.log("Adding to UI");

    tableBody = document.getElementById('tableBody');
    let bookData = `<tr>
                        <td>${book.Name}</td>
                        <td>${book.Author}</td>
                        <td>${book.Description}</td>
                        <td>${book.Genre}</td>
                        <td>${book.ISBN}</td>
                        <td>${book.PubComp}</td>
                        <td> <button  id="DeleteBook" onClick="DeleteBook(this.id)" class="btn btn-danger delete">Delete</button></td>
                    </tr> `;

    tableBody.innerHTML += bookData;
}

Display.prototype.clear = function () {
    let libraryForm = document.getElementById('AddBookForm');
    libraryForm.reset();
}
Display.prototype.validate = function (book) {
    // debugger;
    if (book.Name.length < 2 || book.Author.length < 2 || book.ISBN.length < 4) {
        return false;
    }
    else {
        return true;
    }
}
Display.prototype.show = function (type, message) {
    let msg = document.getElementById('message');
    msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                        <strong>Message : </strong> ${message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`;


    setTimeout(function () {
        msg.innerHTML = ''
    }, 2000);
}

Display.prototype.DeleteBook = function (e) {
    if (e.classList.contains("delete")) {
        e.parentElement.parentElement.remove();
        return true;
    }
    else {
        return false;
    }
}


//add submit event listener

let libraryForm = document.getElementById('AddBookForm');
libraryForm.addEventListener('submit', librayFormSubmit);

function librayFormSubmit(e) {

    console.log("LibraryForm");

    let name = document.getElementById('bookName').value;
    let author = document.getElementById('bookAuthor').value;
    let description = document.getElementById('bookDesc').value;
    let isbn= document.getElementById('bookISBN').value;
    let pubcomp= document.getElementById('bookPubCompany').value;

    console.log("name" + name);

    let comp = document.getElementById('IT');
    let civil = document.getElementById('Civil');
    let mech = document.getElementById('Mechanical');

    let genre;
    if (comp.checked) {
        genre = IT.value;
    }
    else if (civil.checked) {
        genre = civil.value;
    }
    else if (mech.checked) {
        genre = mech.value;
    }

    console.log("Genre " + genre);

    let book = new Book(name, author, description, genre,isbn,pubcomp);
    console.log(book);

    let display = new Display();
    if (display.validate(book)) {
        display.add(book);

        //LocalStorage
        let bookExists = localStorage.getItem("Book");
        if (bookExists == null) {
            bookObj = [];
            console.log("Book Object is null " + bookObj);
        }
        else {
            //  debugger;
            bookObj = JSON.parse(bookExists);
            debugger;
            console.log("Book Object " + book);
        }

        bookObj.push(book);
        localStorage.setItem("Book", JSON.stringify(bookObj));


        display.clear();
        display.show('success', 'New Book Added Successfully')
    }
    else {
        display.show('danger', 'Sorry! Try Again')
    }

    e.preventDefault();
}


//store the books in local storage

class store {
    static getBooks() {
        let bookExists = localStorage.getItem("Book");
        console.log("BookExists " + bookExists);

        if (bookExists == null) {
            bookObj = [];
            console.log("Book Object is null " + bookObj);
        }
        else {
            debugger;
            bookObj = JSON.parse(bookExists);
            debugger;
            console.log("Book Object " + book);
        }
        return bookObj;
    }
    static addBook(bookObj) {
        let books = store.getBooks()
        bookObj.push(book);
        localStorage.setItem("Book", JSON.stringify(books));
    }
    static removeBook(isbn) {
        let books = store.getBooks()
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        })
        localStorage.setItem("Book", JSON.stringify(books));
    }
}

document.querySelector('#tableBody').addEventListener('click', function (e) {
    console.log(e.target);
    let display = new Display();
    if (display.DeleteBook(e.target)) {
        display.show('success', 'Book Deleted Successfully');
    }
    else {
        display.show('danger', 'Sorry! Try Again')
    }
})
