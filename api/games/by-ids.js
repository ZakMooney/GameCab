// api/games/by-ids.js
import { IGDBService } from '../_lib/igdb-service.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { gameIds } = req.body;
    
    if (!gameIds || !Array.isArray(gameIds) || gameIds.length === 0) {
      return res.status(400).json({ error: 'gameIds array is required' });
    }
    
    const query = `fields name, cover.url, first_release_date, rating, summary, genres.name, platforms.name, platforms.abbreviation, platforms.category, category, total_rating, aggregated_rating; where id = (${gameIds.join(',')});`;
    
    const igdbService = new IGDBService();
    const results = await igdbService.makeRequest('games', query);

    const sortedResults = gameIds.map(id => results.find(game => game.id === id)).filter(Boolean);

    res.json(sortedResults);
  } catch (error) {
    console.error('Get games by IDs error:', error);
    res.status(500).json({ error: error.message });
  }
}