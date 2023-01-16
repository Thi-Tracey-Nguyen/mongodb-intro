import express from 'express'
import { CategoryModel, EntryModel } from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => res.send(await EntryModel.find().populate({path: 'category', select: 'name'})))

router.get('/:id', async (req, res) => {
    try {
        const entry = await EntryModel.findById(req.params.id).populate({path: 'category', select: 'name'})

        if (entry) {
            res.status(200).send(entry)
        } else {
            res.status(404).send('Entry not found')
        }
    } 
    catch (err) {
        res.status(500).send({ error: err.message })
    }  
})

// Update
router.put('/:id', async (req, res) => {
    const { category, content } = req.body
    const newEntry = { category, content } 

    try {
        const entry = await EntryModel.findByIdAndUpdate(req.params.id, newEntry, { returnDocument: 'after' }).populate('category')

        if (entry) {
            res.send(entry)
        } else {
            res.status(404).send('Entry not found')
        }
    } 
    catch (err) {
        res.status(500).send({ error: err.message })
    }  
})

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const entry = await EntryModel.findByIdAndDelete(req.params.id)

        if (entry) {
            res.sendStatus(204)
        } else {
            res.status(404).send('Entry not found')
        }
    } 
    catch (err) {
        res.status(500).send({ error: err.message })
    }  
})

router.post('/', async (req, res) => {
    try {
        // 1. Create a new entry object with values passed in from the request 
        const { category, content } = req.body
        // get the category object from the category (name)
        const categoryObject = await CategoryModel.findOne({ name: category})
        
        // Sanitize the request 
        const newEntry = { category: categoryObject._id, content } 
        // const newEntry = { category, content } only works if the key can the referenced value have the same name 

        // 2. Push the new entry to the entries array
        // entries.push(newEntry) //old way, before mongoose
        const insertedEntry = await EntryModel.create(newEntry)
        await insertedEntry.populate({path: 'category', select: 'name'})
        // 3. Send the new entry with 201 status
        res.status(201).send(insertedEntry)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

export default router