import React from "react";
import Head from "next/head";
import AllPosts from "../src/modules/AllPosts";

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>Nha Khoa</title>
                <link rel="icon" href="/Logo.png" />
            </Head>

            <main>
                <AllPosts />
            </main>
        </div>
    );
}
