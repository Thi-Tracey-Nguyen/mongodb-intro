import app from './app.js'

const port = process.env.PORT || 4001

app.listen(port, () => console.log(`App is running at http://localhost:${port}`))