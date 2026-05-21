import { useTranslations } from "next-intl";
import ProductsShowcase from "@/components/sections/ProductsShowcase";
import FuturePipeline from "@/components/sections/FuturePipeline";

export default function ProductsPage() {
  const t = useTranslations("pages.products");
  return (
    <>
      <section className="pt-32 pb-8">
        <div className="container-x max-w-3xl text-center">
          <h1 className="font-display text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-brand-gradient">{t("title")}</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600">{t("subtitle")}</p>
        </div>
      </section>
      <ProductsShowcase />
      <FuturePipeline />
    </>
  );
}
