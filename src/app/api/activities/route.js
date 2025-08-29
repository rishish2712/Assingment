import clientPromise from '../../lib/mongodb'

export function GET() {
  try {
    //Code for fetching the data from database

    // const client = await clientPromise
    // const db = client.db(process.env.MONGODB_DB)
    // group by week and customerType to produce Guest/User series
    //   const rows = await db
    //     .collection('transactions')
    //     .aggregate([
    //       {
    //         $group: {
    //           _id: { week: '$week', type: '$customerType' },
    //           amount: { $sum: { $multiply: ['$quantity', '$price'] } }, // or count: {$sum:1}
    //         },
    //       },
    //       {
    //         $group: {
    //           _id: '$_id.week',
    //           guest: {
    //             $sum: { $cond: [{ $eq: ['$_id.type', 'guest'] }, '$amount', 0] },
    //           },
    //           user: {
    //             $sum: { $cond: [{ $eq: ['$_id.type', 'user'] }, '$amount', 0] },
    //           },
    //         },
    //       },
    //       { $project: { _id: 0, week: '$_id', guest: 1, user: 1 } },
    //       { $sort: { week: 1 } },
    //     ])
    //     .toArray()

    //   const labels = rows.map((r) => `Week ${r.week}`)
    //   const guest = rows.map((r) => Math.round(r.guest))
    //   const user = rows.map((r) => Math.round(r.user))

    //   return Response.json({ labels, guest, user, titleRange: 'May – June 2021' })

    const data = {
      titleRange: 'May – June 2021',
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      guest: [400, 450, 300, 350],
      user: [500, 350, 200, 500],
    }
    console.log('API /metrics success:', data) // server logs once
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
