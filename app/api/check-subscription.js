// ./app/api/check-subscription.js
import { checkSubscription } from "@/lib/subscription";

export default async (req, res) => {
  try {
    const isSubscribed = await checkSubscription(); // Ensure checkSubscription works with req object or adjust accordingly
    res.status(200).json({ isSubscribed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};