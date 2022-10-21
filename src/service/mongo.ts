import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

var client
var clientPromise: any

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local')
}

try {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
} catch (error) {
  console.log(error)
}
// if (process.env.NODE_ENV === 'development') {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()
// }

export default clientPromise
