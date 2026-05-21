import { useTranslations } from "next-intl";

export default function FuturePipeline() {
  const t = useTranslations("futurePipeline");
  // TODO: replace placeholders with real upcoming product names + mockups
  const items = [
    { name: "Syntegra Inventory AI", hint: "Smart stock forecasting" },
    { name: "Syntegra CRM Lite", hint: "Customer pipeline for SMEs" },
    { name: "Syntegra Voice Agent", hint: "AI call agent for inquiries" },
  ];

  return (
    <section className="py-20">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-3 text-slate-600">{t("subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="relative bg-white border border-slate-100 rounded-2xl p-6 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gradient opacity-40 blur-[2px]" />
                  <span className="text-xs font-bold uppercase tracking-wider bg-brand-amber/15 text-brand-ink px-2.5 py-1 rounded-full">
                    {t("soon")}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold blur-[0.5px] opacity-90">
                  {item.name}
                </h3>
                <p className="text-sm text-slate-500 mt-1 opacity-80">{item.hint}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
