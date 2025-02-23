
import banner from "./images/banner.jpg"
import logo from "./images/logo.jpg"

import banner1 from "./images/banner1.jpg"
import logo1 from "./images/logo1.jpg"

import banner2 from "./images/banner2.jpg"
import logo2 from "./images/logo2.jpg"

import banner3 from "./images/banner3.jpg"
import logo3 from "./images/logo3.jpg"

import banner4 from "./images/banner4.jpg"
import logo4 from "./images/logo4.jpg"

import banner5 from "./images/banner5.jpg"
import logo5 from "./images/logo5.jpg"

export const shops = [
    {
      shop_id: 1,
      shop_name: "Amber & Silver Creations",
      owner: "Sophia M.",
      about: "A small artisan jewelry shop specializing in handcrafted silver and gemstone pieces.",
      expanded_story: "Amber & Silver Creations was founded with a passion for unique, handcrafted jewelry...",
      banner_image: banner,
      logo:logo,
      featured_items: [1,4, 11],
      categories: ["Jewelry", "Accessories"],
      rating: 4.5,
      reviews: [
        { user: "Mia R.", rating: 5, comment: "Absolutely stunning jewelry!" },
        { user: "Daniel K.", rating: 4, comment: "Beautiful pieces, wish shipping was faster." }
      ],
      social_media: {
        instagram: "https://instagram.com/amber_silver_creations",
        twitter: "https://twitter.com/amber_silver",
      },
      policies: {
        return_policy: "Returns accepted within 14 days.",
        shipping_policy: "Ships worldwide within 3-5 business days.",
      }
    },
    {
      shop_id: 2,
      shop_name: "CandlesbyMe",
      owner: "Dasha",
      about: "Handmade eco-friendly candles with natural scents.",
      expanded_story: "Dasha’s Handmade Candles started as a small passion project...",
      banner_image: banner1,
      logo: logo1,
      featured_items: [3, 7, 12],
      categories: ["Home Fragrance", "Handmade Candles"],
      rating: 4.7,
      reviews: [
        { user: "Alice W.", rating: 5, comment: "The lavender candle is amazing!" },
        { user: "John D.", rating: 4, comment: "Great scents, but I wish they lasted longer." }
      ],
      social_media: {
        instagram: "https://instagram.com/candlesbyme",
        twitter: "https://twitter.com/candlesbyme",
      },
      policies: {
        return_policy: "No returns on used candles.",
        shipping_policy: "Ships within Canada and the US.",
      }
    },
    {
      shop_id: 3,
      shop_name: "Handwoven Dreams",
      owner: "Liam T.",
      about: "Artisan textiles and handwoven home décor.",
      expanded_story: "Liam’s fascination with traditional weaving techniques led him to start Handwoven Dreams...",
      banner_image: banner1,
      logo: logo1,
      featured_items: [2, 15, 17 ],
      categories: ["Homeware", "Textiles"],
      rating: 4.9,
      reviews: [
        { user: "Sophia B.", rating: 5, comment: "Gorgeous quality, worth every penny!" },
        { user: "Emma L.", rating: 4.5, comment: "Beautiful rugs, but a bit pricey." }
      ],
      social_media: {
        instagram: "https://instagram.com/handwoven_dreams",
      },
      policies: {
        return_policy: "Returns within 10 days.",
        shipping_policy: "Worldwide shipping available.",
      }
    },
    {
      shop_id: 4,
      shop_name: "Rustic Pottery Co.",
      owner: "Noah R.",
      about: "Hand-thrown pottery with earthy, rustic designs.",
      expanded_story: "Noah has been crafting pottery for over a decade...",
      banner_image: banner2,
      logo: logo2,
      featured_items: [9],
      categories: ["Homeware", "Ceramics"],
      rating: 4.6,
      reviews: [
        { user: "Olivia P.", rating: 5, comment: "Love these handmade mugs!" },
        { user: "Ethan S.", rating: 4, comment: "Beautiful, but a bit heavy." }
      ],
      social_media: {
        instagram: "https://instagram.com/rustic_pottery_co",
      },
      policies: {
        return_policy: "Returns within 7 days.",
        shipping_policy: "Only ships within North America.",
      }
    },
    {
      shop_id: 5,
      shop_name: "EcoLeather Goods",
      owner: "Ava J.",
      about: "Sustainable leather bags and wallets.",
      expanded_story: "Ava founded EcoLeather Goods to offer stylish yet eco-friendly accessories...",
      banner_image: banner3,
      logo: logo3,
      featured_items: [3],
      categories: ["Accessories", "Bags"],
      rating: 4.8,
      reviews: [
        { user: "Mason G.", rating: 5, comment: "Perfect craftsmanship and great eco-friendly approach!" },
        { user: "Isabella T.", rating: 4.5, comment: "Love the design, wish for more color options." }
      ],
      social_media: {
        instagram: "https://instagram.com/ecoleather_goods",
      },
      policies: {
        return_policy: "Returns accepted within 30 days.",
        shipping_policy: "Free shipping on orders over $50.",
      }
    },
    {
      shop_id: 6,
      shop_name: "Mystic Art Studio",
      owner: "Zara F.",
      about: "Handmade mystical and fantasy-themed artwork.",
      expanded_story: "Zara has always been inspired by myths and legends...",
      banner_image: banner4,
      logo: logo4,
      featured_items: [7, 8, 14],
      categories: ["Art", "Paintings"],
      rating: 4.9,
      reviews: [
        { user: "Liam C.", rating: 5, comment: "Incredible attention to detail!" },
        { user: "Natalie W.", rating: 4.8, comment: "Magical paintings, exceeded expectations." }
      ],
      social_media: {
        instagram: "https://instagram.com/mystic_art_studio",
      },
      policies: {
        return_policy: "No returns on custom pieces.",
        shipping_policy: "Ships worldwide.",
      }
    },
    {
      shop_id: 7,
      shop_name: "The Stitchery",
      owner: "Emily V.",
      about: "Handmade embroidered goods and custom textiles.",
      expanded_story: "Emily learned embroidery from her grandmother and turned it into a business...",
      banner_image: banner5,
      logo: logo5,
      featured_items: [5, 6, 12],
      categories: ["Crafts", "Sewing"],
      rating: 4.7,
      reviews: [
        { user: "Hannah M.", rating: 5, comment: "Absolutely love my custom embroidery!" },
        { user: "Eleanor J.", rating: 4.6, comment: "Took a bit long to arrive, but beautiful work!" }
      ],
      social_media: {
        instagram: "https://instagram.com/the_stitchery",
      },
      policies: {
        return_policy: "No returns on custom orders.",
        shipping_policy: "Ships within 1-2 weeks.",
      }
    },
    {
      shop_id: 8,
      shop_name: "Paper Petal Creations",
      owner: "Chloe N.",
      about: "Handmade paper flowers and botanical art.",
      expanded_story: "Chloe started Paper Petal Creations as a way to bring everlasting floral beauty...",
      banner_image: "./images/banner_paper_petal.jpg",
      logo: "./images/logo_paper_petal.jpg",
      featured_items: [61, 64, 67],
      categories: ["Decor", "Crafting"],
      rating: 4.8,
      reviews: [
        { user: "Charlotte B.", rating: 5, comment: "Looks just like real flowers!" },
        { user: "Jessica F.", rating: 4.7, comment: "Perfect for home décor!" }
      ],
      social_media: {
        instagram: "https://instagram.com/paper_petal_creations",
      },
      policies: {
        return_policy: "Returns accepted within 14 days.",
        shipping_policy: "Ships worldwide.",
      }
    }
  ];
  