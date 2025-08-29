"use client";
import dynamic from "next/dynamic";
import React from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ActivitiesChart({ labels, guest, user }) {
    const ready =
        Array.isArray(labels) &&
        Array.isArray(guest) &&
        Array.isArray(user) &&
        labels.length > 0 &&
        guest.length === labels.length &&
        user.length === labels.length;

    if (!ready) {
        // render a small placeholder instead of a blank chart
        return <div className="h-56 grid place-items-center text-gray-400 text-sm">No data</div>;
    }

    const options = {
        chart: { toolbar: { show: false } },
        colors: ["#fca5a5", "#86efac"],
        plotOptions: { bar: { columnWidth: "38%", borderRadius: 4 } },
        xaxis: {
            categories: labels,
            labels: { style: { colors: "#6b7280" } },
            axisTicks: { show: false },
            axisBorder: { show: false },
        },
        yaxis: { min: 0, max: 500, tickAmount: 5, labels: { style: { colors: "#6b7280" } } },
        grid: { borderColor: "#e5e7eb", strokeDashArray: 3, padding: { top: 8, right: 12, left: 0 } },
        legend: { show: false },
    };

    const series = [
        { name: "Guest", data: guest.map(Number) },
        { name: "User", data: user.map(Number) },
    ];

    return (
        <div className="w-full">
            <Chart type="bar" height={280} options={options} series={series} />
        </div>
    );
}
