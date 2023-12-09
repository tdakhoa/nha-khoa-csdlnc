import React from "react";
import Head from "next/head";
import QuanLyThuoc from "../src/modules/QuanLyThuoc";

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>Nha Khoa</title>
                <link rel="icon" href="/Logo.png" />
            </Head>

            <main>
                <QuanLyThuoc />
            </main>
        </div>
    );
}
