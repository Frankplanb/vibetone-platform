"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GenreNavigation() {
  const genres = [
    { name: "Deep House", href: "/genres/deep-house", color: "from-purple-500 to-purple-700" },
    { name: "Elektro House", href: "/genres/elektro-house", color: "from-blue-500 to-blue-700" },
    { name: "Pop", href: "/genres/pop", color: "from-pink-500 to-pink-700" },
    { name: "Jazz", href: "/genres/jazz", color: "from-orange-500 to-orange-700" },
    { name: "Ambiente", href: "/genres/ambiente", color: "from-green-500 to-green-700" },
    { name: "Neu", href: "/genres/neu", color: "from-lime-500 to-lime-700" },
  ];

  return (
    <section className="py-8 bg-zinc-950 border-b border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4">
          {genres.map((genre) => (
            <Link key={genre.name} href={genre.href}>
              <Button
                variant="outline"
                className="genre-button px-6 py-3 text-white hover:text-black transition-all duration-300"
              >
                {genre.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
