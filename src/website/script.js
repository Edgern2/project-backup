// script.js
import books from '../data/books.js';

const bookGrid = document.querySelector('.book-grid');
const bookDetailModal = document.getElementById('book-detail');
const closeButton = document.querySelector('.close-button');

const genreFilter = document.getElementById('genreFilter');
const authorFilter = document.getElementById('authorFilter');
const availabilityFilter = document.getElementById('availabilityFilter');

const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('login-message');
const accountInfo = document.getElementById('account-info');
const currentLoans = document.getElementById('current-loans');
const reservationHistory = document.getElementById('reservation-history');




// Function to display books in the grid
function displayBooks(books) {

    bookGrid.innerHTML = ''; // Clear the grid

    books.forEach(book => {

        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `
            <img class="book-cover" src="${book.cover}" alt="${book.title}">
            <div class="book-details">
                <h3>${book.title}</h3>
                <p>By ${book.author}</p>
            </div>
        `;


        // Event listener to open the modal
        bookItem.addEventListener('click', () => {
            displayBookDetail(book);
        });
        bookGrid.appendChild(bookItem);
    });
}


// Function to display book details in the modal
function displayBookDetail(book) {

    document.getElementById('detail-title').textContent = book.title;
    document.getElementById('detail-cover').src = book.cover;
    document.getElementById('detail-author').textContent = "By " + book.author;
    document.getElementById('detail-description').textContent = book.description;
    document.getElementById('detail-availability').textContent = "Available at: " + book.availability.join(', ');
  
    bookDetailModal.style.display = 'block';
}

// Function to make filters work
function populateFilterOptions() {
    const genres = new Set();
    const availabilities = new Set();

    books.forEach(book => {
        book.genres.forEach(genre => genres.add(genre));
        book.availability.forEach(availability => availabilities.add(availability));
    });

    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.text = genre;
        genreFilter.add(option);
    });

    availabilities.forEach(availability => {
        const option = document.createElement('option');
        option.value = availability;
        option.text = availability;
        availabilityFilter.add(option);
    });
}


// Filter books based on selected criteria
function filterBooks() {
    const selectedGenre = genreFilter.value;
    const selectedAuthor = authorFilter.value.toLowerCase();
    const selectedAvailability = availabilityFilter.value;

    const filteredBooks = books.filter(book => {
        const matchesGenre = selectedGenre === '' || book.genres.includes(selectedGenre);
        const matchesAuthor = selectedAuthor === '' || book.author.toLowerCase().includes(selectedAuthor);
        const matchesAvailability = selectedAvailability === '' || book.availability.includes(selectedAvailability);
        return matchesGenre && matchesAuthor && matchesAvailability;
    });

    displayBooks(filteredBooks);
}


// Event listener for closing the modal
closeButton.addEventListener('click', () => {
    bookDetailModal.style.display = 'none';
});


// Event listeners for filter changes
genreFilter.addEventListener('change', filterBooks);
authorFilter.addEventListener('input', filterBooks); // Filter as the user types
availabilityFilter.addEventListener('change', filterBooks);


// Initial display of books once the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    displayBooks(books);
    populateFilterOptions();
});