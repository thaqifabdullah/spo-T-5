import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'a1557cf546mshc6ba0bdcc27efc6p104e57jsnfdf5d9d2b36b');

      return headers;
    },
  }),
  endpoints: (builder) => ({

    getTopCharts: builder.query({
      query: () => 'charts/world',
    }),

    getSongDetails: builder.query({
      query: (songid) => `tracks/details?track_id=${songid}`,
    }),

    getSongRelated: builder.query({
      query: (songid) => `/tracks/related?track_id=${songid}`,
    }),

    getArtistDetails: builder.query({
      query: (artistId) => `/artists/details?artist_id=${artistId}`,
    }),

    getCountryCharts: builder.query({
      query: (counrtyCode) => `/charts/country?country_code=${counrtyCode}`,
    }),

    getSongsBySearch: builder.query({
      query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),

    getSongsByGenre: builder.query({
      query: (genre) => `/charts/genre-world?genre_code=${genre}`,
    }),

  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetCountryChartsQuery,
  useGetSongsBySearchQuery,
  useGetSongsByGenreQuery,
} = shazamCoreApi;
