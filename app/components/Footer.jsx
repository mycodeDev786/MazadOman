"use client";
import { useLanguage } from "./LanguageContext";
import { translations } from "../translations/translation";
import { assets } from "@/assets/assets";

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer
      className="text-gray-100 text-sm bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${assets.footerBg})`,
      }}
    >
      {/* Overlay for better readability */}
      <div className="bg-black/25 backdrop-brightness-75">
        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* About Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 uppercase tracking-wider text-white">
              {t.footer.about.title}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  {t.footer.about.links.about}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  {t.footer.about.links.services}
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 uppercase tracking-wider text-white">
              {t.footer.support.title}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  {t.footer.support.links.contact}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  {t.footer.support.links.terms}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  {t.footer.support.links.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  {t.footer.support.links.faqs}
                </a>
              </li>
            </ul>
          </div>

          {/* Categories Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 uppercase tracking-wider text-white">
              {t.footer.categories.title}
            </h4>
            <ul className="space-y-2">
              {t.footer.categories.items.map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-blue-400 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 uppercase tracking-wider text-white">
              {t.footer.socials.title}
            </h4>
            <div className="flex space-x-4">
              {t.footer.socials.links.map(({ icon, link }, idx) => (
                <a
                  key={idx}
                  href={link}
                  className="w-9 h-9 bg-white text-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition"
                >
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="max-w-7xl mx-auto px-4 pb-8 text-sm">
          <h4 className="text-white font-semibold mb-2">
            {t.footer.company.name}
          </h4>
          <p className="text-gray-300 leading-relaxed">
            {t.footer.company.description}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 text-center text-xs text-orange-400 py-4">
          {t.footer.bottomBar}
        </div>
      </div>
    </footer>
  );
}
