import { Link, useParams } from 'react-router-dom';
import Menu from '../menu/Menu';
import CategoryMenu, { categories } from '../main-page/categories/CategoryMenu';
import './CategoryPage.css';
import { useEffect, useState } from 'react';
import { data } from '../../data/products'; 
import { useCart } from "../../context/CartContext"; 
const CategoryPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { addToCart } = useCart();
    const { categoryName, subCategory, subSubCategory } = useParams();
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([0, 200]); 
    const [sortOrder, setSortOrder] = useState(null);

    
    const handleSubCategoryChange = (subCategory) => {
        setSelectedSubCategories((prevSelected) =>
            prevSelected.includes(subCategory)
                ? prevSelected.filter((item) => item !== subCategory)
                : [...prevSelected, subCategory]
        );
    };

    const generateStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
        return (
            <>
                {"★".repeat(fullStars)}
                {halfStar && "☆"}
                {"☆".repeat(emptyStars)}
            </>
        );
    };
    
    
    const handlePriceRangeChange = (event) => {
        const value = event.target.value;
        setSelectedPriceRange(value.split(',').map(Number)); 
    };

    
    const filteredProducts = data.filter((product) => {
        const isCategoryMatch = product.category.toLowerCase() === categoryName.toLowerCase();
        const isSubCategoryMatch =
            !subCategory || product.subCategory?.toLowerCase() === subCategory.toLowerCase();
        const isSubSubCategoryMatch =
            !subSubCategory || product.subSubCategory?.toLowerCase() === subSubCategory.toLowerCase();
        const isPriceRangeMatch =
            product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1];

        return isCategoryMatch && isSubCategoryMatch && isSubSubCategoryMatch && isPriceRangeMatch;
    });

    
    const sortedProducts = [...filteredProducts];
    if (sortOrder === 'Highest-price') {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'Lowest-price') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'Recently-listed') {
        sortedProducts.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate)); 
    }

    
    const getSubCategories = (category) => {
        const subCategories = [];
        const categoryData = categories[category];
        for (const [subCategoryKey, subCategoryValue] of Object.entries(categoryData)) {
            if (typeof subCategoryValue === 'object') {
                
                for (const subSubCategoryKey of Object.keys(subCategoryValue)) {
                    subCategories.push(subSubCategoryKey);
                }
            } else {
                
                subCategories.push(subCategoryKey);
            }
        }
        return subCategories;
    };

    
    const getSubSubCategories = (category, subCategory) => {
        const categoryData = categories[category];
        const subCategoryData = categoryData[subCategory];
        return subCategoryData && typeof subCategoryData === 'object' ? Object.keys(subCategoryData) : [];
    };

    
    const subCategories = getSubCategories(categoryName);
    const subSubCategories = subCategory ? getSubSubCategories(categoryName, subCategory) : [];

    return (
        <div>
            <Menu />
            <CategoryMenu />

            <div className='category-page'>

                <div>
                    <div className="category-info">
                        <h1>{categoryName}</h1>
                        {subCategory && <h2>{subCategory}</h2>}
                        {subSubCategory && <h3>{subSubCategory}</h3>}
                    </div>

                    <div className="sort">
                        <p>Sort By</p>
                        <input
                            type="radio"
                            id="recently-listed"
                            name="sorts"
                            value="Recently-listed"
                            onChange={() => setSortOrder('Recently-listed')}
                        />
                        <label htmlFor="recently-listed">Recently listed</label>

                        <input
                            type="radio"
                            id="highest-price"
                            name="sorts"
                            value="Highest-price"
                            onChange={() => setSortOrder('Highest-price')}
                        />
                        <label htmlFor="highest-price">Highest price</label>

                        <input
                            type="radio"
                            id="lowest-price"
                            name="sorts"
                            value="Lowest-price"
                            onChange={() => setSortOrder('Lowest-price')}
                        />
                        <label htmlFor="lowest-price">Lowest price</label>
                    </div>

                    <div className="product-list">
                        {sortedProducts.length > 0 ? (
                            sortedProducts.map((product) => (
                                <div key={product.id} className="all-items-section-list-item">
                                    <div className="heart-icon-container">
                                        <i className="fa fa-heart heart-icon"></i>
                                    </div>
                                    <Link to={`/item-listing/${product.id}`} style={{ textDecoration: 'none' }}>
                                    <img className='item-lsiting-img-cat' src={product.photos_videos[0]} alt={product.title} />
                                    </Link>
                                    <div className="all-items-section-list-item-desc">
                                    <Link to={`/item-listing/${product.id}`} style={{ textDecoration: 'none' }}>
                                        <p className="shop-items-section-list-item-title">{product.title}</p>
                                    </Link>
                                        <div className="stars-2">{generateStars(product.average_rating)}</div>
                                        <div className="all-items-section-list-item-info">
                                            <p className="price">CA${product.price}</p>
                                            <button className="add-to-cart-2" onClick={() => addToCart(product)}>Add</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
