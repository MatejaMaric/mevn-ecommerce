const paypal = require('@paypal/checkout-server-sdk');
const paypalClient = require('../config/paypal');
const {siteUrl} = require('../config/env');

module.exports = {

  async setup(req, res) {
    let transactionData = {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: '180.00',
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: "180.00"
            },
          }
        },
        items: [
          {
            name: "T-Shirt",
            unit_amount: {
              currency_code: "USD",
              value: "90.00"
            },
            quantity: "1"
          },
          {
            name: "Shoes",
            unit_amount: {
              currency_code: "USD",
              value: "45.00"
            },
            quantity: "2"
          }
        ]
      }]
    };

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody(transactionData);

    let order;
    try {
      order = await paypalClient.execute(request);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    console.log(order);

    res.status(200).json({orderId: order.result.id});
  },

  async capture(req, res) {
    const request = new paypal.orders.OrdersCaptureRequest(req.body.orderId);
    request.requestBody({});

    try {
      const capture = await paypalClient.execute(request);
      console.log(capture);
      console.log(capture.result);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    res.sendStatus(200);
  }

};
