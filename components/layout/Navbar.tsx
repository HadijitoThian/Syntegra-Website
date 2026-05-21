"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LanguageToggle from "./LanguageToggle";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: t("home") },
    { href: "/produk", label: t("products") },
    { href: "/tentang", label: t("about") },
    { href: "/insights", label: t("insights") },
    { href: "/kontak", label: t("contact") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200/60"
          : "bg-transparent"
      )}
    >
      <div className="container-x flex items-center justify-between h-16">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.jpeg"
            alt="Syntegra"
            width={520}
            height={140}
            priority
            className="h-9 w-auto"
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 hover:text-brand-ink transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <LanguageToggle />
          <Link
            href="/kontak"
            className="bg-brand-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-soft hover:opacity-95 transition"
          >
            {t("cta")}
          </Link>
        </div>
        <button
          className="lg:hidden p-2 rounded-md text-brand-ink"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-white border-t border-slate-200">
          <div className="container-x py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-base font-medium text-slate-700"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <LanguageToggle />
              <Link
                href="/kontak"
                onClick={() => setOpen(false)}
                className="bg-brand-gradient text-white text-sm font-semibold px-4 py-2 rounded-xl"
              >
                {t("cta")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
