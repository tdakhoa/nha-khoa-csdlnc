import React from "react";
import Head from "next/head";
import NewPost from "../src/modules/NewPost";

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>Nha Khoa</title>
                <link rel="icon" href="/Logo.png" />
            </Head>

            <main>
                <NewPost />
            </main>
        </div>
    );
}
