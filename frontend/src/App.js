import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/main-page/Main';
import { AboutPage } from './components/aboutpage/AboutPage';
import { SingleItem } from './components/single-item/SingleItem';
import { GiftGuide } from './components/gift-guide/GiftGuide';
import { CustomizePage } from './components/customize-page/CustomizePage';
import { ShopBuyer } from './components/shop-view-buyer/ShopBuyer';
import { UploadProduct } from './components/upload-product-page/UploadProduct';
import CategoryPage from './components/category-page/CategoryPage';
import { EditProfile } from './components/shop-edit/EditProfile';
import { ShopSeller } from './components/shop-view-seller/ShopSeller';
import { GiftByOccasion } from './components/gifts-occasion-page/GiftsByOccasion';
import { StatisticsDash } from './components/statistics-dash/StatisticsDash';
import { AdStats } from './components/ads-stats-page/AdStats';
import EditFeaturedItems from './components/shop-view-seller/EditFeaturedItems';
import { ItemStat } from './components/item-stats/ItemStat';
import { ItemCustomize } from './components/item-customize/ItemCustomize';
import AccountSection from './components/user-account-settings/AccountSection';
import LoginSecurity from './components/user-account-settings/Login & Security';
import Chat from './components/user-account-settings/Chat';
import OrdersPage from './components/user-account-settings/OrdersPage';
import SubscriptionPage from './components/user-account-settings/SubscriptionPage';
import CartPage from './components/cart/CartPage';
import PaymentDetailsPage from './components/cart/PaymentDetailsPage';
import FavoritesPage from './components/favs/FavoritesPage';
import { useState } from 'react';
import SignIn from './components/user-login/SignIn';

import HomePage from './components/start-selling/Homepage';
import RegisterShop from './components/register-shop/RegisterShop';
import TermsAndConditions from './components/terms/TermsAndConditions';
import AccountSectionShop from './components/shop-account-settings/AccountSectionShop';
import SellersChat from './components/shop-account-settings/sellers-chat';
import LoginSecurityShop from './components/shop-account-settings/Login & SecurityShop';
import { EditProduct } from './components/product-edit/AboutProductEdit';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './components/register-user/RegisterPage';

function App() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  
  return (
    <Router>
      <AuthProvider>

      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/About-Craft-Connect' element={<AboutPage />} />
        <Route path='/Gift-guides' element={<GiftGuide />} />
        <Route path='/Customize-goods' element={<CustomizePage />} />
        <Route path="/shop/:shopId" element={<ShopBuyer />} />
        <Route path='/Add-Items' element={<UploadProduct />} />
        <Route path='/Shop/Edit' element={ <EditProfile/>}/>
        <Route path='/your-shop' element={ <ShopSeller/>}/>
        <Route path='/category/:categoryName' element={<CategoryPage />} />
        <Route path='/category/:categoryName/:subCategory' element={<CategoryPage />} />
        <Route path='/category/:categoryName/:subCategory/:subSubCategory' element={<CategoryPage />} />
        <Route path='/occasion-gift' element={<GiftByOccasion/>}/>
        <Route path='/your-shop-dashboard/shop-statistics' element={<StatisticsDash/>}/>
        <Route path='/your-shop-dashboard/advertistment-overview' element={<AdStats/>}/>
        <Route path="/edit-featured-items" element={<EditFeaturedItems/>}/>
        <Route path='/item-listing/:itemId' element={<SingleItem/>}/>
        <Route path="/item-statistics" element={<ItemStat/>}/>
        <Route path="/customize-item" element={<ItemCustomize/>}/>
        <Route path="/account-settings-user" element={<AccountSection/>}/>
        <Route path="/account-settings-user/login-security" element={<LoginSecurity/>}/>
        <Route path='/account-settings-user/chat' element={ <Chat/>}/>
        <Route path='/account-settings-user/your-orders' element={ <OrdersPage/>}/>
        <Route path='/account-settings-user/your-subscriptions' element={ <SubscriptionPage/>}/>
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/payment-details" element={<PaymentDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage favorites={favorites} setFavorites={setFavorites} />} />
        <Route path='/user-login' element={ <SignIn/>}/>
        <Route path='/user-register' element={ <RegisterPage/>}/>
        <Route path='/start-selling' element={ <HomePage/>}/>
        <Route path='/register-shop' element={ <RegisterShop/>}/>
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
        <Route path='/your-shop-dashboard' element={<AccountSectionShop/>}/>
        <Route path='/your-shop-dashboard/chat' element={<SellersChat/>}/>
        <Route path='/your-shop-dashboard/login-security' element={<LoginSecurityShop/>}/>
        <Route path='/edit-product' element={<EditProduct/>}/>
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
