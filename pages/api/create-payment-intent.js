import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, metadata } = req.body;
    
    // Validate amount
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Convert PKR to USD (using approximate exchange rate)
    const exchangeRate = 0.5; // 1 USD = 0.5 PKR
    const usdAmount = Math.round(amount / exchangeRate);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: usdAmount,
      currency: 'usd',
      metadata: {
        ...metadata,
        original_currency: 'PKR',
        original_amount: (amount / 100).toFixed(2),
        exchange_rate: exchangeRate.toString()
      },
    });

    return res.status(200).json({ 
      success: true,
      clientSecret: paymentIntent.client_secret,
      message: 'Payment intent created successfully'
    });
  } catch (err) {
    console.error('Stripe error:', err);
    return res.status(500).json({ 
      error: err.message || 'Internal server error' 
    });
  }
}