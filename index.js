import express from 'express'

const categories = ['Food', 'Coding', 'Work', 'Other']

const entries = [
    {category: 'Food', content: 'Pizza'}, 
    {category: 'Coding', content: 'Express is cool!'}, 
    {category: 'Work', content: 'Another day, another dollar'}
]

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