
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuditLog } from "./useAuditLog";
import type { Event } from "@/types/database";

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
      return data as Event[];
    },
  });
};

export const usePublishedEvents = () => {
  return useQuery({
    queryKey: ["published-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("published", true)
        .order("date", { ascending: true });

      if (error) throw error;
      return data as Event[];
    },
  });
};

export const useUpcomingEvents = () => {
  return useQuery({
    queryKey: ["upcoming-events"],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("published", true)
        .gte("date", today)
        .order("date", { ascending: true });

      if (error) throw error;
      return data as Event[];
    },
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const { logAction } = useAuditLog();

  return useMutation({
    mutationFn: async (event: Omit<Event, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("events")
        .insert([event])
        .select()
        .single();

      if (error) throw error;

      // Log the action
      await logAction({
        action: 'CREATE_EVENT',
        table_name: 'events',
        record_id: data.id,
        new_values: event
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["published-events"] });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  const { logAction } = useAuditLog();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Event> & { id: string }) => {
      // Get current event for audit log
      const { data: currentEvent } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      const { data, error } = await supabase
        .from("events")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      // Log the action
      await logAction({
        action: 'UPDATE_EVENT',
        table_name: 'events',
        record_id: id,
        old_values: currentEvent,
        new_values: updates
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["published-events"] });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const { logAction } = useAuditLog();

  return useMutation({
    mutationFn: async (id: string) => {
      // Get current event for audit log
      const { data: currentEvent } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Log the action
      await logAction({
        action: 'DELETE_EVENT',
        table_name: 'events',
        record_id: id,
        old_values: currentEvent
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["published-events"] });
    },
  });
};
