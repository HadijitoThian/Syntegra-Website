import { useTranslations } from "next-intl";
import ProductDetail from "@/components/sections/ProductDetail";
import ContactCTA from "@/components/sections/ContactCTA";
import { PRODUCT_LINKS } from "@/lib/utils";
import { IMAGES } from "@/lib/images";

export default function Page() {
  const t = useTranslations("products");
  const tp = useTranslations("pages.products");

  // TODO: feature list from live POS landing page; refresh when copy expands.
  const features = [
    { title: "Transaksi Cepat", desc: "Proses order dan pembayaran dalam hitungan detik." },
    { title: "Offline-First", desc: "Tetap beroperasi tanpa internet, sync otomatis saat online." },
    { title: "Multi-Tenant", desc: "Kelola 10.000+ perusahaan dalam satu platform." },
    { title: "Scalable", desc: "Dari UMKM hingga enterprise, sistem tumbuh bersama bisnis Anda." },
    { title: "Real-time Analytics", desc: "Dashboard penjualan, laporan shift, dan forecasting AI." },
    { title: "Aman", desc: "RBAC granular, audit trail lengkap, enkripsi end-to-end." },
    { title: "Cloud-Native", desc: "Deploy di cloud manapun, siap migrasi tanpa lock-in." },
    { title: "Multi-Device", desc: "Web, tablet, mobile — satu dashboard untuk semua." },
  ];

  return (
    <>
      <ProductDetail
        name={t("pos.name")}
        tagline={t("pos.tagline")}
        description={t("pos.desc")}
        accent="#0d9488"
        externalUrl={PRODUCT_LINKS.pos}
        image={IMAGES.productPos}
        features={features}
        ctaLabel={t("visit")}
        backLabel={tp("title")}
      />
      <ContactCTA />
    </>
  );
}
