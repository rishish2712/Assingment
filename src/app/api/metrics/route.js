import clientPromise from '../../lib/mongodb'

export function GET() {
  try {
    // Code for fetching the data from database

    // const client = await clientPromise
    // const db = client.db(process.env.MONGODB_DB)
    // Revenue = sum(quantity * price)
    // Profit = sum(quantity * (price - cost))
    // const [card] = await db
    //   .collection('transactions')
    //   .aggregate([
    //     {
    //       $group: {
    //         _id: null,
    //         totalTransactions: { $sum: 1 },
    //         totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
    //         totalProfit: {
    //           $sum: {
    //             $multiply: ['$quantity', { $subtract: ['$price', '$cost'] }],
    //           },
    //         },
    //         totalUsers: {
    //           $sum: { $cond: [{ $eq: ['$customerType', 'user'] }, 1, 0] },
    //         },
    //         totalLikes: { $sum: 9721 }, // placeholder if you don’t track likes in DB
    //       },
    //     },
    //     { $project: { _id: 0 } },
    //   ])
    //   .toArray()

    // return Response.json(
    //   card ?? {
    //     totalTransactions: 0,
    //     totalRevenue: 0,
    //     totalProfit: 0,
    //     totalUsers: 0,
    //     totalLikes: 0,
    //   }
    // )

    const data = {
      totalRevenue: 2129430,
      totalProfit: 684210,
      totalTransactions: 1520,
      totalUsers: 9721,
      totalLikes: 9721,
    }
    return Response.json(data, { status: 200 })
  } catch (e) {
    console.error('API /metrics failed:', e)
    return new Response(JSON.stringify({ error: 'Failed to load metrics' }), {
      status: 500,
    })
  }
}
