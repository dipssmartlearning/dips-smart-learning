const functions = require("firebase-functions");

exports.paymentWebhook = functions.https.onRequest(async (req, res) => {
  try {
    const event = req.body;

    console.log("Webhook received:", event);

    // TODO:
    // 1. Verify Razorpay webhook signature
    // 2. Update Firestore order status
    // 3. Enable PDF download access
    // 4. Send confirmation email (future)

    return res.status(200).json({
      success: true,
      message: "Webhook received successfully"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
