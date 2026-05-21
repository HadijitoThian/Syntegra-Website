import { useTranslations } from "next-intl";
import ProductDetail from "@/components/sections/ProductDetail";
import ContactCTA from "@/components/sections/ContactCTA";
import { PRODUCT_LINKS } from "@/lib/utils";
import { IMAGES } from "@/lib/images";

export default function Page() {
  const t = useTranslations("products");
  const tp = useTranslations("pages.products");

  // TODO: feature list pulled from current live landing page; update when copy changes.
  const features = [
    { title: "Smart Business Questionnaire", desc: "Isi kuisioner singkat tentang brand, produk, dan target — AI langsung kerja." },
    { title: "AI Logo Generator", desc: "5 opsi logo profesional (Modern, Minimalis, Inisial, Wordmark, Icon) rasio 1:1." },
    { title: "AI Photo Studio", desc: "Foto produk biasa jadi hero image studio-grade." },
    { title: "Landing Page Generator", desc: "Mobile-first, copywriting Bahasa Indonesia persuasif, siap publish." },
    { title: "Mode B2C & B2B", desc: "Struktur halaman otomatis menyesuaikan target (konsumen / reseller)." },
    { title: "Social Media Automation", desc: "Caption Instagram, TikTok, Facebook + scheduling dari satu dashboard." },
  ];

  return (
    <>
      <ProductDetail
        name={t("socialBuilder.name")}
        tagline={t("socialBuilder.tagline")}
        description={t("socialBuilder.desc")}
        accent="#2563eb"
        externalUrl={PRODUCT_LINKS.social}
        image={IMAGES.productSocial}
        features={features}
        ctaLabel={t("visit")}
        backLabel={tp("title")}
      />
      <ContactCTA />
    </>
  );
}
