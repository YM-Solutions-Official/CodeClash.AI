"use client";
import { motion } from "motion/react";
import Logo from "../logo";
import { Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-border/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Logo */}
         <Logo/>

          {/* Center Text */}
          <p className="text-sm text-muted-foreground">
            Built in public · Open source
          </p>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </motion.a>
            <span className="text-sm text-muted-foreground">
              © {currentYear} CodeClash
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
