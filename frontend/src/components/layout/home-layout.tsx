"use client";

import { bootupBackend } from "@/utils";
import { ReactNode, useEffect } from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  useEffect(() => {
    bootupBackend();
  }, []);

  return <div>{children}</div>;
}
