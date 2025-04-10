import './CategoryMenu.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const categories = {
    "ACCESSORIES": {
        "Bags": ["Tote Bags", "Backpacks", "Clutches", "Other"],
        "Jewelry": ["Necklaces", "Bracelets", "Rings", "Earrings", "Other"],
        "Hats": [],
        "Scarves": [],
        "Hair Accessories": [],
        "Other":[]
    },
    "CLOTHING": {
        "Men": ["Shirts", "Pants", "Jackets", "Hoodies", "Suits", "Other"],
        "Women": ["Dresses", "Tops", "Bottoms", "Jumpsuits", "Outerwear", "Other"],
        "Kids": ["Baby Clothing", "Teen Wear", "Toddler Sets", "Costumes", "Other"],
        "Other":[]
    },
    "HOMEWARE": {
        "Decor": ["Wall Art", "Vases", "Candles", "Pillows", "Planters", "Storage", "Other"],
        "Kitchen": ["Utensils", "Dinnerware", "Cutting Boards", "Aprons", "Mugs", "Other"],
        "Furniture": ["Tables", "Chairs", "Shelves", "Benches", "Stools", "Other"],
        "Other":[]
    },
    "ART": {
        "Paintings": [],
        "Sculptures": [],
        "Photography": [],
        "Other":[]
    },
    "CARDS&STATIONERY": {
        "Greeting Cards": [],
        "Notebooks": [],
        "Planners": [],
        "Other":[]
    },
    "OTHER": {
        "Toys": [],
        "Pet Accessories": [],
        "Collectibles & Charms": []
    }
};


const CategoryMenu = () => {
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [hoveredSubCategory, setHoveredSubCategory] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(null);
    const [subDropdownVisible, setSubDropdownVisible] = useState(null);

    let timeoutId;

    const handleCategoryMouseEnter = (category) => {
        clearTimeout(timeoutId); // Clear any previous timeout
        setHoveredCategory(category);
        timeoutId = setTimeout(() => {
            setDropdownVisible(category); // Show dropdown after delay
        }, 200); // Delay of 200ms before showing the dropdown
    };

    const handleCategoryMouseLeave = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            setDropdownVisible(null); // Hide dropdown after delay
        }, 200); // Delay of 200ms before hiding the dropdown
    };

    const handleSubCategoryMouseEnter = (sub) => {
        clearTimeout(timeoutId);
        setHoveredSubCategory(sub);
        timeoutId = setTimeout(() => {
            setSubDropdownVisible(sub); // Show sub-dropdown after delay
        }, 200); // Delay of 200ms before showing the sub-dropdown
    };

    const handleSubCategoryMouseLeave = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            setSubDropdownVisible(null); // Hide sub-dropdown after delay
        }, 200); // Delay of 200ms before hiding the sub-dropdown
    };

    return (
        <div className="category-menu">
            {Object.keys(categories).map((category) => (
                <div 
                    key={category} 
                    className="category-item"
                    onMouseEnter={() => handleCategoryMouseEnter(category)}
                    onMouseLeave={handleCategoryMouseLeave}
                >
                    <li>{category}</li>
                    {dropdownVisible === category && Object.keys(categories[category]).length > 0 && (
                        <div className="dropdown-wrapper">
                            <ul className="dropdown">
                                {Object.keys(categories[category]).map((sub) => (
                                    <div 
                                        key={sub} 
                                        className="sub-category-item"
                                        onMouseEnter={() => handleSubCategoryMouseEnter(sub)}
                                        onMouseLeave={handleSubCategoryMouseLeave}
                                    >
                                        <li>
                                            <Link className='link-to-category' to={`/category/${category}/${sub}`}>{sub}</Link>
                                        </li>
                                        {subDropdownVisible === sub && Array.isArray(categories[category][sub]) && categories[category][sub].length > 0 && (
                                            <ul className="sub-sub-dropdown">
                                                {categories[category][sub].map((subSub) => (
                                                    <li key={subSub}>
                                                        <Link className='link-to-category' to={`/category/${category}/${sub}/${subSub}`}>{subSub}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CategoryMenu;
