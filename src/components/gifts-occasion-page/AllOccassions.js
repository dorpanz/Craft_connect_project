// AllOccasions.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { imageMap, occasionTags } from "../main-page/occasion-gift/GiftOccasion"; // Import from the original component
import Menu from "../menu/Menu";
import './GiftsByOccasion.css'
import { AnimatedSection } from "../animation/AnimatedSection";
export const AllOccasions = () => {
  const [occasionProducts, setOccasionProducts] = useState({});

  useEffect(() => {
    const fetchOccasionProducts = async () => {
      let occasionData = {};
      try {
        for (let occasion of occasionTags) {
          const q = query(
            collection(db, "products"),
            where("tags", "array-contains", occasion),
            where("status", "==", "approved"),
            where("quantity", ">", 0)
          );
          const querySnapshot = await getDocs(q);
          occasionData[occasion] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        }
        setOccasionProducts(occasionData);
      } catch (error) {
        console.error("Error fetching occasion products:", error);
      }
    };

    fetchOccasionProducts();
  }, []);

  return (
    <div>
<Menu/>
<AnimatedSection>

    <div className="all-occasions">
      <h2>All Occasions</h2>
      <div className="occasion-categories-sec-all">
        {occasionTags.map((occasion) => (
          <div key={occasion} className="ocasssion-category-item">
            <img
              src={imageMap[occasion] || "/default-image.jpg"}
              alt={`${occasion} gift`}
              className="occasion-img"
            />
            <Link
              to={`/occasion-gift/${occasion}`}
              className="ocasssion-category-item-link"
            >
              {occasion}
            </Link>
          </div>
        ))}
      </div>
    </div>
        </AnimatedSection>
              </div>
  );
};
