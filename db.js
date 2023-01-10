import mongoose from 'mongoose'
// const categories = ['Food', 'Coding', 'Work', 'Other']

async function dbClose() {
    await mongoose.connection.close()
    console.log('Database disconnected!')
}

// returns a promise so the rest of the program doesn't have to wait for the connection to be established
try {
    const m = await mongoose.connect('mongodb+srv://thinguyen:jetmoon@cluster0.bxuyw2e.mongodb.net/journal?retryWrites=true&w=majority')
    console.log(mongoose.connection.readyState === 1 ? 'Mongoose connected' : 'Mongoose failed to connect')
}
catch (err) {
    console.log(err)
}

const entrySchema = new mongoose.Schema({
    category: { type: mongoose.ObjectId, ref: 'Category'},
    content: { type: String, required: true }
})

const EntryModel = mongoose.model('Entry', entrySchema)

// Setting up category schema and model
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true }
})

const CategoryModel = mongoose.model('Category', categorySchema)

export { CategoryModel, EntryModel, dbClose }