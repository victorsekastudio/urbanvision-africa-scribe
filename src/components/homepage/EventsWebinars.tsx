
import { Calendar, Clock, Users, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

const events = [
  {
    id: 1,
    title: "Urban Planning in Lagos: Future Challenges",
    date: "2024-06-15",
    time: "14:00 GMT",
    type: "webinar",
    attendees: 120,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=250&fit=crop",
    description: "Join urban planners and experts as we discuss the evolving landscape of Lagos and sustainable development strategies."
  },
  {
    id: 2,
    title: "Smart Cities Conference - Nairobi",
    date: "2024-06-20",
    time: "09:00 EAT",
    type: "event",
    attendees: 250,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop",
    description: "A comprehensive conference exploring smart city solutions and innovations across East Africa."
  },
  {
    id: 3,
    title: "Transport Innovation Workshop",
    date: "2024-06-25",
    time: "16:00 WAT",
    type: "webinar",
    attendees: 85,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    description: "Interactive workshop on sustainable transport solutions for African urban centers."
  }
];

export const EventsWebinars = () => {
  const { currentLanguage } = useLanguage();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'FR' ? 'fr-FR' : 'en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-gray-900 mb-4">
            Events & Webinars
          </h2>
          <p className="text-lg text-gray-600 font-light tracking-wide max-w-3xl mx-auto">
            Join our community discussions and expert panels on African urban development
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow h-[600px] flex flex-col">
              <div className="relative">
                <img 
                  src={event.image}
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
                    <span>{event.attendees} registered</span>
                  </div>
                </div>
                
                <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-md font-medium tracking-wide hover:bg-gray-800 transition-colors mt-auto">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/events"
            className="inline-flex items-center space-x-2 text-gray-900 font-medium tracking-wide hover:text-gray-700 transition-colors"
          >
            <span>View All Events</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
