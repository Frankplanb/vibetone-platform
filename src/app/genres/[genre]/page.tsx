import { notFound } from "next/navigation";
import TrackListing from "@/components/TrackListing";
import { Badge } from "@/components/ui/badge";

const genreData = {
  "deep-house": {
    name: "Deep House",
    description: "Tiefe Basslines und hypnotische Rhythmen für entspannte Vibes",
    color: "from-purple-500 to-purple-700",
    tracks: [
      {
        id: 1,
        title: "Ocean Depths",
        artist: "by Deep Vibes",
        duration: "3:45",
        price: "€19.99",
        moodTags: ["Relaxed", "Atmospheric"],
        instrumentTags: ["Synth", "Bass", "Piano"],
        cover: "/api/placeholder/80/80",
      },
      // ... weitere Tracks
    ],
  },
  // ... weitere Genres
};

type GenrePageProps = {
  params: Promise<{
    genre: string;
  }>;
};

export default async function GenrePage({ params }: GenrePageProps) {
  const resolvedParams = await params;
  const genre = genreData[resolvedParams.genre as keyof typeof genreData];

  if (!genre) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <section className={`bg-gradient-to-r ${genre.color} py-20`}>
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-black/20 text-white border-white/20">Genre</Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">{genre.name}</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">{genre.description}</p>
          <div className="mt-8">
            <Badge className="bg-white/20 text-white">{genre.tracks.length} Tracks verfügbar</Badge>
          </div>
        </div>
      </section>

      <section className="py-12 bg-zinc-900 border-b border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-lime-400">{genre.tracks.length}</div>
              <div className="text-zinc-400">Tracks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-lime-400">HD</div>
              <div className="text-zinc-400">Qualität</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-lime-400">€19+</div>
              <div className="text-zinc-400">Ab Preis</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-lime-400">Sofort</div>
              <div className="text-zinc-400">Download</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Alle {genre.name} Tracks</h2>
            <div className="flex items-center space-x-4">
              <select className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white text-sm">
                <option>Sortieren nach</option>
                <option>Neueste zuerst</option>
                <option>Preis aufsteigend</option>
                <option>Preis absteigend</option>
                <option>Beliebtheit</option>
              </select>
            </div>
          </div>

          <TrackListing tracks={genre.tracks} />
        </div>
      </section>

      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Ähnliche Genres entdecken</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(genreData)
              .filter(([key]) => key !== resolvedParams.genre)
              .slice(0, 6)
              .map(([key, data]) => (
                <a
                  key={key}
                  href={`/genres/${key}`}
                  className={`block p-6 rounded-xl bg-gradient-to-r ${data.color} hover:scale-105 transition-transform`}
                >
                  <h3 className="font-bold text-white text-lg mb-2">{data.name}</h3>
                  <p className="text-white/80 text-sm">{data.tracks.length} Tracks</p>
                </a>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(genreData).map((genre) => ({
    genre,
  }));
}

export const dynamicParams = false;