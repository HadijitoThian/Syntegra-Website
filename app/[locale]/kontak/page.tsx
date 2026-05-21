import { useTranslations } from "next-intl";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  const t = useTranslations("pages.contact");
  return (
    <section className="pt-32 pb-24">
      <div className="container-x max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-brand-gradient">{t("title")}</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600">{t("subtitle")}</p>
        </div>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-soft p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
