import HeroSection from "@/components/HeroSection";
import FeaturedSlider from "@/components/FeaturedSlider";
import GenreNavigation from "@/components/GenreNavigation";
import TrackListing from "@/components/TrackListing";
import LicenseSection from "@/components/LicenseSection";

// Beispielhafte Daten, die Tracks liefern
const exampleTracks = [
  {
    id: 1,
    title: "Ocean Depths",
    artist: "by Deep Vibes",
    duration: "3:45",
    price: "€19.99",
    moodTags: ["Relaxed", "Atmospheric"],
    instrumentTags: ["Synth", "Bass", "Piano"],
    cover: "/api/placeholder/80/80"
  },
  {
    id: 2,
    title: "Midnight Drive",
    artist: "by Neon Nights",
    duration: "4:12",
    price: "€19.99",
    moodTags: ["Nocturnal", "Smooth"],
    instrumentTags: ["Bass", "Pad", "Vocal"],
    cover: "/api/placeholder/80/80"
  },
  // ... mehr Tracks hier falls gewünscht
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Genre Navigation */}
      <GenreNavigation />

      {/* Featured Tracks Slider */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Emotional &<span className="block">ansprechend</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Lass dich von den beliebtesten Sounds inspirieren - aktuelle Beats,
              die die Musikszene prägen und kreative Ideen befeuern.
            </p>
          </div>
          <FeaturedSlider />
        </div>
      </section>

      {/* Track Listing mit Props */}
      <TrackListing tracks={exampleTracks} />

      {/* License Section */}
      <LicenseSection />
    </div>
  );
}