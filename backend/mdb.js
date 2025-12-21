const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017/dataset';
const client = new MongoClient(url);

// Database Name
const dbName = 'data';

async function insertData(name,contect,email,suggestion) {
  // Use connect method to connect to the server
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('feedbacks');

  // the following code examples can be pasted here...

  //INSERT
  const insertResult = await collection.insertOne({
    name:name,
    contect: contect,
    email: email,
    suggestion: suggestion
  })
  console.log("Submitted");
  


}

module.exports = insertData

