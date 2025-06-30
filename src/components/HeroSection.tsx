"use client";

import { Button } from "@/components/ui/button";
import { Play, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const features = [
    "Über 500 sofort nutzbare Tracks",
    "Für Social Media, Events & Werbung",
    "Keine versteckten Gebühren",
    "Sofort verfügbar"
  ];

  return (
    <section className="relative w-full">
      {/* Bannerbild mit voller Sichtbarkeit */}
      <img
        src="/VIBETONE-WEBSEITE.png"
        alt="Vibetone Banner"
        className="w-full h-auto object-contain"
      />

      {/* Text-Overlay */}
      <div className="absolute left-6 bottom-6 md:left-12 md:bottom-12 z-10 bg-transparent text-white">
        <div className="space-y-5 text-lg md:text-2xl font-semibold">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-4">
              <CheckCircle className="h-7 w-7 md:h-9 md:w-9 text-lime-400 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Link href="/music">
            <Button
              size="lg"
              className="bg-lime-500 hover:bg-lime-600 text-black font-semibold px-8 py-4 text-lg"
            >
              <Play className="h-6 w-6 mr-2" />
              Musik entdecken
            </Button>
          </Link>
          <Link href="/licenses">
            <Button
              variant="outline"
              size="lg"
              className="border-lime-500 text-lime-500 hover:bg-lime-500 hover:text-black px-8 py-4 text-lg"
            >
              Lizenzen ansehen
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}