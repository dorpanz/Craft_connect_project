import earings from "./images/earings1.jpg";
import earings2 from "./images/earings2.jpg";
import earings3 from "./images/earings3.jpg";
import earing4 from "./images/earings4.jpg";
import amber1 from "./images/amber1.jpg"
import plate1 from "./images/plate1.jpg"
import plate2 from "./images/plate2.jpg"
import plate3 from "./images/plate3.jpg"
import bag1 from "./images/bag1.jpg"
import bag2 from "./images/bag2.jpg"
import bag3 from "./images/bag3.jpg"
import necklace1 from "./images/necklace1.jpg";
import necklace2 from "./images/necklace2.jpg";
import necklace3 from "./images/necklace3.jpg";
import scarf1 from "./images/scarf1.jpg";
import shirt1 from "./images/shirt1.jpg";
import brace1 from "./images/brace1.jpg"
import chair1 from "./images/chair1.jpg"
import painting1 from "./images/painting1.jpg";
import planner1 from "./images/planner1.jpg"
import bag4 from "./images/bag4.jpg"
import pearl1 from "./images/pearl1.jpg"
import table1 from "./images/table1.jpg"
import vase1 from "./images/vase1.jpg"
import wall1 from "./images/wall1.jpg"
import plate6 from "./images/plate6.jpg"

export const data = [
  {
    id: 1,
    title: "Handmade Baltic Amber Sterling Silver Earrings",
    description:
      "A sweet elegant pair of earrings designed and hand-crafted using 6mm round genuine Baltic Amber gemstones complemented with all 925 sterling silver components. These lightweight earrings are perfect for daily wear or as a special gift. Each piece is carefully polished to highlight the amber’s natural beauty.",
    expanded_description:
      "These earrings showcase the warmth and elegance of genuine Baltic Amber, a gemstone known for its natural healing properties and timeless appeal. The sterling silver complements the amber’s honey-like glow, making this pair an exquisite addition to any jewelry collection. The earrings are handcrafted with meticulous attention to detail, ensuring durability and sophistication. Whether you're looking for an elegant touch to your outfit or a meaningful gift, these earrings are the perfect choice.",
    about:
      "Amber & Silver Creations is a small artisan jewelry shop specializing in handcrafted silver and gemstone pieces. Each item is made with love and attention to detail, ensuring high-quality craftsmanship and unique designs.",
    category: "ACCESSORIES",
    subCategory: "Jewelry",
    subSubCategory: "Earrings",
    photos_videos: [earings, earings2, earings3, earing4],
    tags: ["Handmade", "Jewelry", "Gift", "Custom", "Minimalist"],
    primary_colour: "Amber",
    secondary_colour: "Silver",
    materials: ["Baltic Amber", "Sterling Silver"],
    customized: true,
    price: 50,
    quantity: 10,
    processing_time: "4 days",
    weight: "0.2kg",
    size: "2mm",
    return_policy: "Default",
    shipping_cost: 5,
    shop_name: "Amber & Silver Creations",
    shop_id:1,
    reviews: [
      {
        id: 1,
        user: "Alex T.",
        rating: 5,
        comment: "Love the vintage feel! The leather quality is top-notch.",
        date: "2024-02-10",
        userImage: "https://randomuser.me/api/portraits/men/32.jpg",
        likes: 12,
        dislikes: 1
      },
      {
        id: 2,
        user: "Linda P.",
        rating: 4,
        comment: "Beautiful bag! Would love a larger version.",
        date: "2024-02-08",
        userImage: "https://randomuser.me/api/portraits/women/44.jpg",
        likes: 8,
        dislikes: 0
      }
    ],    
    average_rating: 4.5
  },
  {
    id: 2,
    shop_id:3,
    title: "Hand-Painted Floral Ceramic Dinner Plate",
    description:
      "A beautifully hand-painted ceramic dinner plate featuring intricate floral designs. Perfect for special occasions or daily use.",
    expanded_description:
      "This ceramic dinner plate is a true piece of art. Each plate is hand-painted by skilled artisans, ensuring that no two pieces are exactly alike. The intricate floral design adds a touch of elegance and charm, making it perfect for hosting dinner parties or simply elevating your everyday dining experience. Made from high-quality ceramic, this plate is both durable and aesthetically pleasing.",
    about:
      "Ceramic Creations specializes in handmade ceramic kitchenware and decor, focusing on sustainability and traditional craftsmanship.",
    category: "HOMEWARE",
    subCategory: "Kitchen",
    subSubCategory: "Dinnerware",
    photos_videos: [plate1, plate2, plate3],
    tags: ["Handmade", "Kitchen", "Home Decor", "Ceramic"],
    primary_colour: "White",
    secondary_colour: "Blue",
    materials: ["Ceramic", "Glaze"],
    customized: false,
    price: 35,
    quantity: 15,
    processing_time: "5 days",
    weight: "0.8kg",
    size: "10 inch",
    return_policy: "Default",
    shipping_cost: 7,
    shop_name: "Handwoven Dreams",
    reviews: [
      {
        id: 1,
        user: "Alex T.",
        rating: 5,
        comment: "Love the vintage feel! The leather quality is top-notch.",
        date: "2024-02-10",
        userImage: "https://randomuser.me/api/portraits/men/32.jpg",
        likes: 12,
        dislikes: 1
      },
      {
        id: 2,
        user: "Linda P.",
        rating: 4,
        comment: "Beautiful bag! Would love a larger version.",
        date: "2024-02-08",
        userImage: "https://randomuser.me/api/portraits/women/44.jpg",
        likes: 8,
        dislikes: 0
      }
    ],    
    average_rating: 4.5
  },
  {
    id: 3,
    shop_id:5,
    title: "Vintage Leather Crossbody Bag",
    description:
      "A stylish, durable, and spacious leather crossbody bag handcrafted with high-quality full-grain leather.",
    expanded_description:
      "Crafted from premium full-grain leather, this crossbody bag is the perfect blend of style and functionality. Designed with ample storage space, it’s perfect for carrying daily essentials while adding a timeless vintage touch to your outfit. The adjustable strap ensures a comfortable fit, making it ideal for travel, work, or casual outings.",
    about:
      "Rustic Leather Co. is known for its high-quality, handmade leather goods that blend modern utility with vintage aesthetics.",
    category: "ACCESSORIES",
    subCategory: "Bags",
    subSubCategory: null, // No sub-sub-category for bags
    photos_videos: [bag1, bag2, bag3],
    tags: ["Handmade", "Leather", "Vintage", "Fashion"],
    primary_colour: "Brown",
    secondary_colour: "Tan",
    materials: ["Leather", "Metal Buckle"],
    customized: true,
    price: 120,
    quantity: 5,
    processing_time: "7 days",
    weight: "1.5kg",
    size: "12x9 inch",
    return_policy: "Default",
    shipping_cost: 10,
    shop_name: "EcoLeather Goods",
    reviews: [
      {
        id: 1,
        user: "Alex T.",
        rating: 2,
        comment: "Love the vintage feel! The leather quality is top-notch.",
        date: "2024-02-10",
        userImage: "https://randomuser.me/api/portraits/men/32.jpg",
        likes: 12,
        dislikes: 1
      },
      {
        id: 2,
        user: "Linda P.",
        rating: 4,
        comment: "Beautiful bag! Would love a larger version.",
        date: "2024-02-08",
        userImage: "https://randomuser.me/api/portraits/women/40.jpg",
        likes: 8,
        dislikes: 0
      },
      {
        id: 2,
        user: "Linda P.",
        rating: 4,
        comment: "Beautiful bag! Would love a larger version.",
        date: "2024-02-08",
        userImage: "https://randomuser.me/api/portraits/women/44.jpg",
        likes: 8,
        dislikes: 0
      }
    ],    
    average_rating: 4.7
  },
  {
    id: 4,
    shop_id:1,
    title: "Handmade Silver Necklace with Moonstone",
    description:
      "A delicate silver necklace featuring a beautiful moonstone pendant, handmade with attention to detail.",
    expanded_description:
      "This delicate necklace features an ethereal moonstone pendant that shimmers with a mystical glow. The fine silver chain adds a touch of elegance, making it a perfect accessory for both casual and formal occasions. Handcrafted by skilled artisans, each piece is unique, carrying its own special charm.",
    about:
      "Luna Jewelry specializes in handcrafted gemstone jewelry, offering unique, nature-inspired designs made with love and care.",
    category: "ACCESSORIES",
    subCategory: "Jewelry",
    subSubCategory: "Necklaces",
    photos_videos: [necklace1, necklace2, necklace3],
    tags: ["Handmade", "Jewelry", "Silver", "Minimalist"],
    primary_colour: "Silver",
    secondary_colour: "White",
    materials: ["Silver", "Moonstone"],
    customized: true,
    price: 65,
    quantity: 8,
    processing_time: "5 days",
    weight: "0.3kg",
    size: "18 inches",
    return_policy: "Default",
    shipping_cost: 6,
    shop_name: "Amber & Silver Creations",
    reviews: [
      {
        id: 1,
        user: "Alex T.",
        rating: 5,
        comment: "Love the vintage feel! The leather quality is top-notch.",
        date: "2024-02-10",
        userImage: "https://randomuser.me/api/portraits/men/32.jpg",
        likes: 12,
        dislikes: 1
      },
      {
        id: 2,
        user: "Linda P.",
        rating: 4,
        comment: "Beautiful bag! Would love a larger version.",
        date: "2024-02-08",
        userImage: "https://randomuser.me/api/portraits/women/44.jpg",
        likes: 8,
        dislikes: 0
      }
    ],    
    average_rating: 4.6
  },  {
    id: 5,
    shop_id:7,
    title: "Elegant Cashmere Scarf",
    description:
      "A luxurious cashmere scarf that provides warmth and style, perfect for the colder months. Soft, lightweight, and breathable, this scarf is designed for both comfort and elegance. The fine cashmere fibers ensure a cozy feel, making it an ideal gift for loved ones or a personal wardrobe essential.",
    category: "ACCESSORIES",
    expanded_description:"This elegant cashmere scarf is designed for those who appreciate both warmth and sophistication. The ultra-soft fibers ensure comfort, while the breathable material makes it perfect for layering in cold weather. Handcrafted with premium cashmere, this timeless accessory complements any outfit, whether for casual or formal wear.",
    subCategory: "Scarves",
    subSubCategory: null,
    photos_videos: [scarf1, scarf1, scarf1],
    tags: ["Handmade", "Luxury", "Warmth", "Soft"],
    primary_colour: "Beige",
    secondary_colour: "Gray",
    materials: ["Cashmere"],
    customized: false,
    price: 85,
    quantity: 12,
    processing_time: "6 days",
    weight: "0.4kg",
    size: "70x12 inches",
    return_policy: "Default",
    shipping_cost: 7,
    shop_name: "The Stitchery",
    reviews: [
      {
        id: 1,
        user: "Alex T.",
        rating: 5,
        comment: "Love the vintage feel! The leather quality is top-notch.",
        date: "2024-02-10",
        userImage: "https://randomuser.me/api/portraits/men/32.jpg",
        likes: 12,
        dislikes: 1
      },
      {
        id: 2,
        user: "Linda P.",
        rating: 4,
        comment: "Beautiful bag! Would love a larger version.",
        date: "2024-02-08",
        userImage: "https://randomuser.me/api/portraits/women/44.jpg",
        likes: 8,
        dislikes: 0
      }
    ],    
    average_rating: 4.5
  },
  {
    id: 6,
    shop_id:7,
    title: "Men's Organic Cotton Shirt",
    description:
      "A classic organic cotton shirt designed for comfort and style, perfect for casual wear. Made from 100% eco-friendly cotton, this shirt is breathable and soft, ensuring all-day comfort. Featuring a modern cut and a minimalist design, it pairs well with jeans, chinos, or shorts for a timeless look.",
    category: "CLOTHING",
    expanded_description:"This organic cotton shirt is a blend of sustainability and comfort. Made from 100% eco-friendly cotton, it offers breathability and a soft touch on the skin. The classic cut and minimalist design make it a staple piece for any wardrobe, perfect for layering or wearing solo for a relaxed yet polished look.",
    subCategory: "Men",
    subSubCategory: "Shirts",
    photos_videos: [shirt1, shirt1, shirt1],
    tags: ["Organic", "Cotton", "Casual", "Eco-friendly"],
    primary_colour: "Blue",
    secondary_colour: "White",
    materials: ["Organic Cotton"],
    customized: false,
    price: 40,
    quantity: 20,
    processing_time: "3 days",
    weight: "0.5kg",
    size: "M, L, XL",
    return_policy: "Default",
    shipping_cost: 5,
    shop_name: "The Stitchery",
    reviews: [
      {
        id: 1,
        user: "Alex T.",
        rating: 5,
        comment: "Love the vintage feel! The leather quality is top-notch.",
        date: "2024-02-10",
        userImage: "https://randomuser.me/api/portraits/men/32.jpg",
        likes: 12,
        dislikes: 1
      },
      {
        id: 2,
        user: "Linda P.",
        rating: 4,
        comment: "Beautiful bag! Would love a larger version.",
        date: "2024-02-08",
        userImage: "https://randomuser.me/api/portraits/women/44.jpg",
        likes: 8,
        dislikes: 0
      }
    ],    
    average_rating: 4.5
  },
  {
    id: 7,
    title: "Abstract Oil Painting on Canvas",
    description:
      "A stunning abstract oil painting on canvas, featuring vibrant colors and expressive brushstrokes. Each piece is uniquely created by hand, ensuring no two artworks are the same. Ideal for modern interiors, this painting will bring a touch of artistic energy to any room.",
    expanded_description:"Each brushstroke in this abstract oil painting tells a story, adding depth and emotion to your space. With vibrant colors and bold textures, this handcrafted canvas piece is perfect for contemporary interiors, bringing energy and artistic expression to any room.",
    category: "ART",
    subCategory: "Paintings",
    subSubCategory: "Oil",
    photos_videos: [painting1, painting1, painting1],
    tags: ["Oil Painting", "Art", "Abstract", "Canvas"],
    primary_colour: "Red",
    secondary_colour: "Yellow",
    materials: ["Oil Paint", "Canvas"],
    customized: true,
    price: 200,
    quantity: 2,
    processing_time: "14 days",
    weight: "3kg",
    size: "24x36 inches",
    return_policy: "Default",
    shipping_cost: 15,
    shop_name: "Mystic Art Studio",
    shop_id: 6,
    reviews: [
      {
        id: 1,
        user: "Alex T.",
        rating: 5,
        comment: "Love the vintage feel! The leather quality is top-notch.",
        date: "2024-02-10",
        userImage: "https://randomuser.me/api/portraits/men/32.jpg",
        likes: 12,
        dislikes: 1
      },
      {
        id: 2,
        user: "Linda P.",
        rating: 4,
        comment: "Beautiful bag! Would love a larger version.",
        date: "2024-02-08",
        userImage: "https://randomuser.me/api/portraits/women/44.jpg",
        likes: 8,
        dislikes: 0
      }
    ],    
    average_rating: 4.5
  },
  {
    id: 8,
    title: "Handcrafted Wooden Chair",
    description:
      "A beautifully handcrafted wooden chair made from high-quality oak, perfect for any home decor. Featuring a smooth finish and a sturdy structure, this chair combines comfort with an elegant rustic charm. Ideal for dining rooms, living spaces, or as a statement piece in your home.",
    category: "HOMEWARE",
    expanded_description:"This handcrafted wooden chair is a perfect balance of durability and elegance. Made from high-quality oak, it features a rustic yet refined design, making it a versatile addition to dining areas, workspaces, or lounge settings. Its smooth finish highlights the natural grain of the wood, ensuring both style and comfort.",
    subCategory: "Furniture",
    subSubCategory: "Chairs",
    photos_videos: [chair1, chair1, chair1, chair1],
    tags: ["Handmade", "Wooden", "Furniture", "Oak"],
    primary_colour: "Brown",
    secondary_colour: "Beige",
    materials: ["Oak", "Varnish"],
    customized: true,
    price: 150,
    quantity: 5,
    processing_time: "10 days",
    weight: "10kg",
    size: "30x20x40 inches",
    return_policy: "Default",
    shipping_cost: 20,
    shop_id: 6,
    shop_name: "Mystic Art Studio",
    reviews: [
      {
        id: 1,
        user: "Alex T.",
        rating: 5,
        comment: "Love the vintage feel! The leather quality is top-notch.",
        date: "2024-02-10",
        userImage: "https://randomuser.me/api/portraits/men/32.jpg",
        likes: 12,
        dislikes: 1
      },
      {
        id: 2,
        user: "Linda P.",
        rating: 4,
        comment: "Beautiful bag! Would love a larger version.",
        date: "2024-02-08",
        userImage: "https://randomuser.me/api/portraits/women/44.jpg",
        likes: 8,
        dislikes: 0
      }
    ],    
    average_rating: 4.5
  },
  {
    id: 9,
    title: "Handmade Recycled Paper Planner",
    description:
      "An eco-friendly planner made from recycled paper, perfect for organizing your year while caring for the planet. Designed with a minimalist layout, this planner includes monthly and weekly sections to help you stay on track. Its sturdy binding and compact size make it great for daily use.",
    category: "CARDS&STATIONERY",
    expanded_description: "Designed for sustainability and practicality, this recycled paper planner is ideal for organizing your schedule while reducing environmental impact. Its minimalist layout includes dedicated monthly and weekly sections, helping you stay productive in an eco-friendly way.",
    subCategory: "Planners",
    subSubCategory: null,
    photos_videos: [planner1, planner1, planner1],
    tags: ["Recycled", "Eco-friendly", "Planner", "Organize"],
    primary_colour: "Green",
    secondary_colour: "Brown",
    materials: ["Recycled Paper"],
    customized: false,
    price: 25,
    quantity: 30,
    processing_time: "2 days",
    weight: "0.3kg",
    size: "5x7 inches",
    return_policy: "Default",
    shipping_cost: 4,
    shop_id: 4,
    shop_name: "Rustic Pottery Co.",
    reviews: [
      {
        id: 1,
        user: "Alex T.",
        rating: 5,
        comment: "Love the vintage feel! The leather quality is top-notch.",
        date: "2024-02-10",
        userImage: "https://randomuser.me/api/portraits/men/32.jpg",
        likes: 12,
        dislikes: 1
      },
      {
        id: 2,
        user: "Linda P.",
        rating: 4,
        comment: "Beautiful bag! Would love a larger version.",
        date: "2024-02-08",
        userImage: "https://randomuser.me/api/portraits/women/44.jpg",
        likes: 8,
        dislikes: 0
      }
    ],    
    average_rating: 4.5
  },
  {
    id: 10,
    title: "Handmade Silver Clear Necklace",
    description:
      "A delicate silver necklace featuring a beautiful moonstone pendant, handmade with attention to detail. The shimmering moonstone adds a magical touch, making this necklace a meaningful gift or a perfect everyday accessory.",
    category: "ACCESSORIES",
    expanded_description:"A beautifully handcrafted silver necklace featuring a mesmerizing moonstone pendant. This piece captures the ethereal glow of moonstone, making it an elegant addition to any jewelry collection. The fine silver chain complements the gemstone’s natural shimmer, adding a subtle yet striking touch to any outfit.",
    subCategory: "Jewelry",
    subSubCategory: "Necklaces",
    photos_videos: [brace1, brace1, brace1],
    tags: ["Handmade", "Jewelry", "Silver", "Minimalist"],
    primary_colour: "Silver",
    secondary_colour: "White",
    materials: ["Silver", "Moonstone"],
    customized: true,
    price: 65,
    quantity: 8,
    processing_time: "5 days",
    weight: "0.3kg",
    size: "18 inches",
    return_policy: "Default",
    shipping_cost: 6,
    shop_id: 1,
    shop_name: "Amber & Silver Creations",
    reviews: [
      {
        id: 1,
        user: "Alex T.",
        rating: 5,
        comment: "Love the vintage feel! The leather quality is top-notch.",
        date: "2024-02-10",
        userImage: "https://randomuser.me/api/portraits/men/32.jpg",
        likes: 12,
        dislikes: 1
      },
      {
        id: 2,
        user: "Linda P.",
        rating: 4,
        comment: "Beautiful bag! Would love a larger version.",
        date: "2024-02-08",
        userImage: "https://randomuser.me/api/portraits/women/44.jpg",
        likes: 8,
        dislikes: 0
      }
    ],    
    average_rating: 4.5
  },
  {
    id: 11,
    title: "Handmade Baltic Amber Sterling Silver Ring",
    description:
      "A sweet elegant pair of earrings designed and hand-crafted using 6mm round genuine Baltic Amber gemstones complemented with all 925 sterling silver components. These lightweight earrings are perfect for daily wear or as a special gift. Each piece is carefully polished to highlight the amber’s natural beauty.",
    expanded_description:
      "These earrings showcase the warmth and elegance of genuine Baltic Amber, a gemstone known for its natural healing properties and timeless appeal. The sterling silver complements the amber’s honey-like glow, making this pair an exquisite addition to any jewelry collection. The earrings are handcrafted with meticulous attention to detail, ensuring durability and sophistication. Whether you're looking for an elegant touch to your outfit or a meaningful gift, these earrings are the perfect choice.",
    about:
      "Amber & Silver Creations is a small artisan jewelry shop specializing in handcrafted silver and gemstone pieces. Each item is made with love and attention to detail, ensuring high-quality craftsmanship and unique designs.",
    category: "ACCESSORIES",
    subCategory: "Jewelry",
    subSubCategory: "Earrings",
    photos_videos: [ amber1,  amber1,  amber1,  amber1],
    tags: ["Handmade", "Jewelry", "Gift", "Custom", "Minimalist"],
    primary_colour: "Amber",
    secondary_colour: "Silver",
    materials: ["Baltic Amber", "Sterling Silver"],
    customized: true,
    price: 50,
    quantity: 10,
    processing_time: "4 days",
    weight: "0.2kg",
    size: "2mm",
    return_policy: "Default",
    shipping_cost: 5,
    shop_id: 1,
    shop_name: "Amber & Silver Creations",
    reviews: [
      {
        id: 1,
        user: "Alex T.",
        rating: 5,
        comment: "Love the vintage feel! The leather quality is top-notch.",
        date: "2024-02-10",
        userImage: "https://randomuser.me/api/portraits/men/32.jpg",
        likes: 12,
        dislikes: 1
      },
      {
        id: 2,
        user: "Linda P.",
        rating: 4,
        comment: "Beautiful bag! Would love a larger version.",
        date: "2024-02-08",
        userImage: "https://randomuser.me/api/portraits/women/44.jpg",
        likes: 8,
        dislikes: 0
      }
    ],    
    average_rating: 4.5
  },
    {
      id: 12,
      title: "Handwoven Boho Tote Bag",
      description:
        "A spacious and eco-friendly tote bag, handwoven from natural fibers for a chic boho look.",
      expanded_description:
        "This tote bag is crafted from sustainable natural fibers, making it a stylish and environmentally conscious choice. Its spacious interior and sturdy handles make it perfect for everyday use, whether you're heading to the market, beach, or work.",
      about:
        "EcoWeave Studio specializes in handcrafted accessories made from sustainable materials, supporting ethical fashion.",
      category: "ACCESSORIES",
      subCategory: "Bags",
      subSubCategory: null,
      photos_videos: [bag4, bag4, bag4],
      tags: ["Handwoven", "Eco-friendly", "Boho", "Tote"],
      primary_colour: "Beige",
      secondary_colour: "Brown",
      materials: ["Natural Fibers", "Cotton"],
      customized: false,
      price: 85,
      quantity: 10,
      processing_time: "5 days",
      weight: "0.8kg",
      size: "14x12 inch",
      return_policy: "Default",
      shipping_cost: 8,
      shop_id: 7,
      shop_name: "The Stitchery",
      reviews: [
        {
          id: 1,
          user: "Sophia M.",
          rating: 5,
          comment: "Absolutely love this tote! Super stylish and spacious.",
          date: "2024-02-09",
          userImage: "https://randomuser.me/api/portraits/women/25.jpg",
          likes: 15,
          dislikes: 0,
        },
      ],
      average_rating: 4.9,
    },
    {
      id: 13,
      title: "Handcrafted Silver Pendant Necklace",
      description:
        "An elegant silver pendant necklace with intricate handcrafted details.",
      expanded_description:
        "This pendant necklace is made from sterling silver, featuring a unique hand-carved design. Perfect for adding a touch of sophistication to any outfit, it's an ideal gift for a loved one.",
      about:
        "Silver Artistry is a small workshop dedicated to crafting high-quality, handmade silver jewelry.",
      category: "ACCESSORIES",
      subCategory: "Jewelry",
      subSubCategory: "Necklaces",
      photos_videos: [pearl1, pearl1, pearl1, pearl1, pearl1],
      tags: ["Handmade", "Sterling Silver", "Jewelry", "Elegant"],
      primary_colour: "Silver",
      secondary_colour: null,
      materials: ["Sterling Silver"],
      customized: true,
      price: 150,
      quantity: 8,
      processing_time: "6 days",
      weight: "0.2kg",
      size: "18 inch",
      return_policy: "Default",
      shipping_cost: 5,
      shop_id: 1,
      shop_name: "Amber & Silver Creations",
      reviews: [
        {
          id: 1,
          user: "Daniel R.",
          rating: 5,
          comment: "Beautiful craftsmanship. Love the details!",
          date: "2024-02-06",
          userImage: "https://randomuser.me/api/portraits/men/18.jpg",
          likes: 20,
          dislikes: 1,
        },
      ],
      average_rating: 4.8,
    },
    {
      id: 14,
      title: "Minimalist Wooden Coffee Table",
      description:
        "A sleek and modern wooden coffee table crafted from premium oak wood.",
      expanded_description:
        "This minimalist coffee table is designed with clean lines and a sturdy oak wood build. Its timeless design makes it a perfect addition to any living space, blending seamlessly with modern and rustic interiors.",
      about:
        "TimberCraft specializes in high-quality handmade wooden furniture, built to last a lifetime.",
      category: "HOMEWARE",
      subCategory: "Furniture",
      subSubCategory: "Tables",
      photos_videos: [table1, table1, table1, table1],
      tags: ["Wood", "Minimalist", "Furniture", "Handmade"],
      primary_colour: "Natural Oak",
      secondary_colour: null,
      materials: ["Oak Wood"],
      customized: false,
      price: 250,
      quantity: 3,
      processing_time: "10 days",
      weight: "15kg",
      size: "36x24 inch",
      return_policy: "Default",
      shipping_cost: 25,
      shop_id: 6,
      shop_name: "Mystic Art Studio",
      reviews: [
        {
          id: 1,
          user: "Laura S.",
          rating: 5,
          comment: "Absolutely gorgeous table! The quality is outstanding.",
          date: "2024-02-05",
          userImage: "https://randomuser.me/api/portraits/women/34.jpg",
          likes: 30,
          dislikes: 0,
        },
      ],
      average_rating: 5.0,
    },
    {
      id: 15,
      title: "Hand-painted Ceramic Vase",
      description:
        "A unique ceramic vase hand-painted with beautiful floral designs.",
      expanded_description:
        "This ceramic vase is carefully hand-painted by skilled artisans, featuring intricate floral motifs that add elegance to any home decor. Perfect for fresh flowers or as a statement piece on its own.",
      about:
        "Ceramic Bliss specializes in handcrafted pottery and ceramic home decor.",
      category: "HOMEWARE",
      subCategory: "Decor",
      subSubCategory: "Vases",
      photos_videos: [vase1, vase1, vase1, vase1],
      tags: ["Hand-painted", "Ceramic", "Home Decor"],
      primary_colour: "White",
      secondary_colour: "Blue",
      materials: ["Ceramic"],
      customized: true,
      price: 70,
      quantity: 7,
      processing_time: "4 days",
      weight: "2kg",
      size: "10 inch",
      return_policy: "Default",
      shipping_cost: 12,
      shop_id: 3,
      shop_name: "Handwoven Dreams",
      reviews: [
        {
          id: 1,
          user: "Emily K.",
          rating: 5,
          comment: "Such a beautiful vase! Looks perfect in my living room.",
          date: "2024-02-03",
          userImage: "https://randomuser.me/api/portraits/women/41.jpg",
          likes: 18,
          dislikes: 0,
        },
      ],
      average_rating: 4.9,
    },
    {
      id: 16,
      title: "Rustic Wooden Wall Art",
      description:
        "A handcrafted wooden wall art piece with intricate carvings and rustic charm.",
      expanded_description:
        "This unique wooden wall art piece is meticulously carved by skilled artisans, bringing warmth and character to any space. It makes a stunning focal point for living rooms, bedrooms, or offices.",
      about:
        "Rustic Creations is dedicated to producing handmade wooden home decor that celebrates traditional craftsmanship.",
      category: "ART",
      subCategory: "Decor",
      subSubCategory: "Wall Art",
      photos_videos: [wall1, wall1, wall1, wall1],
      tags: ["Handmade", "Wooden", "Wall Art", "Rustic"],
      primary_colour: "Dark Brown",
      secondary_colour: null,
      materials: ["Wood"],
      customized: true,
      price: 90,
      quantity: 5,
      processing_time: "8 days",
      weight: "3kg",
      size: "24x18 inch",
      return_policy: "Default",
      shipping_cost: 15,
      shop_name: "Rustic Creations",
      reviews: [
        {
          id: 1,
          user: "Jason L.",
          rating: 4.5,
          comment: "The craftsmanship is amazing. Looks great in my office.",
          date: "2024-02-02",
          userImage: "https://randomuser.me/api/portraits/men/22.jpg",
          likes: 12,
          dislikes: 2,
        },
      ],
      average_rating: 4.7,
    },
    {
      id: 17,
      title: "Hand-painted Ceramic Plate",
      description:
        "A unique ceramic vase hand-painted with beautiful floral designs.",
      expanded_description:
        "This ceramic vase is carefully hand-painted by skilled artisans, featuring intricate floral motifs that add elegance to any home decor. Perfect for fresh flowers or as a statement piece on its own.",
      about:
        "Ceramic Bliss specializes in handcrafted pottery and ceramic home decor.",
      category: "HOMEWARE",
      subCategory: "Decor",
      subSubCategory: "Vases",
      photos_videos: [plate6, plate6, plate6, plate6],
      tags: ["Hand-painted", "Ceramic", "Home Decor"],
      primary_colour: "White",
      secondary_colour: "Blue",
      materials: ["Ceramic"],
      customized: true,
      price: 70,
      quantity: 7,
      processing_time: "4 days",
      weight: "2kg",
      size: "10 inch",
      return_policy: "Default",
      shipping_cost: 12,
      shop_id: 3,
      shop_name: "Handwoven Dreams",
      reviews: [
        {
          id: 1,
          user: "Emily K.",
          rating: 5,
          comment: "Such a beautiful vase! Looks perfect in my living room.",
          date: "2024-02-03",
          userImage: "https://randomuser.me/api/portraits/women/41.jpg",
          likes: 18,
          dislikes: 0,
        },
      ],
      average_rating: 4.9,
    },
]