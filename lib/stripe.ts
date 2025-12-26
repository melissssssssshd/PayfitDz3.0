import Stripe from "stripe"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder"

export const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-12-18.accommodations" as any,
    appInfo: {
        name: "PayFit 2.0",
        version: "0.1.0",
    },
})
