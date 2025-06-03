
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-light text-gray-900 mb-8 font-serif">
            About UrbanVision
          </h1>
          
          <div className="text-gray-700 font-light leading-relaxed space-y-6">
            <p className="text-xl text-gray-600 mb-8">
              UrbanVision is a forward-thinking digital magazine dedicated to exploring the evolving landscape of urban development, sustainability, and innovation.
            </p>
            
            <h2 className="text-2xl font-light text-gray-900 mt-12 mb-6 font-serif">
              Our Editorial Mission
            </h2>
            
            <p>
              We believe that cities are the laboratories of our future. As more than half of the world's population now lives in urban areas, the decisions we make about how to build, sustain, and govern our cities will determine the trajectory of human civilization for generations to come.
            </p>
            
            <p>
              UrbanVision serves as a platform for thought leaders, practitioners, researchers, and citizens to share insights, challenge assumptions, and propose solutions for the complex challenges facing urban communities worldwide.
            </p>
            
            <h2 className="text-2xl font-light text-gray-900 mt-12 mb-6 font-serif">
              What We Cover
            </h2>
            
            <ul className="space-y-3 list-disc list-inside">
              <li><strong>Urban Trends & Growth:</strong> Analysis of demographic shifts, urban sprawl, and emerging development patterns</li>
              <li><strong>Infrastructure Gaps & Investment:</strong> Critical examination of infrastructure needs and funding solutions</li>
              <li><strong>Climate Resilience & Sustainability:</strong> Strategies for building climate-adaptive and environmentally sustainable cities</li>
              <li><strong>Transport & Mobility:</strong> Innovation in urban transportation and mobility solutions</li>
              <li><strong>Smart Cities & Technology:</strong> The role of technology in creating more efficient and livable urban environments</li>
              <li><strong>Voices from the Ground:</strong> Stories and perspectives from communities directly affected by urban change</li>
            </ul>
            
            <h2 className="text-2xl font-light text-gray-900 mt-12 mb-6 font-serif">
              Our Approach
            </h2>
            
            <p>
              We are committed to publishing evidence-based, nuanced reporting that goes beyond surface-level analysis. Our content combines rigorous research with accessible storytelling, making complex urban issues understandable to a broad audience while maintaining the depth necessary for meaningful discourse.
            </p>
            
            <p>
              UrbanVision champions inclusive urban development that prioritizes equity, sustainability, and community well-being. We amplify diverse voices and perspectives, particularly those of communities that are often marginalized in urban planning discussions.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
