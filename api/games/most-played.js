import { IGDBService } from '../_lib/igdb-service.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { limit = 12 } = req.query;

    const popularityQuery = `fields game_id, value; where popularity_type = 4; limit ${limit}; sort value desc;`;
    
    const igdbService = new IGDBService();
    const popularityData = await igdbService.makeRequest('popularity_primitives', popularityQuery);
    
    if (popularityData.length === 0) {
      return res.json([]);
    }
    
    const gameIds = popularityData.map(item => item.game_id);
    const gameDetailsQuery = `fields name, cover.url, first_release_date, rating, summary, genres.name, platforms.name, platforms.abbreviation, platforms.category, category, total_rating, aggregated_rating; where id = (${gameIds.join(',')});`;
    
    const gameDetails = await igdbService.makeRequest('games', gameDetailsQuery);

    const combinedResults = popularityData.map(popItem => {
      const gameDetail = gameDetails.find(game => game.id === popItem.game_id);
      return {
        game_id: popItem.game_id,
        popularity_value: popItem.value,
        game: gameDetail || null
      };
    }).filter(item => item.game !== null);
    
    res.json(combinedResults);
  } catch (error) {
    console.error('Most played games error:', error);
    res.status(500).json({ error: error.message });
  }
}