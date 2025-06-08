
import { Calendar, Clock, Users, Video, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { useUpcomingEvents } from "@/hooks/useEvents";
import { Skeleton } from "@/components/ui/skeleton";
import { translations } from "@/utils/translations";

export const EventsWebinars = () => {
  const { currentLanguage } = useLanguage();
  const { data: allEvents, isLoading } = useUpcomingEvents();
  const t = translations[currentLanguage];

  // Get first 3 upcoming events for homepage
  const events = allEvents?.slice(0, 3) || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'FR' ? 'fr-FR' : 'en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-wide text-gray-900 mb-4">
              {t.upcomingEventsWebinars}
            </h2>
            <p className="text-lg text-gray-600 font-light tracking-wide max-w-3xl mx-auto">
              {t.upcomingEventsSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden h-[600px] flex flex-col">
                <Skeleton className="w-full h-48" />
                <div className="p-6 flex flex-col flex-1">
                  <div className="h-14 mb-4">
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                  <div className="h-16 mb-4">
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <div className="space-y-2 mb-6">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <Skeleton className="h-10 w-full mt-auto rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-gray-900 mb-4">
            {t.upcomingEventsWebinars}
          </h2>
          <p className="text-lg text-gray-600 font-light tracking-wide max-w-3xl mx-auto">
            {t.upcomingEventsSubtitle}
          </p>
        </div>
        
        {events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow h-[600px] flex flex-col">
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
                  <div className="h-14 mb-4">
                    <h3 className="text-xl font-light tracking-wide text-gray-900 leading-tight line-clamp-2 h-full flex items-center">
                      {event.title}
                    </h3>
                  </div>
                  
                  <div className="h-16 mb-4">
                    <p className="text-gray-600 text-sm font-light tracking-wide leading-relaxed line-clamp-3">
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
                      <span>{event.attendees_count} {t.registered}</span>
                    </div>
                  </div>
                  
                  {event.registration_link ? (
                    <a 
                      href={event.registration_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gray-900 text-white py-2 px-4 rounded-md font-medium tracking-wide hover:bg-gray-800 transition-colors mt-auto inline-flex items-center justify-center gap-2"
                    >
                      {t.registerNow}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-md font-medium tracking-wide hover:bg-gray-800 transition-colors mt-auto">
                      {t.registerNow}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg font-light">
              {t.noUpcomingEvents}
            </p>
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link 
            to="/events"
            className="inline-flex items-center space-x-2 text-gray-900 font-medium tracking-wide hover:text-gray-700 transition-colors"
          >
            <span>{t.viewAllEvents}</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
