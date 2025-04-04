import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";
import valentines from "./pictures/heart.jpg";
import birthday from "./pictures/birthday.jpg";
import anniversary from "./pictures/anniversary.jpg";
import easter from "./pictures/easter.jpg";
import graduation from "./pictures/graduation.jpg";
import "./GiftOccasion.css";

export const GiftOccasion = () => {
  const [occasionProducts, setOccasionProducts] = useState({});
  const occasions = [
    { name: "Birthday", image: birthday, tag: "Birthday" },
    { name: "Easter", image: easter, tag: "Easter" },
    { name: "Graduation", image: graduation, tag: "Graduation" },
    { name: "Anniversary", image: anniversary, tag: "Anniversary" },
    { name: "Mother's Day", image: valentines, tag: "Mother's Day" }
  ];

  useEffect(() => {
    const fetchOccasionProducts = async () => {
      let occasionData = {};
      try {
        for (let occasion of occasions) {
          const q = query(
            collection(db, "products"),
            where("tags", "array-contains", occasion.tag)
          );
          const querySnapshot = await getDocs(q);
          occasionData[occasion.name] = querySnapshot.docs.map((doc) => ({
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
    <div className="rec-section">
      <div className="rec-header">
        <p>Shop gifts perfect for the occasion!</p>
      </div>

      <div className="occasion-categories-sec">
        {occasions.map((occasion) => (
          <div key={occasion.name} className="ocasssion-category-item">
            <img src={occasion.image} alt={`${occasion.name} gift`} className="occasion-img" />
            <Link to={`/occasion-gift/${occasion.tag}`} className="ocasssion-category-item-link">
              {occasion.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
