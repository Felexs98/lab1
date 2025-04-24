import { baseApi } from "@/api/axios";
import { Event } from '@/types/event';

export const getEvents = async (): Promise<Event[]> => {
  const response = await baseApi.get('/events');
  return response.data;
};

export const createEvent = async (eventData: {
  title: string;
  description: string;
  date: string;
  category: string;
}) => {
  const response = await baseApi.post("/events", eventData);
  return response.data;
};

export const updateEvent = async (
  id: string,
  eventData: {
    title: string;
    description: string;
    date: string;
    category: string;
  }
) => {
  const response = await baseApi.put(`/events/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id: string) => {
  const response = await baseApi.delete(`/events/${id}`);
  return response.data;
};
