import { MongoClient } from 'mongodb'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  try {
    const client = await MongoClient.connect(process.env.MONGO_URI)
    const db = client.db()
    const collection = db.collection('contacts')

    await collection.insertOne({ name, email, message, createdAt: new Date() })
    client.close()

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Database error' })
  }
}
