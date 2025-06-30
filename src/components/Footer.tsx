import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    legal: [
      { name: "Allgemeine Geschäftsbedingungen", href: "/agb" },
      { name: "Häufig gestellte Fragen", href: "/faq" },
      { name: "Lizenzen und Preise", href: "/licenses" },
      { name: "Privatsphäre und Datenschutz", href: "/privacy" },
      { name: "Widerrufsrecht", href: "/widerrufsrecht" },
      { name: "Impressum", href: "/impressum" },
      { name: "DSGVO", href: "/dsgvo" },
      { name: "Kontakt", href: "/contact" },
    ],
    support: [
      { name: "Häufige Fragen", href: "/faq" },
      { name: "Preise", href: "/pricing" },
      { name: "Kontakt", href: "/contact" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const paymentMethods = [
    "VISA",
    "Mastercard",
    "PayPal",
  ];

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-white">VIBETONE</h3>
              <p className="text-zinc-400 text-sm">More than sound - it's a vibe.</p>
            </div>
            <p className="text-zinc-400 text-sm">
              Über 500 sofort nutzbare Tracks für Social Media, Events & Werbung.
              Keine versteckten Gebühren - Sofort verfügbar.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="text-zinc-400 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Rechtliches</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Zahlungsmethoden</h4>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((method) => (
                <div
                  key={method}
                  className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded text-xs"
                >
                  {method}
                </div>
              ))}
            </div>
            <div className="text-zinc-400 text-xs space-y-1">
              <p>AGB</p>
              <p>Impressum</p>
              <p>DSGVO</p>
              <p>Preise</p>
              <p>Kontakt</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-zinc-400 text-sm">
              © 2025 VIBETONE. Alle Rechte vorbehalten.
            </p>
            <p className="text-zinc-400 text-sm">
              GEMAFREI Musik. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
