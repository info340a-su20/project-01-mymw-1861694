'use strict';

//Add a new book
let addNewBook = document.querySelector('#addBook');
addNewBook.addEventListener('click', function(response) {
    response.preventDefault();
    let newTitle = document.querySelector('#newBookTitle');
    let newPages = document.querySelector('#newBookPagesRead');
    let newImg = document.querySelector('#bookImg');
    let newObj = {
        "bookTitle": newTitle.value,
		"pagesRead": 0,
		"pagesTotal": newPages.value,
		"coverImg": "./img/book.jpg",
        "read": 0,
        "new": true,
		"complete": false
    }
    booklist.reading.push(newObj);
    newHistory(newObj.bookTitle, newObj.pagesRead, false);
    fetchAllBooks();
})

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
        if (singleBook.pagesRead > singleBook.pagesTotal) {
            singleBook.pagesRead = singleBook.pagesRead - Number(readPages.value);
        } else if (singleBook.pagesRead == singleBook.pagesTotal) {
            singleBook.complete = true;
            singleBook.read++;
            newHistory(singleBook.bookTitle, singleBook.pagesRead, true); 
            singleBook.pagesRead = 0;
        } else {
            newHistory(singleBook.bookTitle, singleBook.pagesRead, false); 
        }
        fetchAllBooks();
    });
    section.appendChild(submitPages);

    let complete = document.createElement('button');
    complete.setAttribute('aria-label', 'Complete ' + singleBook.bookTitle);
    complete.textContent = "Complete";
    complete.addEventListener('click', function(pages) {
        pages.preventDefault();
        singleBook.complete = true;
        singleBook.read++;
        newHistory(singleBook.bookTitle, singleBook.pagesRead, true);
        singleBook.pagesRead = 0;
        fetchAllBooks();
    })
    section.appendChild(complete);

    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('aria-label', 'Delete ' + singleBook.bookTitle);
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener('click', function(pages) {
        pages.preventDefault();
        singleBook.delete = true;
        fetchAllBooks();
    })
    section.appendChild(deleteBtn);
    return section;
}

//Add books to list of current books being read
function renderAllBooks(books) {
    let currentBooks = document.querySelector('#currentBooks');
    currentBooks.innerHTML = "";
    for (let i = 0; i < books.reading.length; i++) {
        let thisBook = books.reading[i];
       if (thisBook.delete) {
            books.reading.splice(i, 1);
       } else if (thisBook.complete && thisBook.new) {
           //if record exists in array, becomes added twice :((
            books.past.push(thisBook);
            thisBook.new = false;
       } else if (thisBook.complete) {
            for (let j = 0; j < books.past.length; j++) {
                if (thisBook.bookTitle == books.past[j].bookTitle) {
                    books.past[j].complete = true;
                    renderAllPastBooks(booklist);
                }
            }
        } else {
            currentBooks.appendChild(renderBook(thisBook));
        }
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
    //let reread = document.createElement('button');
    //reread.setAttribute('aria-label', 'Re-read ' + singleBook.bookTitle);
    //reread.textContent = "Re-read";
    //reread.addEventListener('click', function(pages) {
    //    pages.preventDefault();
    //    singleBook.complete = false;
    //    fetchAllBooks();
    //})
    //section.appendChild(reread);
    return section;
}

//Add books to list of past books
function renderAllPastBooks(books) {
    let pastBooks = document.querySelector('#pastBooks');
    pastBooks.innerHTML = "";
    if (books.past.length > 0) {
        for (let i = 0; i < books.past.length; i++) {
            let thisBook = books.past[i];
           // if (!thisBook.complete) {
           //     for (let j = 0; j < books.reading.length; j++) {
           //         if (thisBook.bookTitle == books.reading[j].bookTitle) {
           //             books.reading[j].complete = false;
           //             renderAllBooks(booklist);
           //         }
           //     } 
           // } else {
                pastBooks.appendChild(renderPastBook(thisBook));
           // }
        }
    }    
}

//Create a new history object
function newHistory(title, pages, complete) {
    // Learned from https://tecadmin.net/get-current-date-time-javascript/
    let newObj = {
        "date": new Date(),
		"bookTitle": title,
		"noPages": pages,
		"complete": complete
    }
    booklist.history.push(newObj);
}


//function to push history everytime something happens
function renderHistoryEntry(records) {
    let section = document.createElement('section');
    let h3 = document.createElement('h3');
    h3.textContent = "Date:" + records.date;
    section.appendChild(h3);
    let p = document.createElement('p');
    p.textContent = "Book Title:" + records.bookTitle;
    section.appendChild(p);
    let p2 = document.createElement('p');
    p2.textContent = "Number of pages read: " + records.noPages;
    section.appendChild(p2);
    if (records.complete) {
        let p3 = document.createElement('p');
        p3.textContent = "Completed the book!";
        section.appendChild(p3);
    }
    return section;
}

function renderAllHistory(allRecords) {
    let pastHistory = document.querySelector('#history');
    pastHistory.innerHTML = "";
    for (let i = 0; i < allRecords.history.length; i++) {
        pastHistory.appendChild(renderHistoryEntry(allRecords.history[i]));
    }
}


//Execute all above functions
let booklist = "";
function fetchAll() {
    return fetch("./booklist.json", {mode: "no-cors"})
    .then(function(response) {
        return response.json();  
    }).then(function(newResponse) {
        booklist = newResponse;
        return fetchAllBooks();
    })
}

function fetchAllBooks() {
    renderAllBooks(booklist);
    renderAllPastBooks(booklist);
    renderAllHistory(booklist);
}

fetchAll();

//.catch(function(error) {
//  renderError(error);
//})