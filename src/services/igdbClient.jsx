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

  async getPopularGames(limit = 20) {
    return this.makeRequest(`/games/popular?limit=${limit}`, {
      method: 'GET'
    });
  }

  async customQuery(endpoint, query) {
    return this.makeRequest(`/igdb/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
  }

  async getPopularityPrimitives(options = {}) {
    const { limit = 50, offset = 0, fields = 'game_id,popularity_type,value' } = options;
    
    return this.makeRequest(`/popularity_primitives?limit=${limit}&offset=${offset}&fields=${fields}`, {
      method: 'GET'
    });
  }

  async queryPopularityPrimitives(query) {
    return this.makeRequest('/popularity_primitives', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
  }

  async getMostPopularGamesByVisits(limit = 10) {
    const query = `
      fields game_id, value;
      where popularity_type = 1;
      limit ${limit};
      sort value desc;
    `;
    return this.queryPopularityPrimitives(query);
  }

  async getMostFollowedGames(limit = 10) {
    const query = `
      fields game_id, value;
      where popularity_type = 2;
      limit ${limit};
      sort value desc;
    `;
    return this.queryPopularityPrimitives(query);
  }

  async getMostRatedGames(limit = 10) {
    const query = `
      fields game_id, value;
      where popularity_type = 3;
      limit ${limit};
      sort value desc;
    `;
    return this.queryPopularityPrimitives(query);
  }

  async getPopularityForGames(gameIds) {
    const gameIdsList = Array.isArray(gameIds) ? gameIds.join(',') : gameIds;
    const query = `
      fields game_id, popularity_type, value;
      where game_id = (${gameIdsList});
    `;
    return this.queryPopularityPrimitives(query);
  }

  async getTrendingGames(minValue = 50, limit = 20) {
    const query = `
      fields game_id, popularity_type, value;
      where value > ${minValue};
      limit ${limit};
      sort value desc;
    `;
    return this.queryPopularityPrimitives(query);
  }

  async getGamesDetails(gameIds) {
    const gameIdsList = Array.isArray(gameIds) ? gameIds.join(',') : gameIds;
    const query = `
      fields name, cover.url, first_release_date, rating, summary, genres.name, platforms.name;
      where id = (${gameIdsList});
    `;
    return this.customQuery('games', query);
  }

  async getMostPopularGamesWithDetails(limit = 10) {
    try {
      const popularityData = await this.getMostPopularGamesByVisits(limit);
      
      const gameIds = popularityData.map(item => item.game_id);
      
      const gameDetails = await this.getGamesDetails(gameIds);
      
      return popularityData.map(popItem => {
        const gameDetail = gameDetails.find(game => game.id === popItem.game_id);
        return {
          ...popItem,
          game: gameDetail || null
        };
      });
    } catch (error) {
      throw new Error(`Failed to get popular games with details: ${error.message}`);
    }
  }
}

export default IGDBClient;