import Link from 'next/link';
import { useState } from 'react';

interface RedeSocial {
  href: string;
  icon: JSX.Element;
  label: string;
}

export function Header() {
  const [loaded, setLoaded] = useState(false);

  return (
    <header className="py-6 px-6 md:px-12 lg:px-24 flex justify-between items-center">
      <div>
        <Link href="/" legacyBehavior>
          <a>
            <img
              src="/logo.png"
              alt="logomarca do blog"
              className="w-28 h-auto"
            />
          </a>
        </Link>
      </div>
      <div className="flex gap-4">
        <RedeSocial
          href="https://wa.me/5565984173635"
          icon={<img src="/whatsapp.png" alt="WhatsApp" width={50} height={50} />}
          label="WhatsApp"
        />
        <RedeSocial
          href="https://www.instagram.com/ja_artesanatoo/"
          icon={<img src="/instagram.png" alt="Instagram" width={50} height={50} />}
          label="Instagram"
        />
        <RedeSocial
          href="https://www.facebook.com/jaartesanato05"
          icon={<img src="/facebook.png" alt="Facebook" width={50} height={50} />}
          label="Facebook"
        />
      </div>
    </header>
  );
}

function RedeSocial({ href, icon, label }: RedeSocial) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-700 transition-colors duration-300"
    >
      {icon}
      <span className="sr-only">{label}</span>
    </a>
  );
}
