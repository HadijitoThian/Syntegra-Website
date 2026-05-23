import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PRODUCT_LINKS } from "@/lib/utils";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tProducts = useTranslations("products");

  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-24">
      <div className="container-x py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/logo.jpeg"
            alt="Syntegra"
            width={520}
            height={140}
            className="h-10 w-auto mb-4"
          />
          <p className="text-sm text-slate-600 max-w-xs">{t("tagline")}</p>
        </div>
        <div>
          <h4 className="font-semibold text-brand-ink mb-4">{t("products")}</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <a href={PRODUCT_LINKS.social} target="_blank" rel="noopener" className="hover:text-brand-royal">
                {tProducts("socialBuilder.name")}
              </a>
            </li>
            <li>
              <a href={PRODUCT_LINKS.pos} target="_blank" rel="noopener" className="hover:text-brand-royal">
                {tProducts("pos.name")}
              </a>
            </li>
            <li>
              <a href={PRODUCT_LINKS.syntia} target="_blank" rel="noopener" className="hover:text-brand-royal">
                {tProducts("syntia.name")}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-brand-ink mb-4">{t("company")}</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="/tentang" className="hover:text-brand-royal">{tNav("about")}</Link></li>
            <li><Link href="/insights" className="hover:text-brand-royal">{tNav("insights")}</Link></li>
            <li><Link href="/kontak" className="hover:text-brand-royal">{tNav("contact")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-brand-ink mb-4">{t("legal")}</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><span className="hover:text-brand-royal cursor-not-allowed opacity-60">{t("privacy")}</span></li>
            <li><span className="hover:text-brand-royal cursor-not-allowed opacity-60">{t("terms")}</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="container-x py-6 text-xs text-slate-500 text-center">
          {t("rights")}
        </div>
      </div>
    </footer>
  );
}
