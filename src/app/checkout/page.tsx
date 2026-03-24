import Stripe from "stripe";
import { redirect } from "next/navigation";

export default function CheckoutPage() {
  async function createCheckout() {
    "use server";
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
    });
    redirect(session.url!);
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{"CiberSegura"}</h1>
        <p className="text-gray-600 mb-8">Inicie a sua subscricao para ter acesso completo.</p>
        <form action={createCheckout}>
          <button type="submit" className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">
            Subscrever agora
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-4">Pagamento seguro via Stripe. Cancele a qualquer momento.</p>
      </div>
    </div>
  );
}
