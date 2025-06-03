
import { Hero } from "@/components/homepage/Hero";
import { FeaturedReads } from "@/components/homepage/FeaturedReads";
import { EditorialPillars } from "@/components/homepage/EditorialPillars";
import { EditorNote } from "@/components/homepage/EditorNote";
import { Newsletter } from "@/components/homepage/Newsletter";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <FeaturedReads />
        <EditorialPillars />
        <EditorNote />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
