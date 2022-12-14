import express from 'express'

const categories = ['Food', 'Book', 'Study', 'Music']

const app = express()
const port = 4001

app.get('/', (request, response) => response.send({ info: 'API' }))

app.get('/categories', (req, res) => res.status(204).send(categories))

app.listen(port, () => console.log(`App is running at http://localhost:${port}`))