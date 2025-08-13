const express = require('express')
const app = express()
app.use(express.json())

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions))

const BookData = require('./models/books.models')
const { initializeData } = require('./db/db.connect')

initializeData()

async function addNewBook(newData){
    try{
        const newBook = new BookData(newData)
        const saveBook = await newBook.save()
        return saveBook
    } catch (error){
        throw error
    }
}

app.post('/books', async (req, res) => {
    try{
        const book = await addNewBook(req.body)
        if(book){
            res.status(200).json({message: "New book data added successfully.", data: book})
        }else{
            res.status(404).json({error: "No book found."})
        }
    } catch (error){
        res.status(500).json({error: "Failed to add new books data."})
    }
})

app.get('/books', async (req, res) => {
    try{
        const bookData = await BookData.find()
        if(bookData){
            res.json(bookData)
        }else{
            res.status(404).json({error: "Book data not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch books data."})
    }
})


async function readBookByTitle(bookName){
    try{
        const bookTitle = await BookData.findOne({title: bookName})
        return bookTitle
    } catch (error){
        throw error
    }
}

app.get('/books/:title', async (req, res) => {
    try{
        const bookWithTitle = await readBookByTitle(req.params.title)
        if(bookWithTitle){
            res.json(bookWithTitle)
        }else{
            res.status(404).json({error: "Not Found."})
        }
    } catch (error){
        res.status(500).json({error: "Failed to fetch the book data by title."})
    }
})


async function readAllBookByAuthor(authorName){
    try {
        const bookByAuthor = await BookData.find({author: authorName})
        return bookByAuthor
    } catch (error) {
        throw error
    }
}

app.get('/books/author/:authorName', async (req, res) => {
    try{
        const bookWithAuthor = await readAllBookByAuthor(req.params.authorName)
        if(bookWithAuthor){
            res.json(bookWithAuthor)
        }else{
            res.status(404).json({error: "Data not found."})
        }
    } catch (error){
        res.status(500).json({error: "Failed to fetch the data."})
    }
})

async function readBookByGenre(genreName){
    try{
        const bookByGenre = await BookData.find({genre: genreName})
        return bookByGenre
    } catch (error){
        throw error
    }
}

app.get('/books/genre/:genreName', async (req, res) => {
    try{
        const bookWithGenre = await readBookByGenre(req.params.genreName)
        if(bookWithGenre){
            res.json(bookWithGenre)
        }else {
            res.status(404).json({error: "Book data not found."})
        }
    } catch (error){
        res.status(500).json({error: "Failed to fetch the data."})
    }
})

app.get('/books/year/:bookYear', async (req, res) => {
    try{
        const bookWithYear = await BookData.find({publishedYear: req.params.bookYear})
        if(bookWithYear){
            res.json(bookWithYear)
        }else{
            res.status(404).json({error: ""})
        }
    } catch (error){
        res.status(500).json({error: "Failed to fetch the book data."})
    }
})

app.post('/books/:id', async (req, res) => {
    try{
        const dataToUpdate = req.body
        const bookId = (req.params.id)
        const updateBook = await BookData.findByIdAndUpdate(bookId, dataToUpdate, {new: true})
        if(updateBook){
            res.status(200).json({message: "Data updated successfully.", updateBook})
        }else{
            res.status(404).json({error: "Failed to update the data."})
        }
    } catch (error){
        throw error
    }
})

app.post('/books/title/:titleName', async (req, res) => {
    try{
        const bookWithTitle = req.params.titleName
        const dataToUpdate = req.body
        const updatedData = await BookData.findOneAndUpdate({title: bookWithTitle}, dataToUpdate, {new: true})
        if(updatedData){
            res.status(200).json({message: "Book data updated successfully.", updatedData})
        }else {
            res.status(404).json({error: "Failed to update the data."})
        }
    } catch (error){
        res.status(500).json({error: "Book data not Found."})
    }
})

app.delete('/books/:bookId', async (req, res) => {
    try{
        const bookId = req.params.bookId
        const dataToDelete = await BookData.findByIdAndDelete(bookId)
        if(dataToDelete){
            res.status(200).json({message: "Data deleted successfully.", dataToDelete})
        }else{
            res.status(404).json({error: "Faailed to delete the data."})
        }
    } catch (error){
        res.status(500).json({error: "Book data not found."})
    }
})


const PORT = 3000
app.listen(PORT, (req, res) => {
    console.log("Server connected on port", PORT)
})
