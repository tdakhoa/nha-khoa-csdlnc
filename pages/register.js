import React from "react";
import Head from "next/head";
import Register from "../src/modules/Register";

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>Nha Khoa</title>
                <link rel="icon" href="/Logo.png" />
            </Head>

            <main>
                <Register />
            </main>
        </div>
    );
}
