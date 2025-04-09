import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase"; // Firebase setup
import Menu from "../menu/Menu";
import Footer from "../footer/Foooter";
import { AnimatedSection } from "../animation/AnimatedSection";
import heartbanner from "./pics/heartsbanner.jpg";
import "./GiftsByOccasion.css";
import { ShopLink } from "../single-item/ShopLink";

export const GiftByOccasion = () => {
  const { occasionTag } = useParams(); // Get occasion from URL params
  const [giftsForOccasion, setGiftsForOccasion] = useState([]);
  const [giftsForHer, setGiftsForHer] = useState([]);
  const [giftsForHim, setGiftsForHim] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    const fetchGifts = async () => {
      try {
        const formattedOccasionTag = occasionTag?.trim() || "Valentine’s Day";
        console.log("📌 Fetching gifts for:", formattedOccasionTag);

        // Queries to fetch products matching occasion and categories
        const occasionQuery = query(
          collection(db, "products"),
          where("tags", "array-contains", formattedOccasionTag)
        );
        const herQuery = query(
          collection(db, "products"),
          where("tags", "array-contains", "For Her")
        );
        const himQuery = query(
          collection(db, "products"),
          where("tags", "array-contains", "For Him")
        );

        console.log("🔎 Fetching data from Firestore...");

        const occasionSnapshot = await getDocs(occasionQuery);
        const fetchedOccasionGifts = occasionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // ✅ Filter by status: "approved"
        const approvedOccasionGifts = fetchedOccasionGifts.filter(
            (gift) => gift.status === "approved" && gift.quantity > 0
          );
          
        setGiftsForOccasion(approvedOccasionGifts);

        // ✅ Filter 'For Her' and 'For Him' from approved gifts
        const filteredHerGifts = approvedOccasionGifts.filter((gift) =>
          gift.tags?.includes("For Her")
        );
        const filteredHimGifts = approvedOccasionGifts.filter((gift) =>
          gift.tags?.includes("For Him")
        );

        setGiftsForHer(filteredHerGifts);
        setGiftsForHim(filteredHimGifts);

        console.log("🎁 Occasion Gifts:", fetchedOccasionGifts);
        console.log("🎀 Gifts for Her:", filteredHerGifts);
        console.log("🕴️ Gifts for Him:", filteredHimGifts);
      } catch (error) {
        console.error("❌ Error fetching occasion gifts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGifts();
  }, [occasionTag]);
  if (isLoading || !giftsForOccasion) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  return (
    <div>
      <Menu />
      <div className="gift-occasion-cont">
        <AnimatedSection>
          <div className="header-about">
            <img
              src={heartbanner}
              alt="Occasion banner"
              className="banner-occasion-img"
            />
            <div className="banner-about-desc-gift">
              <p className="banner-title">
                {occasionTag || "Valentine's Gifts Ideas"}
              </p>
              <p className="banner-desc">Find the perfect gift!</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Sections for Different Gift Types */}
        <GiftSection
          title={`Craft Connect's Choice for ${occasionTag}`}
          products={giftsForOccasion.slice(0, 5)}
        />
        <GiftSection title={`For Her`} products={giftsForHer} />
        <GiftSection title={`For Him`} products={giftsForHim} />
      </div>
      <Footer />
    </div>
  );
};

const GiftSection = ({ title, products }) => {
  const [visibleCount, setVisibleCount] = useState(12);

  // Function to load more products
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  console.log(
    `📌 Rendering section: ${title} with ${products.length} products`
  );

  return (
    <AnimatedSection>
      <div className="gift-occasion-listing">
        <p className="gift-occasio-list-title">{title}</p>
        <div className="decorations-container">
          {products.length === 0 ? (
            <p className="no-products">No products available</p>
          ) : (
            <div className="decorations-grid">
              {products.slice(0, visibleCount).map((item) => (
                <div key={item.id} className="decoration-item">
                  <Link
                    to={`/item-listing/${item.id}`}
                    className="decoration-link"
                  >
                    <img
                      src={item.photos?.[0] || heartbanner}
                      alt={item.title}
                      className="decoration-image"
                    />
                    <p className="decoration-name">
                      {item.title.substring(0, 20)}
                      {item.title.length > 20 ? "..." : ""}
                    </p>
                    <Link
                      to={`/shop/${item.shopName}`}
                      className="decoration-shop"
                    >
                      <ShopLink sellerId={item.sellerId} />
                    </Link>
                    <p className="decoration-price">
                      ${item.price?.toFixed(2)}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          )}
          {products.length > visibleCount && (
            <div className="gift-more">
              <button className="seeMorebtn" onClick={loadMore}>
                SEE MORE
              </button>
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
};
