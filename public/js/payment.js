// ======================================================
// Dips Smart Learning - Payment Module (Phase 1)
// ======================================================

export async function startCheckout(product) {
  try {
    if (!product) {
      alert("Product information not found.");
      return;
    }

    console.log("Starting checkout...", product);

    // Phase 1 (Temporary)
    // Razorpay integration will be added next.
    alert(
      `Checkout\n\nProduct: ${product.title}\nPrice: ₹${product.price}\n\nRazorpay integration will be enabled in the next step.`
    );

  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  }
}
