const mongoose = require('mongoose');

// Define the Book schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publicationYear: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
});

// Create the Book model
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

// Create a new book
const createBook = async () => {
    try {
        const newBook = await Book.create({
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            publicationYear: 1925,
            genre: 'Fiction',
        });

        console.log('New Book created:', newBook);
    } catch (error) {
        console.error('Error creating book:', error);
    }
};



// Find all books
const findAllBooks = async () => {
    try {
        const allBooks = await Book.find();
        console.log('All Books:', allBooks);
    } catch (error) {
        console.error('Error finding books:', error);
    }
};

// Update a book
const updateBook = async (bookId) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            { $set: { genre: 'Classic Fiction' } },
            { new: true }
        );

        console.log('Updated Book:', updatedBook);
    } catch (error) {
        console.error('Error updating book:', error);
    }
};

// Delete a book
const deleteBook = async (bookId) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(bookId);
        console.log('Deleted Book:', deletedBook);
    } catch (error) {
        console.error('Error deleting book:', error);
    }
};