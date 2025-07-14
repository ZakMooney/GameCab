import { useState, useEffect, useCallback } from 'react';
import IGDBClient from '../services/igdbClient';

const useIGDB = () => {
  const [igdbClient, setIgdbClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const client = new IGDBClient();
    setIgdbClient(client);
  }, []);

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

  const searchGames = useCallback(async (searchTerm, limit, categoryIds = []) => {
    return makeRequest(client => client.searchGames(searchTerm, limit, categoryIds));
  }, [makeRequest]);

  const getGamesByIds = useCallback(async (gameIds, fields) => {
    return makeRequest(client => client.getGamesByIds(gameIds, fields));
  }, [makeRequest]);

  const customQuery = useCallback(async (endpoint, query) => {
    return makeRequest(client => client.customQuery(endpoint, query));
  }, [makeRequest]);

  const getMostPlayedGamesWithDetails = useCallback(async (limit = 12) => {
    return makeRequest(client => client.getMostPlayedGamesWithDetails(limit));
  }, [makeRequest]);

  return {
    searchGames,
    getGamesByIds,
    customQuery,
    getMostPlayedGamesWithDetails,
    loading,
    error,
    isReady: !!igdbClient
  };
};

export default useIGDB;