
import { Calendar, Clock, Users, Video, ExternalLink } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { usePublishedEvents } from "@/hooks/useEvents";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Events = () => {
  const { currentLanguage } = useLanguage();
  const { data: events, isLoading } = usePublishedEvents();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'FR' ? 'fr-FR' : 'en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light tracking-wide text-gray-900 mb-4">
              All Events & Webinars
            </h1>
            <p className="text-lg text-gray-600 font-light tracking-wide max-w-3xl mx-auto">
              Discover upcoming events, conferences, and webinars focused on African urban development, sustainability, and innovation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-pulse h-[650px]">
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-gray-900 mb-4">
            All Events & Webinars
          </h1>
          <p className="text-lg text-gray-600 font-light tracking-wide max-w-3xl mx-auto">
            Discover upcoming events, conferences, and webinars focused on African urban development, sustainability, and innovation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events?.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow h-[650px] flex flex-col">
              <div className="relative">
                <img 
                  src={event.image_url || "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=250&fit=crop"}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    event.type === 'webinar' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {event.type === 'webinar' ? <Video className="w-3 h-3 mr-1" /> : <Calendar className="w-3 h-3 mr-1" />}
                    {event.type === 'webinar' ? 'Webinar' : 'Event'}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="h-16 mb-4">
                  <h3 className="text-xl font-light tracking-wide text-gray-900 mb-3 leading-tight line-clamp-2 h-full flex items-center">
                    {event.title}
                  </h3>
                </div>
                
                <div className="h-20 mb-4">
                  <p className="text-gray-600 text-sm font-light tracking-wide leading-relaxed line-clamp-4">
                    {event.description}
                  </p>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{event.attendees_count} registered</span>
                  </div>
                </div>
                
                {event.registration_link ? (
                  <a 
                    href={event.registration_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gray-900 text-white py-2 px-4 rounded-md font-medium tracking-wide hover:bg-gray-800 transition-colors mt-auto inline-flex items-center justify-center gap-2"
                  >
                    Register Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-md font-medium tracking-wide hover:bg-gray-800 transition-colors mt-auto">
                    Register Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
