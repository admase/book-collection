/**
 * Library Project written in JavaScript 
 */

"use strict";

const showFormBtn = document.getElementById('showForm');
const formContainer = document.querySelector('.form-container');
const tableContainer = document.querySelector('.table-container');
const collection = document.getElementById('collection');

// Class Book
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

// Library Class
class Library
{
    static displayBooksOnRecord()
    {
        // 1. All of the book objects are stored in a array.
        const myLibrary = [
            {
                title: 'Moby Dick',
                author: 'Herman Melville',
                pages: '600',
                read: true
            },
            {
                title: 'A History of the Pacific Islands',
                author: 'Steven Roger Fischer',
                pages: '331',
                read: false
            },
        ];

        const books = myLibrary;

        books.forEach((book) => Library.addBookToList(book));
    }

    static addBookToList(book)
    {
        const list = document.getElementById('collection');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td><a href="#" role="button" class="btn btn-sm edit" title="Edit Has Read">${book.read}</a></td>
            <td><a href="#" role="button" class="btn text-red btn-sm delete" title="Remove Book"><i class="fas fa-trash fa-fw"></i></a></td>
        `;

        list.appendChild(row);
    }

    static removeBook(el)
    {
        if (el.classList.contains('delete'))
        {
            console.log(el);
            el.parentElement.parentElement.remove();
        }
    }

    static toggleRead(el)
    {
        if (el.text.includes('true'))
        {
            el.innerText = 'false';
        }
        else 
        {
            el.innerText = 'true';
        }
    }

    static clearForm()
    {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('pages').value = '';
        document.getElementById('read').value = '';
    }
}

// 3. A function that loops through the array and displays each book.
document.addEventListener('DOMContentLoaded', Library.displayBooksOnRecord);


// 2. A function (not a constructor) that takes a user's input and store the new book object into an array.
document.getElementById('bookForm').addEventListener('submit', (e) => {

    e.preventDefault();

    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    // Validate
    if (title === '' || author === '' || pages === '' || read === '')
    {
        alert('Please Fill-In All Fields!');
    }
    else
    {        
        // Instantiate book
        const book = new Book(title, author, pages, read);
        
        formContainer.style.display = 'none';
     
        // Add book to library
        Library.addBookToList(book);

        // Clear form fields
        Library.clearForm();
    }
});

// Show Form
showFormBtn.addEventListener('click', (evt) => {
    formContainer.style.display = 'block';
});

// Remove a book
document.getElementById('collection').addEventListener('click', (e) => {
    Library.removeBook(e.target);
});

// Edit read
document.getElementById('collection').addEventListener('click', (e) => {
    Library.toggleRead(e.target);
});