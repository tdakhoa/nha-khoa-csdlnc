import React from "react";
import Head from "next/head";
import LogIn from "../src/modules/LogIn";

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>Nha Khoa</title>
                <link rel="icon" href="/Logo.png" />
            </Head>

            <main>
                <LogIn />
            </main>
        </div>
    );
}
