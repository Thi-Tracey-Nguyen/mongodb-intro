import { EntryModel, CategoryModel, dbClose } from './db.js'

await EntryModel.deleteMany()
await CategoryModel.deleteMany()

const categories = [
    {name: 'Food'}, 
    {name: 'Coding'}, 
    {name: 'Work'},
    {name: 'Other'}
]

await CategoryModel.insertMany(categories)

const entries = [
    { category: 'Food', content: 'Pizza is awesome!'}, 
    { category: 'Coding', content: 'I love Express!'}, 
    { category: 'Work', content: 'Another day at the office.'}, 
]

await EntryModel.insertMany(entries)

dbClose()