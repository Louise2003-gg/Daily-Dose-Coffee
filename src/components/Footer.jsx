import useReveal from "../hooks/useReveal";
import facebookIcon from "../assets/facebook-svgrepo-com.svg";
import instagramIcon from "../assets/instagram-svgrepo-com.svg";
import twitterIcon from "../assets/twitter-154-svgrepo-com.svg";

const linkActions = {
  "Shop":               { page: "menu" },
  "Order ahead":        { page: "menu" },
  "Menu":               { page: "menu" },
  "Find a location":    { page: "location" },
  "About us":           { page: "about" },
  "Our story":          { page: "about" },
  "Terms of use":       { external: "#" },
  "Privacy policy":     { external: "#" },
  "Cookies":            { external: "#" },
  "Plans & pricing":    { external: "#" },
  "Sell your products": { external: "#" },
  "Jobs":               { external: "#" },
};

const socialIcons = [
  { icon: facebookIcon,  label: "Facebook",  href: "https://facebook.com" },
  { icon: instagramIcon, label: "Instagram", href: "https://instagram.com" },
  { icon: twitterIcon,   label: "Twitter",   href: "https://twitter.com" },
];

const footerLinks = [
  { title: "PRIVACY",     links: ["Terms of use", "Privacy policy", "Cookies"] },
  { title: "SERVICES",    links: ["Shop", "Order ahead", "Menu"] },
  { title: "ABOUT US",    links: ["Find a location", "About us", "Our story"] },
  { title: "INFORMATION", links: ["Plans & pricing", "Sell your products", "Jobs"] },
];

export default function Footer({ onNavigate }) {
  const [ref, visible] = useReveal(0.1);

  const handleLink = (label) => {
    const action = linkActions[label];
    if (!action) return;
    if (action.page) onNavigate?.(action.page);
  };

  return (
    <footer ref={ref} className="bg-[#2a1f0e] text-white py-10 px-5 sm:px-8 lg:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Top row: brand + links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8">
          {/* Brand */}
          <div className={`col-span-2 sm:col-span-1 ${visible ? "reveal-up" : "opacity-0"}`} style={{ animationDelay: "0s" }}>
            <p
              className="font-lobster text-xl text-yellow-400 cursor-pointer hover:text-yellow-300 transition-colors mb-2"
              onClick={() => onNavigate?.("home")}
            >
              Daily Dose
            </p>
            <p className="text-gray-400 text-xs leading-relaxed">
              Your daily cup of happiness, brewed fresh every morning.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map(({ title, links }, i) => (
            <div
              key={title}
              className={visible ? "reveal-up" : "opacity-0"}
              style={{ animationDelay: `${(i + 1) * 0.08}s` }}
            >
              <p className="font-bold text-xs tracking-widest mb-3">{title}</p>
              <ul className="space-y-1.5">
                {links.map((l) => (
                  <li
                    key={l}
                    onClick={() => handleLink(l)}
                    className="text-gray-400 text-xs cursor-pointer hover:text-white transition-colors"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div
            className={visible ? "reveal-up" : "opacity-0"}
            style={{ animationDelay: "0.45s" }}
          >
            <p className="font-bold text-xs tracking-widest mb-3">SOCIAL MEDIA</p>
            <div className="flex gap-3 flex-wrap">
              {socialIcons.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#b8860b] transition-colors flex items-center justify-center p-1.5"
                >
                  <img src={icon} alt={label} className="w-full h-full brightness-0 invert" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">© 2025 Daily Dose. All rights reserved.</p>
          <p className="text-gray-500 text-xs">Made with ☕ in the Philippines</p>
        </div>
      </div>
    </footer>
  );
}
