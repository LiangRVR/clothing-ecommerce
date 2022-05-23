import express from "express";
//import cors from "cors";
//import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
import Stripe from "stripe";
import compression from "compression";
import enforce from "express-sslify";

if (process.env.NODE_ENV !== "production") dotenv.config();

const app = express();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(enforce.HTTPS({ trustProtoHeader: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server running on port ${port}`);
});

app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "serviceWorker.js"));
});

app.post("/payment/create", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});
