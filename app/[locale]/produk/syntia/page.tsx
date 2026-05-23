import { useTranslations } from "next-intl";
import ProductDetail from "@/components/sections/ProductDetail";
import ContactCTA from "@/components/sections/ContactCTA";
import { PRODUCT_LINKS } from "@/lib/utils";
import { IMAGES } from "@/lib/images";

export default function Page() {
  const t = useTranslations("products");
  const tp = useTranslations("pages.products");

  const features = [
    { title: "Voice-First (segera)", desc: "Push-to-talk PWA hari ini, wake word \"Hey Syntia\" segera hadir." },
    { title: "Email Pintar", desc: "Baca, draft, dan kirim email langsung dari percakapan." },
    { title: "Calendar Sync", desc: "Cek jadwal dan buat acara di Google Calendar." },
    { title: "Reminder Engine", desc: "Pengingat persisten dengan natural language." },
    { title: "Briefing Harian", desc: "Ringkasan pagi: email, agenda, dan news watchlist." },
    { title: "WhatsApp Auto-Reply", desc: "Mode away dengan balasan otomatis per kontak terpercaya." },
  ];

  return (
    <>
      <ProductDetail
        name={t("syntia.name")}
        tagline={t("syntia.tagline")}
        description={t("syntia.desc")}
        accent="#0f172a"
        externalUrl={PRODUCT_LINKS.syntia}
        image={IMAGES.productSyntia}
        features={features}
        ctaLabel={t("visit")}
        backLabel={tp("title")}
      />
      <ContactCTA />
    </>
  );
}
