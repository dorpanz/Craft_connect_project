
export const Delievery = () =>{
    return(
    <div className="upload-product-sections">
    <p className="main-title-section">Delievery</p>
    <p className="main-desc-section">Give shoppers clear expectations about delivery time and cost by making sure your delivery info is accurate, including your order processing schedule. You can make update any time in Delivery Settings</p>

    <div className="line-2"></div>
    <div className="upload-about-section">
        <div className="price-quantity">
        <p className="info-about-product">Approximate Order Processing:</p>
        <input className="input-about-product-price" placeholder="4"/>

        <p className="info-about-product">Item weight:</p>
        <input className="input-about-product-price" placeholder="0.2kg"/>

        <p className="info-about-product">Item size:</p>
        <input className="input-about-product-price" placeholder="2mm"/>
        </div>
    </div>
    </div>
    )
}