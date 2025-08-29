import clientPromise from '../../lib/mongodb'

// POST /api/profiles
export async function POST(request) {
  try {
    const body = await request.json() // { name, email, phone, instagram, youtube }
    const { name, email, phone, instagram, youtube } = body ?? {}

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)

    const doc = {
      name,
      email,
      phone,
      instagram: instagram ?? '',
      youtube: youtube ?? '',
      createdAt: new Date(),
    }

    const result = await db.collection('profiles').insertOne(doc)

    return new Response(
      JSON.stringify({ ok: true, id: result.insertedId, profile: doc }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (err) {
    console.error('POST /api/profiles failed:', err)
    return new Response(JSON.stringify({ error: 'Failed to create profile' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
