import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Queue {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

interface AddQueueRequest {
  name: string;
  message: string;
}

interface QueuesResponse {
  data: Queue[];
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Queue'],
  endpoints: (builder) => ({
    getQueues: builder.query<QueuesResponse, void>({
      query: () => 'queues_details',
      providesTags: ['Queue'],
    }),
    addQueue: builder.mutation<Queue, AddQueueRequest>({
      query: (body) => ({
        url: `queues/${body.name}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Queue'],
    }),
    fetchNextMessage: builder.mutation<string, string>({
      query: (name) => ({
        url: `queues/${name}`,
        method: 'GET',
      }),
      invalidatesTags: ['Queue'],
    }),
    deleteQueue: builder.mutation<void, string>({
      query: (id) => ({
        url: `queues/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Queue'],
    }),
    addMessage: builder.mutation<void, { queueId: string; message: string }>({
      query: ({ queueId, message }) => ({
        url: `/queues/${queueId}`,
        method: 'POST',
        body: { message },
      }),
      invalidatesTags: ['Queue'],
    }),
  }),
});

export const {
  useGetQueuesQuery,
  useAddQueueMutation,
  useFetchNextMessageMutation,
  useDeleteQueueMutation,
  useAddMessageMutation,
} = api;
