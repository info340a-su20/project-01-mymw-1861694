'use strict';
const bookList = {reading:[ {
    bookTitle: "Queen",
    pagesRead: "10",
    pagesTotal: "146",
    coverImg: "./img/caterpillar.jpg",
    read: 0
} ], 
past: [{
    bookTitle: "Liar",
    pagesRead: "10",
    pagesTotal: "146",
    coverImg: "./img/caterpillar.jpg",
    read: 1
}]
}

//let addUser = document.querySelector('');
//addUser.addEventListener('submit', function(newUser) {
 //   newUser.preventDefault();
    //Create new page
    //Add user's name
//})

//Create a new book from the info given by the user
function renderBook(singleBook) {
    let section = document.createElement('section');
    section.classList.add('current');
    let bookCover = document.createElement('img');
    bookCover.src = singleBook.coverImg; //FIND WHERE IMAGE GOES IN ARRAY & how to set 
    section.appendChild(bookCover);
    let h3 = document.createElement('h3');
    h3.textContent = singleBook.bookTitle;
    section.appendChild(h3);
    //let edit = document.createElement('button');
    //button <button><i aria-label="Edit book entry" class="far fa-edit"></i></button> leads to change pages to less than current value or change no of pages or title
    p.textContent = "Number of pages read: " + singleBook.pagesRead;
    section.appendChild(p);
    let p2 = document.createElement('p');
    p2.textContent = "Total number of pages: " + singleBook.pagesTotal;
    section.appendChild(p2);
    return section;
    //2 buttons    <button>Read 10 pages</button>
    //<button>Complete</button>
}

//Add books to list of current books being read
function renderAllBooks(books) {
    let currentBooks = document.querySelector('#currentBooks');
    for (let i = 0; i < books.reading.length; i++) {
        currentBooks.appendChild(renderBook(books.reading[i]));
      }
}

renderAllBooks(bookList);

//Mark books as read
//Create a new book from the info given by the user
function renderBook(singleBook) {
    let section = document.createElement('section');
    section.classList.add('past');
    let bookCover = document.createElement('img');
    bookCover.src = singleBook.coverImg; //FIND WHERE IMAGE GOES IN ARRAY & how to set 
    section.appendChild(bookCover);
    let h3 = document.createElement('h3');
    h3.textContent = singleBook.bookTitle;
    section.appendChild(h3);
    //let edit = document.createElement('button');
    //button <button><i aria-label="Edit book entry" class="far fa-edit"></i></button> leads to change pages to less than current value or change no of pages or title
    let p = document.createElement('p');
    p.textContent = "Total pages: " + singleBook.pagesTotal;
    section.appendChild(p);
    let p2 = document.createElement('p');
    p2.textContent = "Number of times read: " + singleBook.read;
    section.appendChild(p2);
    return section;
    //2 buttons    <button>Read 10 pages</button>
    //<button>Complete</button>
}

//<section class="previous">
//<img src="img/hungrycaterpillar.jpg">
//<h3>The Very Hungry Caterpillar</h3>
//<p>22 pages total</p>
//<p>Book has been read 5 times</p>
//<button>Re-read</button>
//<button>Edit</button>
//</img></section>

//Add books to list of past books
function renderAllBooks(books) {
    let pastBooks = document.querySelector('#pastBooks');
    for (let i = 0; i < books.past.length; i++) {
        pastBooks.appendChild(renderBook(books.past[i]));
      }
}

//Re-read a book



    //goes elsewhere
   // let addBook = document.querySelector('#addBook');
  //  addBook.addEventListener('click', function(add) {
  //  add.preventDefault();
    //Move all info to respective places
//})
//}
