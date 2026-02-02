const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = "complejo_deportivo";

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log(" Conectado a MongoDB");
    return db;
  } catch (error) {
    console.error(" Error de conexión:", error);
    process.exit(1);
  }
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };