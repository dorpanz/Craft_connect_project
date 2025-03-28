import { Link } from 'react-router-dom'
import './GiftPopular.css'
import soap from "./pictures/soap.jpg"
export const GiftIdeas = () =>{
    return(
        <div className='gift-ideas-sec rec-section'>
            <div className='rec-header'>
                <p>A selection of our gift ideas</p>
                <Link to="/Gift-guides" className='seeMorebtn'>SEE MORE</Link>
            </div>
            <div className='gift-ideas-sec-list'>
                <div className='gift-ideas-sec-item'>
                    <img src={ soap } alt="soap" className='gift-ideas-sec-item-img'/>
                    <p className='item-name-gift'>Handmade Soap Sets</p>
                </div>

                <div className='gift-ideas-sec-item'>
                    <img src={ soap } alt="soap" className='gift-ideas-sec-item-img'/>
                    <p className='item-name-gift'>Handmade Soap Sets</p>
                </div>

                <div className='gift-ideas-sec-item'>
                    <img src={ soap } alt="soap" className='gift-ideas-sec-item-img'/>
                    <p className='item-name-gift'>Handmade Soap Sets</p>
                </div>

                <div className='gift-ideas-sec-item'>
                    <img src={ soap } alt="soap" className='gift-ideas-sec-item-img'/>
                    <p className='item-name-gift'>Handmade Soap Sets</p>
                </div>
            </div>
        </div>
    )
}