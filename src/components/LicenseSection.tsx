"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function LicenseSection() {
  const standardFeatures = [
    "Das Projekt kann überall veröffentlicht werden",
    "Der erworbene Song darf in einem Projekt verwendet werden"
  ];

  const extendedFeatures = [
    "Das Projekt kann überall veröffentlicht werden",
    "Der erworbene Song darf für mehrere Projekte verwendet werden"
  ];

  return (
    <section className="py-16 bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Jetzt Lizenz sichern
            <span className="block">und durchstarten!</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard License */}
          <Card className="relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 p-8">
            <div className="text-center mb-6">
              <div className="inline-block bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium mb-4">
                LICENCE
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">STANDARD</h3>
              <div className="text-5xl font-bold text-white">
                €<span className="text-6xl">29</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {standardFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-4 h-4 rounded-full bg-purple-500 flex-shrink-0 mt-0.5"></div>
                  <span className="text-white text-sm leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>

            <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3">
              Standard Lizenz wählen
            </Button>
          </Card>

          {/* Extended License */}
          <Card className="relative bg-gradient-to-br from-lime-500/20 to-yellow-500/20 border-lime-500/30 p-8">
            <div className="text-center mb-6">
              <div className="inline-block bg-lime-500/20 text-lime-300 px-3 py-1 rounded-full text-sm font-medium mb-4">
                LICENCE
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">EXTENDED</h3>
              <div className="text-5xl font-bold text-white">
                €<span className="text-6xl">49</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {extendedFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-4 h-4 rounded-full bg-lime-500 flex-shrink-0 mt-0.5"></div>
                  <span className="text-white text-sm leading-relaxed">
                    {feature.includes('mehrere') ? (
                      <>
                        Der erworbene Song darf für <strong>mehrere</strong><br />
                        Projekte verwendet werden.
                      </>
                    ) : (
                      feature
                    )}
                  </span>
                </div>
              ))}
            </div>

            <Button className="w-full bg-lime-500 hover:bg-lime-600 text-black font-semibold py-3">
              Extended Lizenz wählen
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
