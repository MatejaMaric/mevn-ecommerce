const paypal = require('@paypal/checkout-server-sdk');
const {paypalEnvironment, paypalClientId, paypalClientSecret} = require('./env');

function environment() {
  if (paypalEnvironment === 'live')
    return new paypal.core.LiveEnvironment(paypalClientId, paypalClientSecret);
  else
    return new paypal.core.SandboxEnvironment(paypalClientId, paypalClientSecret);
}

module.exports = new paypal.core.PayPalHttpClient(environment());
