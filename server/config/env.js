require('dotenv').config();
module.exports = {
  port: process.env.PORT || 3000,
  mongoUrl: process.env.DB_CONN || "mongodb://localhost/mevn_ecommerce_db",
  masterKey: process.env.APP_SECRET || "you-should-use-something-different",
  siteUrl: process.env.SITE_URL || `http://localhost:${process.env.PORT || 3000}`,
  paypalEnvironment: process.env.PAYPAL_ENVIRONMENT || "sandbox",
  paypalClientId: process.env.PAYPAL_CLIENT_ID || 'PAYPAL-SANDBOX-CLIENT-ID',
  paypalClientSecret: process.env.PAYPAL_CLIENT_SECRET || 'PAYPAL-SANDBOX-CLIENT-SECRET'
};
