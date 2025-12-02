import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MethodologySection from "@/components/MethodologySection";
import PairedGallery from "@/components/PairedGallery";
import CuratorialStatement from "@/components/CuratorialStatement";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <MethodologySection />
      <PairedGallery />
      <CuratorialStatement />
      <Footer />
    </main>
  );
}
