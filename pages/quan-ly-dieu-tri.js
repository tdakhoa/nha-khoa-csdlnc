import React, { useState } from "react";
import Head from "next/head";
import QuanLyDieuTri from "../src/modules/QuanLyDieuTri";

export default function HomePage() {
  const [appointment, setAppointment] = useState([]);
  return (
    <div>
      <Head>
        <title>Nha Khoa</title>
        <link rel="icon" href="/Logo.png" />
      </Head>

      <main>
        <QuanLyDieuTri />
      </main>
    </div>
  );
}
