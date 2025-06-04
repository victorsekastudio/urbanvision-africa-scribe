
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Eye, Calendar, Clock, Users, Video, Trash2 } from "lucide-react";
import type { Event } from "@/types/database";

interface EventsTabProps {
  events: Event[] | undefined;
  onCreateEvent: () => void;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (eventId: string) => void;
}

export const EventsTab = ({
  events,
  onCreateEvent,
  onEditEvent,
  onDeleteEvent,
}: EventsTabProps) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Events</h2>
        <Button onClick={onCreateEvent}>
          <Plus className="w-4 h-4 mr-2" />
          New Event
        </Button>
      </div>
      
      <div className="space-y-4">
        {events?.map((event) => (
          <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-medium">{event.title}</h3>
                <Badge 
                  variant={event.published ? "default" : "secondary"}
                >
                  {event.published ? "Published" : "Draft"}
                </Badge>
                <Badge 
                  variant={event.type === 'webinar' ? "outline" : "default"}
                >
                  {event.type === 'webinar' ? <Video className="w-3 h-3 mr-1" /> : <Calendar className="w-3 h-3 mr-1" />}
                  {event.type === 'webinar' ? 'Webinar' : 'Event'}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">{event.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(event.date).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {event.attendees_count} registered
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onEditEvent(event)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onDeleteEvent(event.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
