// utils/orderFunctions.js
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

export const updateSalesCount = async (cart) => {
  try {
    for (const item of cart) {
      const quantity = item.amount || 1;
      const revenue = item.price * quantity;

      // 🔼 Update seller's stats
      const sellerRef = doc(db, "sellers", item.sellerId);
      await updateDoc(sellerRef, {
        sales: increment(quantity),
        revenue: increment(revenue),
      });

      // 🔼 Update product's salesCount and quantity
      const productRef = doc(db, "products", item.id); // `item.id` must be the product ID
      await updateDoc(productRef, {
        salesCount: increment(quantity),
        quantity: increment(-quantity), // 👈 this line decreases stock
      });
    }
  } catch (error) {
    console.error("❌ Error updating sales and revenue:", error);
  }
};
