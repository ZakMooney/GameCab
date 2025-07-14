export class IGDBService {
  constructor() {
    this.clientId = process.env.IGDB_CLIENT_ID;
    this.clientSecret = process.env.IGDB_CLIENT_SECRET;
    this.baseURL = 'https://api.igdb.com/v4';
    this.tokenURL = 'https://id.twitch.tv/oauth2/token';
    this.token = null;
    this.tokenExpiry = null;
  }

  async getAccessToken() {
    const response = await fetch(this.tokenURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }

    const data = await response.json();
    this.token = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
    
    return this.token;
  }

  async ensureValidToken() {
    if (!this.token || Date.now() >= this.tokenExpiry) {
      await this.getAccessToken();
    }
    return this.token;
  }

  async makeRequest(endpoint, query = '') {
    await this.ensureValidToken();
  
    console.log(`Making request to: ${this.baseURL}/${endpoint}`);
    console.log(`Query: ${query}`);
  
    const response = await fetch(`${this.baseURL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Client-ID': this.clientId,
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: query
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`IGDB API Error: ${response.status} - ${response.statusText}`);
      console.error(`Error details: ${errorText}`);
      throw new Error(`IGDB API request failed: ${response.statusText} - ${errorText}`);
    }
  
    return response.json();
  }
}