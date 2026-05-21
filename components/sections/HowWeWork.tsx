import { useTranslations } from "next-intl";

export default function HowWeWork() {
  const t = useTranslations("howWeWork");
  const steps = t.raw("steps") as { title: string; desc: string }[];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">
            {t("title")}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="w-12 h-12 rounded-full bg-brand-gradient text-white font-display font-bold flex items-center justify-center mb-4 shadow-soft">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
