// app/dashboard/AddProfileCard.jsx
"use client";

import { useEffect, useRef, useState } from "react";

function AddNewProfile({ open, onClose }) {
    const dialogRef = useRef(null);
    const [step, setStep] = useState(0);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        instagram: "",
        youtube: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/profiles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            alert(err.error || "Failed to save profile");
            return;
        }
        onClose?.();
    };

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e) => e.key === "Escape" && onClose?.();
        window.addEventListener("keydown", onKey);
        // focus first control when opening
        setTimeout(() => dialogRef.current?.querySelector("input")?.focus(), 0);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [open, onClose]);

    const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        // TODO: POST to /api/profiles
        // await fetch("/api/profiles", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(form) });
        onClose?.();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />

            {/* Centered dialog */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div
                    ref={dialogRef}
                    role="dialog"
                    aria-modal="true"
                    className="w-full max-w-xl rounded-2xl bg-white shadow-2xl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="text-base font-semibold">Add New Profile</h3>
                        <button onClick={onClose} className="p-1 rounded hover:bg-gray-100" aria-label="Close">✕</button>
                    </div>

                    {/* Tabs */}
                    <div className="px-4 pt-3">
                        <div className="flex items-center gap-6 text-sm">
                            <button
                                type="button"
                                onClick={() => setStep(0)}
                                className={`pb-2 px-5${step === 0 ? "font-medium text-black border-b-2 border-blue-500" : "text-gray-500"}`}
                            >
                                Basic
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className={`pb-2 px-4 ${step === 1 ? "font-medium text-black border-b-2 border-blue-500" : "text-gray-500"}`}
                            >
                                Contact
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={submit} className="p-4 space-y-4">
                        {step === 0 ? (
                            <>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Enter Name</label>
                                    <input value={form.name} onChange={update("name")} placeholder="Eg. John Doe" required
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Enter Email</label>
                                    <input value={form.email} onChange={update("email")} type="email" placeholder="Eg. john@xyz.com" required
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Enter Phone</label>
                                    <input value={form.phone} onChange={update("phone")} placeholder="Eg. 9123456789" required
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Instagram</label>
                                    <input value={form.instagram} onChange={update("instagram")} placeholder="Instagram Handle" required
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-gray-600 mb-1">Youtube</label>
                                        <input value={form.youtube} onChange={update("youtube")} placeholder="Youtube Channel" required
                                            className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-2 pt-2">
                            {step > 0 && (
                                <button type="button" onClick={() => setStep((s) => s - 1)} className="px-4 py-2 rounded-lg border">
                                    Back
                                </button>
                            )}
                            {step === 0 ? (
                                <button type="button" onClick={() => setStep(1)} className="px-4 py-2 rounded-lg bg-blue-600 text-white">
                                    Next
                                </button>
                            ) : (
                                <button type="submit" onClick={handleSubmit} className="px-4 py-2 rounded-lg bg-blue-600 text-white">
                                    Save
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function AddProfileCard() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="w-full bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
                <div className="text-center">
                    <div className="mx-auto h-20 w-20 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center text-2xl">+</div>
                    <h6 className="mt-2 text-gray-700">Add Profile</h6>
                </div>
            </button>

            <AddNewProfile open={open} onClose={() => setOpen(false)} />
        </>
    );
}
