import { assets } from "@/assets/assets";

export default function Footer() {
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
              About MazadOman
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  About MazadOman
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Our Services
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 uppercase tracking-wider text-white">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Categories Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 uppercase tracking-wider text-white">
              Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Home Appliances
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Furniture
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Fashion
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Vehicles
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Real Estate
                </a>
              </li>
            </ul>
          </div>

          {/* Socials Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 uppercase tracking-wider text-white">
              Get In Touch
            </h4>
            <div className="flex space-x-4">
              {[
                { icon: "fab fa-facebook-f", link: "#" },
                { icon: "fab fa-twitter", link: "#" },
                { icon: "fab fa-youtube", link: "#" },
              ].map(({ icon, link }, idx) => (
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
          <h4 className="text-white font-semibold mb-2">MazadOman </h4>
          <p className="text-gray-300 leading-relaxed">
            MazadOman is a leading auction platform in Oman, providing a wide
            range of auction and purchase services. With a strong focus on
            innovation and trust, we ensure a secure bidding environment for all
            users.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 text-center text-xs text-orange-400 py-4">
          © {new Date().getFullYear()} MazadOman™ — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
