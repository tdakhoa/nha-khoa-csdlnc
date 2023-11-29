import React from "react";
import Head from "next/head";
import Home from "../src/modules/Home";

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>Nha Khoa</title>
                <link rel="icon" href="/Logo.png" />
            </Head>

            <main>
                <Home />
            </main>
        </div>
    );
}
