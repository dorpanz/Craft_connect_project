
export const PricingInfo = () =>{
    return(
    <div className="upload-product-sections">
    <p className="main-title-section">Price and Description</p>
    <p className="main-desc-section">Set a price for your item and indicates how many are available for sale </p>

    <div className="line-2"></div>
    <div className="upload-about-section">
        <div className="price-quantity">
        <p className="info-about-product">Price:*</p>
        <input className="input-about-product-price" placeholder="CAD$"/>

        <p className="info-about-product">Quantity:*</p>
        <input className="input-about-product-price" placeholder="Number of items to sell"/>
        </div>
    </div>
    </div>
    )
}