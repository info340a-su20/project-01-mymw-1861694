'use strict';
const bookList = {reading:[ {
    bookTitle: "Lord of the Rings",
    pagesRead: 10,
    pagesTotal: 146,
    coverImg: "./img/littleprince.jpg",
    read: 0
} ], 
past: [{
    bookTitle: "Liar",
    pagesRead: 10,
    pagesTotal: 146,
    coverImg: "./img/hungrycaterpillar.jpg",
    read: 1
}],
"history": [{
    "Date": "21 August 2020",
    "Book": "Hungry Caterpillar",
    "Number of Pages Read": 9,
    "Completed": false,
    "Re-read": false
}]
}
//let bookList = fetch("./data.JSON")
//.then(function(response) {
//  return response.json();  
//})

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
    bookCover.src = singleBook.coverImg;
    section.appendChild(bookCover);
    let h3 = document.createElement('h3');
    h3.textContent = singleBook.bookTitle;
    section.appendChild(h3);
    let p = document.createElement('p');
    p.textContent = "Number of pages read: " + singleBook.pagesRead;
    section.appendChild(p);
    let p2 = document.createElement('p');
    p2.textContent = "Total number of pages: " + singleBook.pagesTotal;
    section.appendChild(p2);

    let readPages = document.createElement('input');
    readPages.setAttribute('aria-label', 'Put in the number of pages read for ' + singleBook.bookTitle);
    readPages.type = "text";
    readPages.placeholder = "Number of Pages Read";
    section.appendChild(readPages);

    let submitPages = document.createElement('button');
    submitPages.setAttribute('aria-label', 'Submit the number of pages read for ' + singleBook.bookTitle);
    submitPages.textContent = "Submit Pages Read";
    submitPages.addEventListener('click', function(pages) {
        pages.preventDefault();
        singleBook.pagesRead = singleBook.pagesRead + Number(readPages.value);
        console.log(singleBook.pagesRead);
        fetchAllBooks();
    });
    section.appendChild(submitPages);

    let complete = document.createElement('button');
    complete.setAttribute('aria-label', 'Complete ' + singleBook.bookTitle);
    complete.textContent = "Complete";
    section.appendChild(complete);

    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('aria-label', 'Delete ' + singleBook.bookTitle);
    deleteBtn.textContent = "Delete";
    section.appendChild(deleteBtn);
    return section;
}

//Add books to list of current books being read
function renderAllBooks(books) {
    let currentBooks = document.querySelector('#currentBooks');
    currentBooks.innerHTML = "";
    for (let i = 0; i < books.reading.length; i++) {
        currentBooks.appendChild(renderBook(books.reading[i]));
    }
}

//Mark books as read
//Create a new book from the info given by the user
function renderPastBook(singleBook) {
    let section = document.createElement('section');
    section.classList.add('past');
    let bookCover = document.createElement('img');
    bookCover.src = singleBook.coverImg; //FIND WHERE IMAGE GOES IN ARRAY & how to set 
    section.appendChild(bookCover);
    let h3 = document.createElement('h3');
    h3.textContent = singleBook.bookTitle;
    section.appendChild(h3);
    let p = document.createElement('p');
    p.textContent = "Total pages: " + singleBook.pagesTotal;
    section.appendChild(p);
    let p2 = document.createElement('p');
    p2.textContent = "Number of times read: " + singleBook.read;
    section.appendChild(p2);

    //Fix button id and where info goes and changes
    let reread = document.createElement('button');
    reread.setAttribute('aria-label', 'Re-read ' + singleBook.bookTitle);
    reread.textContent = "Re-read";
    section.appendChild(reread);
    return section;
}

//Add books to list of past books
function renderAllPastBooks(books) {
    let pastBooks = document.querySelector('#pastBooks');
    for (let i = 0; i < books.past.length; i++) {
        pastBooks.appendChild(renderPastBook(books.past[i]));
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

//Execute all above functions
function fetchAllBooks() {
    //return fetch
    renderAllBooks(bookList);
    renderAllPastBooks(bookList);   

}
fetchAllBooks();

//.catch(function(error) {
//  renderError(error);
//})