import { apiBaseURL } from '../config/api';

class IGDBClient {
  constructor(baseURL = apiBaseURL) {
    this.baseURL = baseURL;
  }

  async makeRequest(endpoint, options = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async searchGames(searchTerm, limit = 10, categoryIds = []) {
    return this.makeRequest('/games/search', {
      method: 'POST',
      body: JSON.stringify({ searchTerm, limit, categoryIds }),
    });
  }

  async getGameById(id) {
    return this.makeRequest(`/games/${id}`);
  }

  async getGamesByIds(gameIds) {
    return this.makeRequest('/games/by-ids', {
      method: 'POST',
      body: JSON.stringify({ gameIds }),
    });
  }

  async customQuery(endpoint, query) {
    return this.makeRequest(`/igdb/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
  }

  async getMostPlayedGamesWithDetails(limit = 10) {
    return this.makeRequest(`/games/most-played?limit=${limit}`, {
      method: 'GET'
    });
  }
}

export default IGDBClient;