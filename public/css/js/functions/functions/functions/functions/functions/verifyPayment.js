const functions = require("firebase-functions");
const crypto = require("crypto");

exports.verifyPayment = functions.https.onRequest(async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET || "YOUR_KEY_SECRET";

    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid payment signature",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
