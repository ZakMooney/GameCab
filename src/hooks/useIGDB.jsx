// frontend/src/hooks/useIGDB.js
import { useState, useEffect, useCallback } from 'react';
import IGDBClient from '../services/igdbClient';

const useIGDB = () => {
  const [igdbClient, setIgdbClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // initialize client
  useEffect(() => {
    const client = new IGDBClient();
    setIgdbClient(client);
  }, []);

  // generic request handler
  const makeRequest = useCallback(async (requestFn) => {
    if (!igdbClient) {
      throw new Error('IGDB client not initialized');
    }

    setLoading(true);
    setError(null);

    try {
      const result = await requestFn(igdbClient);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [igdbClient]);

  // ppecific methods
  const searchGames = useCallback(async (searchTerm, limit, categoryIds = []) => {
    return makeRequest(client => client.searchGames(searchTerm, limit, categoryIds));
  }, [makeRequest]);

  const getGameById = useCallback(async (id) => {
    return makeRequest(client => client.getGameById(id));
  }, [makeRequest]);

  const getPopularGames = useCallback(async (limit) => {
    return makeRequest(client => client.getPopularGames(limit));
  }, [makeRequest]);

  const customQuery = useCallback(async (endpoint, query) => {
    return makeRequest(client => client.customQuery(endpoint, query));
  }, [makeRequest]);

  const getPopularityPrimitives = useCallback(async (options) => {
    return makeRequest(client => client.getPopularityPrimitives(options));
  }, [makeRequest]);

  const queryPopularityPrimitives = useCallback(async (query) => {
    return makeRequest(client => client.queryPopularityPrimitives(query));
  }, [makeRequest]);

  const getMostPopularGamesByVisits = useCallback(async (limit) => {
    return makeRequest(client => client.getMostPopularGamesByVisits(limit));
  }, [makeRequest]);

  const getMostFollowedGames = useCallback(async (limit) => {
    return makeRequest(client => client.getMostFollowedGames(limit));
  }, [makeRequest]);

  const getMostRatedGames = useCallback(async (limit) => {
    return makeRequest(client => client.getMostRatedGames(limit));
  }, [makeRequest]);

  const getPopularityForGames = useCallback(async (gameIds) => {
    return makeRequest(client => client.getPopularityForGames(gameIds));
  }, [makeRequest]);

  const getTrendingGames = useCallback(async (minValue, limit) => {
    return makeRequest(client => client.getTrendingGames(minValue, limit));
  }, [makeRequest]);

  const getGamesDetails = useCallback(async (gameIds) => {
    return makeRequest(client => client.getGamesDetails(gameIds));
  }, [makeRequest]);

  const getMostPopularGamesWithDetails = useCallback(async (limit) => {
    return makeRequest(client => client.getMostPopularGamesWithDetails(limit));
  }, [makeRequest]);

  return {
    searchGames,
    getGameById,
    getPopularGames,
    customQuery,
    getPopularityPrimitives,
    queryPopularityPrimitives,
    getMostPopularGamesByVisits,
    getMostFollowedGames,
    getMostRatedGames,
    getPopularityForGames,
    getTrendingGames,
    getGamesDetails,
    getMostPopularGamesWithDetails,
    loading,
    error,
    isReady: !!igdbClient
  };
};

export default useIGDB;