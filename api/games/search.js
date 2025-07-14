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
    const { searchTerm, limit = 10, categoryIds = [] } = req.body;

    let query = `search "${searchTerm}";`;

    if (categoryIds && categoryIds.length > 0) {
      query += ` where category = (${categoryIds.join(',')});`;
    }
    
    query += ` fields name, cover.url, first_release_date, rating, summary, genres.name, platforms.name, platforms.abbreviation, platforms.category, category, total_rating, aggregated_rating;`;
    query += ` limit ${limit};`;
    
    const igdbService = new IGDBService();
    const results = await igdbService.makeRequest('games', query);
    
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: error.message });
  }
}