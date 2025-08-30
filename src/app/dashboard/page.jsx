
import Activities from "../components/ActivitiesChart";
import ProductsDonut from "../components/ProductsDonut";
import AddProfileCard from "../components/AddProflie"; 

async function getAll() {
    const base = process.env.NEXT_PUBLIC_BASE_URL;
    const [m, a, p] = await Promise.all([
        fetch(base + "/api/metrics", { cache: "no-store" }),
        fetch(base + "/api/activities", { cache: "no-store" }),
        fetch(base + "/api/top-products", { cache: "no-store" }),
    ]);
    if (!m.ok || !a.ok || !p.ok) throw new Error("Failed to load dashboard data");
    return { metrics: await m.json(), activities: await a.json(), products: await p.json() };
}

export default async function Dashboard() {
    const { metrics, activities, products } = await getAll();

    return (
        <div className="min-h-screen bg-[#f6f7fb] text-black">
            <div className="mx-auto max-w-full px-3 sm:px-4 lg:px-6 py-6 flex gap-4 lg:gap-6">
                {/* Sidebar */}
                <aside className="hidden md:block">
                    <div className="w-60 bg-[#3b82f6] text-white rounded-3xl p-6 flex flex-col h-[94vh] sticky top-6 shadow-lg">
                        <h1 className="text-3xl font-bold mb-10">Board.</h1>
                        <nav className="flex-1">
                            <ul className="space-y-6">
                                <li className="flex items-center gap-3 font-medium"><span>📊</span> Dashboard</li>
                                <li className="flex items-center gap-3 opacity-90 hover:opacity-100 cursor-pointer"><span>💸</span> Transactions</li>
                                <li className="flex items-center gap-3 opacity-90 hover:opacity-100 cursor-pointer"><span>📅</span> Schedules</li>
                                <li className="flex items-center gap-3 opacity-90 hover:opacity-100 cursor-pointer"><span>👤</span> Users</li>
                                <li className="flex items-center gap-3 opacity-90 hover:opacity-100 cursor-pointer"><span>⚙️</span> Settings</li>
                            </ul>
                        </nav>
                        <div className="mt-auto space-y-2 text-sm opacity-95">
                            <h6 className="cursor-pointer hover:opacity-100">Help</h6>
                            <h6 className="cursor-pointer hover:opacity-100">Contact Us</h6>
                        </div>
                    </div>
                </aside>

                {/* Main */}
                <main className="flex-1 mx-6">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3 ">
                        <h2 className="text-3xl font-bold">Dashboard</h2>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <input type="text" placeholder="Search…" className="pl-9 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
                            </div>
                            <button className="text-xl">🔔</button>
                            <button className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center">👤</button>
                        </div>
                    </div>

                    {/* Stat cards */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-3">
                        <Stat title="Total Revenues" value={`$${metrics.totalRevenue?.toLocaleString() ?? 0}`} delta="+2.5%" icon="💼" />
                        <Stat title="Total Transactions" value={metrics.totalTransactions?.toLocaleString() ?? 0} delta="+1.7%" icon="🧾" />
                        <Stat title="Total Likes" value={metrics.totalLikes?.toLocaleString() ?? 0} delta="+1.4%" icon="👍" />
                        <Stat title="Total Users" value={metrics.totalUsers?.toLocaleString() ?? 0} delta="+4.2%" icon="👥" />
                    </section>

                    {/* Activities */}
                    <section className="mb-3">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center justify-between ">
                                <div>
                                    <h3 className="font-bold">Activities</h3>
                                    <h6 className="text-xs text-gray-500">{activities.titleRange}</h6>
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-red-400" /> Guest</div>
                                    <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-green-400" /> User</div>
                                </div>
                            </div>
                            <Activities labels={activities.labels} guest={activities.guest} user={activities.user} />
                        </div>
                    </section>

                    {/* Bottom row */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-start justify-between ">
                                <h3 className="font-bold">Top products</h3>
                                <h6 className="text-xs text-gray-600">{products.period}</h6>
                            </div>
                            <ProductsDonut labels={products.labels} values={products.values} />
                        </div>
                        <AddProfileCard />
                    </section>
                </main>
            </div>
        </div>
    );
}

function Stat({ title, value, delta, icon }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-4 h-27">
            <div className="flex items-start justify-between">
                <span className="text-lg">{icon}</span>
                <span className="text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded">{delta}</span>
            </div>
            <h6 className="mt-2 text-xs text-gray-700">{title}</h6>
            <h3 className="text-lg font-bold">{value}</h3>
        </div>
    );
}
