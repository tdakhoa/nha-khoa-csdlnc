import React from "react";
import Head from "next/head";
import QuanLyCuocHen from "../src/modules/QLCH";

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>Nha Khoa</title>
                <link rel="icon" href="/Logo.png" />
            </Head>

            <main>
                <QuanLyCuocHen />
            </main>
        </div>
    );
}
