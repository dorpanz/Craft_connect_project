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
import {EditFeaturedItems} from './components/shop-view-seller/EditFeaturedItems';
import { ItemStat } from './components/item-stats/ItemStat';
import AccountSection from './components/user-account-settings/AccountSection';
import LoginSecurity from './components/user-account-settings/Login & Security';
import UserChat from './components/user-account-settings/User-chat';
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
import SellersChat from './components/shop-account-settings/Seller-Chat';
import LoginSecurityShop from './components/shop-account-settings/Login & SecurityShop';
import { EditProduct } from './components/product-edit/EditProduct';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './components/register-user/RegisterPage';
import { AdminDashboard } from './components/admin-dashboard/AdminDashboard';
import { AdminProductReview } from './components/admin-dashboard/AdminProductReview';
import AdminAccount from './components/admin-dashboard/AdminAccount';
import AdminLoginSecurity from './components/admin-dashboard/AdminLoginSecurity';
import ProtectedRoute from './components/routes/ProtectedRoute';
import SearchResultsPage from './components/menu/SearchResults';
import { Orders } from './components/shop-account-settings/Orders';
import InfoPage from './components/aboutpage/InfoPage';
import { AdminUserManage } from "./components/admin-dashboard/AdminUserManage"
import { AdminSellerManage } from "./components/admin-dashboard/AdminSellerManage"
import { AllOccasions } from './components/gifts-occasion-page/AllOccassions';
import { CraftStat } from './components/admin-dashboard/CraftStat';
function App() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Main />} />
          <Route path='/About-Craft-Connect' element={<AboutPage />} />
          <Route path='/Gift-guides' element={<GiftGuide />} />
          <Route path='/Customize-goods' element={<CustomizePage />} />
          <Route path="/shop/:shopName" element={<ShopBuyer />} />
          <Route path='/category/:categoryName' element={<CategoryPage />} />
          <Route path='/category/:categoryName/:subCategory' element={<CategoryPage />} />
          <Route path='/category/:categoryName/:subCategory/:subSubCategory' element={<CategoryPage />} />
          <Route path="/occasion-gift/:occasionTag" element={<GiftByOccasion/>}/>
          <Route path='/item-listing/:itemId' element={<SingleItem/>}/>
          <Route path="/item-statistics/:itemId" element={<ItemStat/>}/>
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route path='/user-login' element={ <SignIn/>}/>
          <Route path='/user-register' element={ <RegisterPage/>}/>
          <Route path='/start-selling' element={ <HomePage/>}/>
          <Route path='/register-shop' element={ <RegisterShop/>}/>
          <Route path="/search" element={<SearchResultsPage/>} />
          <Route path="/craft-connect-info" element={<InfoPage/>} />
          <Route path="/all-occasions" element={<AllOccasions />} />

          {/* Protected Routes - User */}
          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/account-settings-user" element={<AccountSection/>}/>
            <Route path="/account-settings-user/login-security" element={<LoginSecurity/>}/>
            <Route path='/account-settings-user/chat' element={ <UserChat/>}/>
            <Route path='/account-settings-user/your-orders' element={ <OrdersPage/>}/>
            <Route path='/account-settings-user/your-subscriptions' element={ <SubscriptionPage/>}/>
            <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
            <Route path="/payment-details" element={<PaymentDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage favorites={favorites} setFavorites={setFavorites} />} />
          </Route>

          {/* Protected Routes - Seller */}
          <Route element={<ProtectedRoute allowedRoles={["seller"]} />}>
            <Route path='/Shop/Edit' element={<EditProfile/>}/>
            <Route path='/your-shop' element={<ShopSeller/>}/>
            <Route path='/your-shop-dashboard' element={<AccountSectionShop/>}/>
            <Route path='/your-shop-dashboard/chat' element={<SellersChat/>}/>
            <Route path='/your-shop-dashboard/login-security' element={<LoginSecurityShop/>}/>
            <Route path='/edit-product/:productId' element={<EditProduct/>}/>
            <Route path="/edit-featured-items" element={<EditFeaturedItems/>}/>
            <Route path='/your-shop-dashboard/shop-statistics' element={<StatisticsDash/>}/>
            <Route path='/your-shop-dashboard/advertistment-overview' element={<AdStats/>}/>
            <Route path='/add-items' element={<UploadProduct/>}/>
            <Route path='/your-shop-dashboard/orders' element={<Orders/>}/>
          </Route>

          {/* Protected Routes - Admin */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/review-product/:productId" element={<AdminProductReview />} />
            <Route path="/admin/admin-account" element={<AdminAccount />} />
            <Route path="/admin/login-security" element={<AdminLoginSecurity />} />
            <Route path="/admin/login-security" element={<UploadProduct />} />
            <Route path="/admin/users-management" element={<AdminUserManage/>}/>
            <Route path="/admin/sellers-management" element={<AdminSellerManage/>}/>
            <Route path="/admin/website-stats" element={<CraftStat/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;