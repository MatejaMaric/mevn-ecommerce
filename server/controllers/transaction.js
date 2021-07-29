const paypal = require('@paypal/checkout-server-sdk');
const paypalClient = require('../config/paypal');
const {siteUrl} = require('../config/env');
const Product = require('../models/Product');
const Order = require('../models/Order');

module.exports = {

  async setup(req, res) {
    let newOrderObj = {
      status: 'ordered',
      paypalOrderId: null,
      userId: req.user._id,
      items: []
    };
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
        return res.status(400).json({status: "Couldn't find one of the given items. CB"});
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

      newOrderObj.items.push({
        productId: itemId,
        name: item.name,
        quantity: itemQuantity
      });
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

    newOrderObj.paypalOrderId = order.result.id;

    const dbOrder = new Order(newOrderObj);
    dbOrder.save()
      .then(() => res.status(200).json({orderId: order.result.id}))
      .catch(err => {
        res.status(500).json({status: "Couldn't save new order to database!"});
        console.error(err);
      });
  },

  async capture(req, res) {
    let dbOrder;
    try {
      dbOrder = await Order.findOne({paypalOrderId: req.body.orderId});
    }
    catch {
      return res.status(400).json({status: "Couldn't find given order in database! CB"});
    }
    if (!dbOrder)
      return res.status(400).json({status: "Couldn't find given order in database!"});

    if (!dbOrder.userId.equals(req.user._id))
      return res.sendStatus(403);

    const request = new paypal.orders.OrdersCaptureRequest(req.body.orderId);
    request.requestBody({});

    let capture;
    try {
      capture = await paypalClient.execute(request);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    dbOrder.status = 'paid';
    dbOrder.shipping = capture.result.purchase_units[0].shipping;

    dbOrder.save()
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).json({status: "Couldn't update order in database!"})
        console.error(err);
      });
  },

  async showPaid(req, res) {
    const orders = await Order.find({status: 'paid'});
    res.json(orders);
  },

  async showPaidByUser(req, res) {
    const orders = await Order.find({status: 'paid', userId: req.user._id});
    res.json(orders);
  }

};
