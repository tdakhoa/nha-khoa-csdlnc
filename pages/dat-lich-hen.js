import React from "react";
import Head from "next/head";
import DatLichHen from "../src/modules/DatLichHen";

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>Nha Khoa</title>
                <link rel="icon" href="/Logo.png" />
            </Head>

            <main>
                <DatLichHen />
            </main>
        </div>
    );
}
