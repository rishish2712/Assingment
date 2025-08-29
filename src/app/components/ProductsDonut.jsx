"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ProductsDonut({ labels, values }) {
    const options = {
        chart: { toolbar: { show: false } },
        labels,
        colors: ["#86efac", "#fbbf24", "#f87171", "#60a5fa", "#a78bfa"],
        legend: { show: false },
    };
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4">
            <Chart type="donut" height={120} options={options} series={values} />
            <ul className="space-y-2">
                {labels.map((label, idx) => (
                    <li key={label} className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: options.colors[idx % options.colors.length] }} />
                        <div>
                            <h6 className="text-sm font-medium">{label}</h6>
                            <h6 className="text-xs text-gray-700">
                                {Math.round((values[idx] / values.reduce((a, b) => a + b, 0)) * 100)}%
                            </h6>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
