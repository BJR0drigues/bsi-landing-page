module.exports = {
  database: {
    host: 'localhost',
    port: 5432,
    database: 'bsi_website',
    user: 'bsi_user',  
    password: '123456'  
  },
  server: {
    port: 3000
  },
  jwt: {
    secret: 'bsi-iesgo-secret-key', 
    expiresIn: '24h'
  }
};