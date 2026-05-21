import { useTranslations } from "next-intl";
import ProductDetail from "@/components/sections/ProductDetail";
import ContactCTA from "@/components/sections/ContactCTA";
import { PRODUCT_LINKS } from "@/lib/utils";
import { IMAGES } from "@/lib/images";

export default function Page() {
  const t = useTranslations("products");
  const tp = useTranslations("pages.products");

  // TODO: refresh feature list whenever halo.syntegra.co.id copy is updated.
  const features = [
    { title: "Balas dalam <2 detik", desc: "Customer chat tengah malam? Halo Syntia jawab langsung — tidak ada lagi lead yang lari ke kompetitor." },
    { title: "Sales Arc Framework", desc: "Mengikuti metodologi 7-tahap dari discovery sampai close. Tidak pernah langsung mengejar harga." },
    { title: "Bahasa Indonesia Native", desc: "Adaptasi tone otomatis — formal Pak/Bu, casual kak, atau slang ringan sesuai konteks pembicaraan." },
    { title: "Document & OCR", desc: "Membaca dan memahami foto/dokumen yang dikirim customer — rapot, KTP, STNK, brosur." },
    { title: "Human Handoff", desc: "Saat lead siap closing atau pertanyaan kompleks, Halo Syntia teruskan ke staff yang tepat." },
    { title: "Customer Memory", desc: "Ingat detail personal customer — nama anak, budget, timeline — lintas sesi percakapan." },
    { title: "Lead Dashboard", desc: "Pantau inbound lead, sales stage, conversion rate, dan response time secara real-time." },
    { title: "Industri-Specific", desc: "Template siap pakai untuk Pendidikan, Properti, Otomotif, dan SaaS/B2B. Custom untuk sektor lain." },
  ];

  return (
    <>
      <ProductDetail
        name={t("halo.name")}
        tagline={t("halo.tagline")}
        description={t("halo.desc")}
        accent="#25D366"
        externalUrl={PRODUCT_LINKS.halo}
        image={IMAGES.productHalo}
        features={features}
        ctaLabel={t("visit")}
        backLabel={tp("title")}
      />
      <ContactCTA />
    </>
  );
}
