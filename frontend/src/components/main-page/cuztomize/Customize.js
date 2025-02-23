import { Link } from 'react-router-dom'
import './Customize.css'
import custom from "./pictures/custom.jpg"
export const Customize = () =>{
    return(
        <div className="customize-sec-cont">
        <div className='customize-sec'>
            <div className='cutomize-info'>
                <p className='cutomize-info-title' >Customize Your Products</p>
                <p className='customize-info-desc'>Create something <b>one-of-a-kind</b> for yourself, or craft the perfect gift for someone special. 
                    Let your creativity shine with our easy-to-use customization tools.</p>
                    <div className='custom-try-cont'>
                <Link to="/Customize-goods" className='custom-try'>Try it!</Link>
                    </div>
            </div>
        </div>
        <div className='customize-pic'>
            <img src={ custom } alt='Custom'/>
        </div>
        </div>
    )
}