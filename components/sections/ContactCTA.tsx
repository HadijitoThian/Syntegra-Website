import { useTranslations } from "next-intl";
import ContactForm from "@/components/ContactForm";

export default function ContactCTA() {
  const t = useTranslations("contactCta");
  return (
    <section id="kontak" className="py-24">
      <div className="container-x">
        <div className="relative bg-brand-gradient rounded-3xl overflow-hidden shadow-xl">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-brand-amber/20 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-10 p-8 lg:p-14 items-center">
            <div className="text-white">
              <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">
                {t("title")}
              </h2>
              <p className="mt-4 text-lg text-white/90">{t("sub")}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-2xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
