"use client";
import { motion } from "motion/react";
import Image from "next/image";

export default function Logo() {
  return (
    <motion.a
      href="/"
      className="flex items-center gap-1.5 group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Image src="/images/icon-2.png" height={50} width={50} alt="logo-image" />
      <span className="text-lg font-semibold tracking-tight text-foreground">
        CodeClash
      </span>
    </motion.a>
  );
}
