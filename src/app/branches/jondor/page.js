"use client";

import { useEffect } from "react";

export default function JondorPage() {
    useEffect(() => {
        const latitude = 39.739061;
        const longitude = 64.165663;
        const address = "Jondor Gilam Baza, Жондор, Узбекистан";

        const deeplink = `yandextaxi://route/?end-lat=${latitude}&end-lon=${longitude}&end-address=${encodeURIComponent(address)}`;
        const fallbackUrl = `https://taxi.yandex.uz/?rto=${latitude},${longitude}&text=${encodeURIComponent(address)}`;

        window.location.href = deeplink;
        setTimeout(() => {
            window.location.href = fallbackUrl;
        }, 500);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto"></div>
                <p className="mt-4 text-gray-600">Перенаправление в Яндекс Такси...</p>
            </div>
        </div>
    );
}