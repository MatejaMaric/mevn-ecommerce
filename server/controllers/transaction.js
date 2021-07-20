const paypal = require('@paypal/checkout-server-sdk');
const paypalClient = require('../config/paypal');
const {siteUrl} = require('../config/env');
const Product = require('../models/Product');

module.exports = {

  async setup(req, res) {
    let transactionSetupData = {
      intent: 'CAPTURE',
      application_context: {
        brand_name: "MEVN Store"
      },
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: null,
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: null
            }
          }
        },
        items: []
      }]
    };

    if (!req.body.items)
      return res.status(400).json({status: "No items given."});

    let totalToPay = 0;
    for (let i = 0; i < req.body.items.length; i++) {
      const itemId = req.body.items[i].id;

      const itemQuantity = req.body.items[i].quantity;
      if (!itemQuantity)
        return res.status(400).json({status: "No quantity given."});

      let item;
      try {
        item = await Product.findOne({_id: itemId});
      }
      catch {
        return res.status(400).json({status: "Couldn't find one of the given items."});
      }
      if (!item)
        return res.status(400).json({status: "Couldn't find one of the given items."});

      transactionSetupData.purchase_units[0].items.push({
        name: item.name,
        unit_amount: {
          currency_code: "USD",
          value: item.price
        },
        quantity: itemQuantity
      });

      totalToPay += item.price * itemQuantity;
    }
    transactionSetupData.purchase_units[0].amount.value = totalToPay;
    transactionSetupData.purchase_units[0].amount.breakdown.item_total.value = totalToPay;

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody(transactionSetupData);

    let order;
    try {
      order = await paypalClient.execute(request);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    res.status(200).json({orderId: order.result.id});
  },

  async capture(req, res) {
    const request = new paypal.orders.OrdersCaptureRequest(req.body.orderId);
    request.requestBody({});

    try {
      const capture = await paypalClient.execute(request);
      console.log("CAPTURE======================================================");
      console.log(capture);
      console.log("CAPTURE.RESULT===============================================");
      console.log(capture.result);
      console.log("CAPTURE.RESULT.PURCHASE_UNITS[0].SHIPPING====================");
      console.log(capture.result.purchase_units[0].shipping);
      console.log("=============================================================");
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    res.sendStatus(200);
  }

};
