
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateEvent, useUpdateEvent } from "@/hooks/useEvents";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "./form/ImageUpload";
import type { Event } from "@/types/database";

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: Event;
  onSave?: () => void;
}

export const EventDialog = ({ open, onOpenChange, event, onSave }: EventDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    type: "webinar" as "webinar" | "event",
    image_url: "",
    registration_link: "",
    attendees_count: 0,
    published: true,
  });

  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const { toast } = useToast();

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description || "",
        date: event.date,
        time: event.time,
        type: event.type,
        image_url: event.image_url || "",
        registration_link: event.registration_link || "",
        attendees_count: event.attendees_count,
        published: event.published,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        type: "webinar",
        image_url: "",
        registration_link: "",
        attendees_count: 0,
        published: true,
      });
    }
  }, [event, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (event) {
        await updateEvent.mutateAsync({ id: event.id, ...formData });
        toast({
          title: "Success",
          description: "Event updated successfully",
        });
      } else {
        await createEvent.mutateAsync(formData);
        toast({
          title: "Success",
          description: "Event created successfully",
        });
      }
      
      onOpenChange(false);
      onSave?.();
    } catch (error) {
      console.error("Error saving event:", error);
      toast({
        title: "Error",
        description: "Failed to save event",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Event" : "Create New Event"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="e.g., 14:00 GMT"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={formData.type} onValueChange={(value: "webinar" | "event") => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="webinar">Webinar</SelectItem>
                <SelectItem value="event">Event</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ImageUpload
            value={formData.image_url}
            onChange={(url) => setFormData({ ...formData, image_url: url })}
            label="Event Image"
            placeholder="https://example.com/image.jpg"
          />

          <div className="space-y-2">
            <Label htmlFor="registration_link">Registration Link</Label>
            <Input
              id="registration_link"
              value={formData.registration_link}
              onChange={(e) => setFormData({ ...formData, registration_link: e.target.value })}
              placeholder="https://example.com/register"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attendees_count">Attendees Count</Label>
            <Input
              id="attendees_count"
              type="number"
              value={formData.attendees_count}
              onChange={(e) => setFormData({ ...formData, attendees_count: parseInt(e.target.value) || 0 })}
              min="0"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
            />
            <Label htmlFor="published">Published</Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={createEvent.isPending || updateEvent.isPending}>
              {event ? "Update Event" : "Create Event"}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
