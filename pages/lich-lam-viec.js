import React from "react";
import Head from "next/head";
import LichLamViec from "../src/modules/LichLamViec";

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>Nha Khoa</title>
                <link rel="icon" href="/Logo.png" />
            </Head>

            <main>
                <LichLamViec />
            </main>
        </div>
    );
}
