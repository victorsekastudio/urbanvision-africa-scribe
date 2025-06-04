
import { Calendar, Clock, Users, Video } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const events = [
  {
    id: 1,
    title: "Urban Planning in Lagos: Future Challenges",
    date: "2024-06-15",
    time: "14:00 GMT",
    type: "webinar",
    attendees: 120,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=250&fit=crop",
    description: "Join urban planners and experts as we discuss the evolving landscape of Lagos and sustainable development strategies for the future of African cities."
  },
  {
    id: 2,
    title: "Smart Cities Conference - Nairobi",
    date: "2024-06-20",
    time: "09:00 EAT",
    type: "event",
    attendees: 250,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop",
    description: "A comprehensive conference exploring smart city solutions and innovations across East Africa. Learn about the latest technologies and sustainable urban development practices."
  },
  {
    id: 3,
    title: "Transport Innovation Workshop",
    date: "2024-06-25",
    time: "16:00 WAT",
    type: "webinar",
    attendees: 85,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    description: "Interactive workshop on sustainable transport solutions for African urban centers. Explore cutting-edge mobility solutions and their implementation strategies."
  },
  {
    id: 4,
    title: "Green Building Summit - Cairo",
    date: "2024-07-05",
    time: "10:00 EET",
    type: "event",
    attendees: 180,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
    description: "Discover the latest trends in sustainable architecture and green building practices across the African continent."
  },
  {
    id: 5,
    title: "Water Management Webinar",
    date: "2024-07-12",
    time: "15:00 CAT",
    type: "webinar",
    attendees: 95,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop",
    description: "Learn about innovative water management solutions for urban areas in Africa, focusing on conservation and sustainable practices."
  },
  {
    id: 6,
    title: "African Urban Design Forum - Accra",
    date: "2024-07-18",
    time: "09:30 GMT",
    type: "event",
    attendees: 300,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop",
    description: "A collaborative forum bringing together urban designers, architects, and city planners to discuss the future of African cities."
  }
];

const Events = () => {
  const { currentLanguage } = useLanguage();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'FR' ? 'fr-FR' : 'en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

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
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
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
              
              <div className="p-6">
                <h3 className="text-xl font-light tracking-wide text-gray-900 mb-3 leading-tight">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 text-sm font-light tracking-wide leading-relaxed mb-4">
                  {event.description}
                </p>
                
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
                
                <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-md font-medium tracking-wide hover:bg-gray-800 transition-colors">
                  Register Now
                </button>
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
