// import { Router } from 'express'
const express = require('express')
const router = express.Router()
const Book = require('../models/book')
router.get('/', async (req, res) => { 
    let books
    try {
        console.log('calling books')
        books = await Book.find().sort({createdAt: 'desc'}).limit(10).exec()


    } catch {
        console.log('failed to get books')
        books = []
    }
    res.render('index', { books: books })    
})

module.exports = router