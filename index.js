import express from 'express'
import mongoose from 'mongoose'
const categories = ['Food', 'Coding', 'Work', 'Other']

const entries = [
    {category: 'Food', content: 'Pizza'}, 
    {category: 'Coding', content: 'Express is cool!'}, 
    {category: 'Work', content: 'Another day, another dollar'}
]

// returns a promise so the rest of the program doesn't have to wait for the connection to be established
mongoose.connect('mongodb+srv://thinguyen:jetmoon@cluster0.bxuyw2e.mongodb.net/journal?retryWrites=true&w=majority')
  .then((m) => console.log(mongoose.connection.readyState === 1 ? 'Mongoose connected' : 'Mongoose failed to connect'))
  .catch((err) => console.log(err))

const entriesSchema = new mongoose.Schema({
    category: { type: String, required: true },
    content: { type: String, required: true }
})

const app = express()
const port = 4001

app.use(express.json())

app.get('/', (request, response) => response.send({ info: 'API' }))

app.get('/categories', (req, res) => res.send(categories))

app.get('/entries', (req, res) => res.send(entries))

app.get('/entries/:id', (req, res) => {
    const entry = entries[req.params.id]

    if (entry) {
        res.status(200).send(entries[req.params.id])
    } else {
        res.status(404).send('Entry not found')
    }
})

app.post('/entries', (req, res) => {
    // 1. Create a new entry object with values passed in from the request 
    const { category, content } = req.body
    // Sanitize the request 
    const newEntry = {category, content}

    // 2. Push the new entry to the entries array
    entries.push(newEntry)
    // 3. Send the new entry with 201 status
    res.status(201).send(newEntry)
})

app.listen(port, () => console.log(`App is running at http://localhost:${port}`))