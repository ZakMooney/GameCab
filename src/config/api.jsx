const config = {
  development: {
    apiBaseURL: 'http://localhost:3001/api'
  },
  production: {
    apiBaseURL: 'https://your-deployed-backend.com/api' // TEMP TODO
  }
};

const getEnvironment = () => {
  try {
    return process.env.NODE_ENV || 'development';
  } catch (error) {
    return 'development';
  }
};

const environment = getEnvironment();
const currentConfig = config[environment] || config.development;

export default currentConfig;

export const { apiBaseURL } = currentConfig;