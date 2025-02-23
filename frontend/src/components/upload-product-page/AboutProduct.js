export const AboutProduct = () =>{
    return(
        <div className="upload-product-sections">
            <p className="main-title-section">About</p>
            <p className="main-desc-section">Tell the world all about your item and why they’ll love it</p>

            <div className="line-2"></div>
            <div className="upload-about-section">
                <p className="info-about-product">Title: </p>
                <p>Include the keywords that buyers would use to search for this item</p>
                <input className="input-about-product" placeholder="Ex: Natural Baltic Amber Handmade Sterling Silver Earrings"/>
            </div>

            <div className="upload-about-section">
                <p className="info-about-product">Photos and Videos: </p>
                <p>Add up to 10 photos and 1 video</p>
                <div className="picture-upload-section">
                    <p>Drag and Drop or</p>
                    <button>+  Add up to 10 photos and 1 video</button>
                </div>
            </div>

            <div className="upload-about-section">
                <p className="info-about-product">Description: </p>
                <p>What makes your item special? Buyers will only see the first few lines unless they expand the description</p>
                <textarea className="input-about-product-desc" placeholder="A sweet elegant pair of earrings designed and hand crafted using 6mm round genuine Baltic Amber gemstones complemented with all 925 sterling silver components.
            These earrings will make a much appreciated gift for ladies of all age groups whom love this natural untreated gemstone. They can be worn on a daily bases for long periods of time without bragging and damaging the ear lobs because they are comfortable and lightweight. I have made myself a pair so I am speaking from experience."/>
            </div>

            <div className="upload-about-section">
                <p className="info-about-product">Category: </p>
                <select className="input-about-product">
                    <option value="">Select a category</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="clothing">Clothing</option>
                    <option value="accessories">Accessories</option>
                    <option value="home_decor">Home Decor</option>
                    <option value="art">Art</option>
                </select>
            </div>
        </div>
    )
}
