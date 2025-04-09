import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";

// Import your images here (use placeholders if needed)
import birthday from "./pictures/birthday.jpg";
import easter from "./pictures/easter.jpg";
import graduation from "./pictures/graduation.jpg";
import anniversary from "./pictures/anniversary.jpg";
import valentines from "./pictures/heart.jpg";

import thanksgiving from "./pictures/thanksgiving,jpg.jpg";
import halloween from "./pictures/halloween.jpg";
import wedding from "./pictures/wedding.jpg";
import newYear from "./pictures/newyear.jpg";
import mothersDay from "./pictures/mothersday.jpg";
import fathersDay from "./pictures/fathersday.jpg";
import babyShower from "./pictures/babyshower.jpg";
import housewarming from "./pictures/housewarming.jpg";
import christmas from "./pictures/christmas.jpg";
import gift from "./pictures/gift.jpg"; // generic gift image

import "./GiftOccasion.css";

// Mapping tag to image
export const imageMap = {
  "Birthday": birthday,
  "Easter": easter,
  "Graduation": graduation,
  "Anniversary": anniversary,
  "Valentine's Day": valentines,
  "Thanksgiving": thanksgiving,
  "Halloween": halloween,
  "Wedding": wedding,
  "New Year": newYear,
  "Mother's Day": mothersDay,
  "Father's Day": fathersDay,
  "Baby Shower": babyShower,
  "Housewarming": housewarming,
  "Christmas": christmas,
};

export const occasionTags = [
  "Birthday",
  "Graduation",
  "Easter",
  "Mother's Day",
  "Anniversary",
  "Valentine's Day",
  "Wedding",
  "Christmas",
  "Baby Shower",
  "Housewarming",
  "Father's Day",
  "Halloween",
  "Thanksgiving",
  "New Year",
];

export const GiftOccasion = () => {
  const [occasionProducts, setOccasionProducts] = useState({});
  const [showAll, setShowAll] = useState(false);

  const occasions = occasionTags.map((tag) => ({
    name: tag,
    tag,
    image: imageMap[tag] || gift,
  }));

  const visibleOccasions = showAll ? occasions : occasions.slice(0, 5);

  useEffect(() => {
    const fetchOccasionProducts = async () => {
      let occasionData = {};
      try {
        for (let occasion of occasions) {
          const q = query(
            collection(db, "products"),
            where("tags", "array-contains", occasion.tag),
            where("status", "==", "approved"),
            where("quantity", ">", 0)
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
        <div className="see-more-container-occ">
    <Link to="/all-occasions" className="see-more-btn-occ">
      See More
    </Link>
  </div>
      </div>

      <div className="occasion-categories-sec">
        {visibleOccasions.map((occasion) => (
          <div key={occasion.name} className="ocasssion-category-item">
            <img
              src={occasion.image}
              alt={`${occasion.name} gift`}
              className="occasion-img"
            />
            <Link
              to={`/occasion-gift/${occasion.tag}`}
              className="ocasssion-category-item-link"
            >
              {occasion.name}
            </Link>
          </div>
        ))}
      </div>



    </div>
  );
};
