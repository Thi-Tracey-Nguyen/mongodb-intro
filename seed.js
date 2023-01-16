import { EntryModel, CategoryModel, dbClose } from './db.js'

await EntryModel.deleteMany()
await CategoryModel.deleteMany()

const categories = [
    {name: 'Food'}, 
    {name: 'Coding'}, 
    {name: 'Work'},
    {name: 'Other'}
]

const cats = await CategoryModel.insertMany(categories)

const entries = [
    { category: cats[0], content: 'Pizza is awesome!'}, 
    { category: cats[1], content: 'I love Express!'}, 
    { category: cats[2], content: 'Another day at the office.'}, 
]

await EntryModel.insertMany(entries)

dbClose()