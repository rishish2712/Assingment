import clientPromise from '@/app/lib/mongodb'

export async function GET() {
  try {
    //   const client = await clientPromise
    //   const db = client.db(process.env.MONGODB_DB)

    //   const rows = await db
    //     .collection('transactions')
    //     .aggregate([
    //       {
    //         $group: {
    //           _id: '$product',
    //           revenue: { $sum: { $multiply: ['$quantity', '$price'] } },
    //         },
    //       },
    //       { $sort: { revenue: -1 } },
    //       { $limit: 5 },
    //       {
    //         $group: {
    //           _id: null,
    //           total: { $sum: '$revenue' },
    //           items: { $push: { label: '$_id', value: '$revenue' } },
    //         },
    //       },
    //       { $project: { _id: 0, total: 1, items: 1 } },
    //     ])
    //     .toArray()

    //   // rows is an array; pick first document safely
    //   const doc = rows && rows.length ? rows : { total: 0, items: [] }
    //   console.log('Top products', doc)
    //   const labels = doc.items.map((i) => i.label)
    //   console.log('Top product labels', labels)
    //   const values = doc.items.map((i) => Number(i.value.toFixed(2)))
    //   console.log('Top product values', values)

    //   return Response.json({ labels, values, period: 'May – June 2021' })

    const data = {
      period: 'May – June 2021',
      labels: ['Basic Tees', 'Custom Short Pants', 'Super Hoodies'],
      // Use raw values or percentages; the donut will render either.
      // If you want exact 55/31/14% shares, keep these proportional.
      values: [55, 31, 14],
    }
    return Response.json(data, { status: 200 })
  } catch (e) {
    console.error('API /metrics failed:', e) // server logs once
    return new Response(
      JSON.stringify({ error: 'Failed to load top-product' }),
      {
        status: 500,
      }
    )
  }
}
