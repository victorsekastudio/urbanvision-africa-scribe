
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContributeForm } from "@/components/forms/ContributeForm";

const Contribute = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-light text-gray-900 mb-8 font-serif">
            Contribute to UrbanVision
          </h1>
          
          <div className="text-gray-700 font-light leading-relaxed space-y-6">
            <p className="text-xl text-gray-600 mb-8">
              We welcome contributions from urban planners, researchers, policymakers, community advocates, and anyone passionate about creating better cities.
            </p>
            
            <h2 className="text-2xl font-light text-gray-900 mt-12 mb-6 font-serif">
              What We're Looking For
            </h2>
            
            <p>
              UrbanVision publishes a variety of content formats, including in-depth analyses, case studies, opinion pieces, photo essays, and data visualizations. We particularly value:
            </p>
            
            <ul className="space-y-3 list-disc list-inside">
              <li>Original research and analysis on urban development trends</li>
              <li>Case studies of innovative urban projects or policies</li>
              <li>Critical perspectives on current urban planning practices</li>
              <li>Stories that highlight community voices and experiences</li>
              <li>Data-driven investigations into urban challenges</li>
              <li>International perspectives on global urban issues</li>
            </ul>
            
            <h2 className="text-2xl font-light text-gray-900 mt-12 mb-6 font-serif">
              Submission Guidelines
            </h2>
            
            <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">
              Article Length
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Feature articles: 2,000-4,000 words</li>
              <li>Analysis pieces: 1,200-2,500 words</li>
              <li>Opinion pieces: 800-1,500 words</li>
              <li>Brief reports: 500-800 words</li>
            </ul>
            
            <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">
              Format Requirements
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Submit articles in Microsoft Word or Google Docs format</li>
              <li>Include a brief author bio (50-100 words)</li>
              <li>Provide high-resolution images when relevant (with proper attribution)</li>
              <li>Include citations and references for all claims and data</li>
              <li>Suggest relevant tags and categories for your piece</li>
            </ul>
            
            <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">
              Proposal Process
            </h3>
            <p>
              Before submitting a full article, we recommend sending a brief pitch (200-300 words) that outlines:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>The main argument or focus of your piece</li>
              <li>Why this topic is timely and relevant</li>
              <li>Your unique perspective or expertise on the subject</li>
              <li>The key sources or data you plan to reference</li>
            </ul>
            
            <h2 className="text-2xl font-light text-gray-900 mt-12 mb-6 font-serif">
              Editorial Standards
            </h2>
            
            <p>
              All submissions undergo a thorough editorial review process. We evaluate articles based on:
            </p>
            
            <ul className="space-y-3 list-disc list-inside">
              <li><strong>Accuracy:</strong> All factual claims must be supported by credible sources</li>
              <li><strong>Originality:</strong> We prioritize fresh perspectives and original analysis</li>
              <li><strong>Relevance:</strong> Content should address current urban challenges or opportunities</li>
              <li><strong>Clarity:</strong> Articles should be accessible to a broad, educated audience</li>
              <li><strong>Balance:</strong> We value nuanced perspectives that acknowledge complexity</li>
            </ul>
            
            <h2 className="text-2xl font-light text-gray-900 mt-12 mb-6 font-serif">
              Get in Touch
            </h2>
            
            <ContributeForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contribute;
