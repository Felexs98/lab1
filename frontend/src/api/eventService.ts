import { baseApi } from "@/api/axios";
import { AxiosResponse } from "axios";
import { Event } from "@/types/event";

// Получение всех мероприятий
export const getEvents = async (): Promise<Event[]> => {
  const response: AxiosResponse<Event[]> = await baseApi.get("/events");
  return response.data;
};

export const getUserEvents = async (userId: string) => {
  const response = await baseApi.get('/events');

  const events = Array.isArray(response.data) ? response.data : response.data.data; // <-- правильно

  return events.filter((event: Event) => event.createdBy === userId);
};

export const createEvent = async (eventData: { title: string; description: string; date: string; category: string }) => {
  const response = await baseApi.post("/events", eventData);
  return response.data;
};

export const updateEvent = async (id: string, eventData: { title: string; description: string; date: string; category: string }) => {
  const response = await baseApi.put(`/events/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id: string) => {
  const response = await baseApi.delete(`/events/${id}`);
  return response.data;
};

export const registerForEvent = async (eventId: string) => {
  const response = await baseApi.post(`/events/${eventId}/register`);
  return response.data;
};

export const getEventParticipants = async (eventId: string) => {
  try {
    const response = await baseApi.get(`/events/${eventId}/participants`);
    return response.data.data; // FIX: получаем participants из data.data
  } catch (error) {
    console.error("Ошибка при получении участников:", error.response ? error.response.data : error);
    throw error;
  }
};

export const unregisterFromEvent = async (eventId: string) => {
  const response = await baseApi.delete(`/events/${eventId}/register`);
  return response.data;
};
