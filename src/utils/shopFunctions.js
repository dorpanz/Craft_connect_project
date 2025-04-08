import { db } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

// Function to calculate total sales for a shop
const calculateTotalSalesForShop = async (shopId) => {
  const productsQuery = query(collection(db, "products"), where("sellerId", "==", shopId));
  const querySnapshot = await getDocs(productsQuery);

  let totalSales = 0;

  // Sum up sales counts from all products of the shop
  querySnapshot.forEach((doc) => {
    const product = doc.data();
    totalSales += product.salesCount || 0;
  });

  return totalSales;
};

export { calculateTotalSalesForShop };