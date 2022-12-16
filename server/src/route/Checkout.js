const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.get("/get-publishable-key", async (req, res) => {
  res.status(200).send(process.env.STRIPE_PUBLISHABLE_KEY);
});

router.post("/checkout", async (req, res) => {
  try {
    const { name, subtotal, paymentMethodType, currency } = req.body;
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2022-11-15" }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      customer: customer.id,
      amount: Math.round(subtotal * 100),
      currency: currency,
      payment_method_types: [paymentMethodType],
      metadata: { name },
    });

    res.status(200).send({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Checkout failed", error: error.message });
  }
});

module.exports = router;