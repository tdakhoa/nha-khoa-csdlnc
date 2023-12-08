import React from "react";
import Head from "next/head";
import DuLieuHeThong from "../src/modules/DuLieuHeThong";

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>Nha Khoa</title>
                <link rel="icon" href="/Logo.png" />
            </Head>

            <main>
                <DuLieuHeThong />
            </main>
        </div>
    );
}
