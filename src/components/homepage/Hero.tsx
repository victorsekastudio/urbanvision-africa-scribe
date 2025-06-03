
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="py-16 md:py-24">
      <article className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              Featured Article
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-gray-900">
              Lagos Smart City Initiative: A Blueprint for African Urban Innovation
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-serif">
            How Nigeria's economic capital is leveraging technology and data-driven solutions 
            to address urban challenges, from traffic management to waste collection, 
            setting a precedent for cities across Sub-Saharan Africa.
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>By Amara Okafor</span>
            <span>•</span>
            <span>March 15, 2024</span>
          </div>
          <button className="group flex items-center space-x-2 text-gray-900 font-medium hover:text-gray-700 transition-colors">
            <span>Read Article</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&crop=entropy"
            alt="Lagos cityscape showing modern urban development"
            className="w-full h-[400px] md:h-[500px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </article>
    </section>
  );
};
