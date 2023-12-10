import React from "react";
import Head from "next/head";
import HoSoBenhNhan from "../../src/modules/HoSoBenhNhan";

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>Nha Khoa</title>
                <link rel="icon" href="/Logo.png" />
            </Head>

            <main>
                <HoSoBenhNhan />
            </main>
        </div>
    );
}
