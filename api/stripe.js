const config = require('./config');
const stripe = require('stripe')(config.get('stripe.secret_key'));

module.exports = stripe;