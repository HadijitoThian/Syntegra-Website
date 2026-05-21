import { useTranslations } from "next-intl";
import WhoWeAre from "@/components/sections/WhoWeAre";
import HowWeWork from "@/components/sections/HowWeWork";
import ContactCTA from "@/components/sections/ContactCTA";

export default function AboutPage() {
  const t = useTranslations("pages.about");
  return (
    <>
      <section className="pt-32 pb-12">
        <div className="container-x max-w-3xl text-center">
          <h1 className="font-display text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-brand-gradient">{t("title")}</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600">{t("intro")}</p>
        </div>
      </section>
      <WhoWeAre />
      <HowWeWork />
      <ContactCTA />
    </>
  );
}
