import React, { useState } from "react";
import Head from "next/head";
import QuanLyThanhToan from "../src/modules/QuanLyThanhToan";

export default function HomePage() {
  const [appointment, setAppointment] = useState([]);
  return (
    <div>
      <Head>
        <title>Nha Khoa</title>
        <link rel="icon" href="/Logo.png" />
      </Head>

      <main>
        <QuanLyThanhToan />
      </main>
    </div>
  );
}
