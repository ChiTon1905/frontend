
import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  Ecommerce, Orders, Employees, Stacked, Pyramid, Customers
  ,  Area, Bar, Pie, Financial, ColorMapping, Line,
  Category, Author, Language, Promotion, Publisher, Booklayout, 
} from './admin/pages';
import AppAdmin from './admin/App';

import IndexUser from './user/index'
import Home from './user/modules/Home';
import Product from './user/modules/Product'
import Login from './user/modules/Login'
import Register from './user/modules/Register';

import { UserContextProvider } from './Contexts/UserContext'
import { CategoryContextProvider } from './Contexts/CategoriesContext';
import { ProductContextProvider } from './Contexts/ProductContext';

import Categories from './user/modules/Categories';
import Languages from './user/modules/Language';
import Publishers from './user/modules/Publishers';
import Booklayouts from './user/modules/Booklayouts';
import Authors from './user/modules/Authors';
import Search from './user/modules/Search';
import { AuthorContextProvider } from './Contexts/AuthorsContext';
import { SearchContextProvider } from './Contexts/SearchContext';
import { PublishersContextProvider } from './Contexts/PublishersContext';
import { LanguagesContextProvider } from './Contexts/LanguagesContext';
import { BooklayoutsContextProvider } from './Contexts/BooklayoutsContext'
import Cart from './user/modules/Cart';
import Checkout from './user/modules/Checkout';
import UserInfo from './user/modules/UserInfo';
import OrderHistory from './user/modules/OrderHistory';
import OrderHistoryDetail from './user/modules/OrderHistoryDetail';
import WishList from './user/modules/WishList';
import FormCategoryCreate from './admin/pages/Form/FormCategoryCreate';
import FormCategoryUpdate from './admin/pages/Form/FormCategoryUpdate';
import FormAuthorCreate from './admin/pages/Form/FormAuthorCreate';
import FormAuthorUpdate from './admin/pages/Form/FormAuthorUpdate';
import FormBooklayoutUpdate from './admin/pages/Form/FormBooklayoutUpdate';
import FormBooklayoutCreate from './admin/pages/Form/FormBooklayoutCreate'
import FormPublisherCreate from './admin/pages/Form/FormPublisherCreate';
import FormPublisherUpdate from './admin/pages/Form/FormPublisherUpdate';
import FormLanguageCreate from './admin/pages/Form/FormLanguageCreate';
import FormLanguageUpdate from './admin/pages/Form/FormLanguageUpdate';
import Book from './admin/pages/Book';
import FormBookCreate from './admin/pages/Form/FormBookCreate';
import { PromotionsContextProvider } from './Contexts/PromotionContext';
import FormBookUpdate from './admin/pages/Form/FormBookUpdate';



function App() {
  return (

    <BrowserRouter>
      <UserContextProvider>
        <CategoryContextProvider>
          <ProductContextProvider>
            <AuthorContextProvider>
              <PublishersContextProvider>
                <LanguagesContextProvider>
                  <BooklayoutsContextProvider>
                    <PromotionsContextProvider>
                    <SearchContextProvider>


                      <Routes>

                        <Route path="/" element={<IndexUser ><Home /></IndexUser>} />
                        <Route path="/books/:id" element={<IndexUser ><Product /> </IndexUser>} />
                        <Route path="/search" element={<IndexUser ><Search /> </IndexUser>} />
                        <Route path='/cart'element={<IndexUser ><Cart /> </IndexUser>} />
                        <Route path='/checkout'element={<IndexUser ><Checkout /> </IndexUser>} />
                        <Route path='/userinfo'element={<IndexUser ><UserInfo /> </IndexUser>} />
                        <Route path='/orderhistory'element={<IndexUser ><OrderHistory /> </IndexUser>} />
                        <Route path='/orderhistory/detail/:id'element={<IndexUser ><OrderHistoryDetail /> </IndexUser>} />
                        <Route path='/wishlist'element={<IndexUser ><WishList /> </IndexUser>} />


                        <Route path="/categories/:id" element={<IndexUser ><Categories /> </IndexUser>} />
                        <Route path="/languages/:id" element={<IndexUser ><Languages /> </IndexUser>} />
                        <Route path="/publishers/:id" element={<IndexUser ><Publishers /> </IndexUser>} />
                        <Route path="/booklayouts/:id" element={<IndexUser ><Booklayouts /> </IndexUser>} />
                        <Route path="/authors/:id" element={<IndexUser ><Authors /> </IndexUser>} />


                        <Route path="/login" element={<IndexUser ><Login /></IndexUser>} />
                        <Route path="/register" element={<IndexUser ><Register /></IndexUser>} />
                        <Route path="*" element={<div>404</div>} />


                        {/* admin dashboard */}
                        <Route path='/admin' element={<AppAdmin><Ecommerce /></AppAdmin>}></Route>
                        <Route path='/admin/ecommerce' element={<AppAdmin><Ecommerce /></AppAdmin>}></Route>

                        {/* Pages */}
                        <Route path='/admin/category' element={<AppAdmin><Category /></AppAdmin>}></Route>
                        <Route path='/admin/category-create' element={<AppAdmin><FormCategoryCreate /></AppAdmin>}></Route>
                        <Route path='/admin/category-update/:id' element={<AppAdmin><FormCategoryUpdate /></AppAdmin>}></Route>
                        
                        <Route path='/admin/author' element={<AppAdmin><Author /></AppAdmin>}></Route>
                        <Route path='/admin/author-create' element={<AppAdmin><FormAuthorCreate /></AppAdmin>}></Route>
                        <Route path='/admin/author-update/:id' element={<AppAdmin><FormAuthorUpdate /></AppAdmin>}></Route>

                        <Route path='/admin/publisher' element={<AppAdmin><Publisher /></AppAdmin>}></Route>
                        <Route path='/admin/publisher-create' element={<AppAdmin><FormPublisherCreate /></AppAdmin>}></Route>
                        <Route path='/admin/publisher-update/:id' element={<AppAdmin><FormPublisherUpdate /></AppAdmin>}></Route>

                        
                        <Route path='/admin/language' element={<AppAdmin><Language /></AppAdmin>}></Route>
                        <Route path='/admin/language-create' element={<AppAdmin><FormLanguageCreate /></AppAdmin>}></Route>
                        <Route path='/admin/language-update/:id' element={<AppAdmin><FormLanguageUpdate /></AppAdmin>}></Route>

                        <Route path='/admin/booklayout' element={<AppAdmin><Booklayout /></AppAdmin>}></Route>
                        <Route path='/admin/booklayout-create' element={<AppAdmin><FormBooklayoutCreate /></AppAdmin>}></Route>
                        <Route path='/admin/booklayout-update/:id' element={<AppAdmin><FormBooklayoutUpdate /></AppAdmin>}></Route>

                        
                        <Route path='/admin/promotion' element={<AppAdmin><Promotion /></AppAdmin>}></Route>
                        <Route path='/admin/orders' element={<AppAdmin><Orders /></AppAdmin>}></Route>
                        <Route path='/admin/employees' element={<AppAdmin><Employees /></AppAdmin>}></Route>
                        <Route path='/admin/customers' element={<AppAdmin><Customers /></AppAdmin>}></Route>

                        <Route path='/admin/book' element={<AppAdmin><Book /></AppAdmin>}></Route>
                        <Route path='/admin/book-create' element={<AppAdmin><FormBookCreate /></AppAdmin>}></Route>
                        <Route path='/admin/book-update/:id' element={<AppAdmin><FormBookUpdate /></AppAdmin>}></Route>

                        {/* Charts */}
                        <Route path='/admin/line' element={<AppAdmin><Line /></AppAdmin>}></Route>

                        <Route path='/admin/area' element={<AppAdmin><Area /></AppAdmin>}></Route>
                        <Route path='/admin/bar' element={<AppAdmin><Bar /></AppAdmin>}></Route>
                        <Route path='/admin/pie' element={<AppAdmin><Pie /></AppAdmin>}></Route>
                        <Route path='/admin/financial' element={<AppAdmin><Financial /></AppAdmin>}></Route>
                        <Route path='/admin/color-mapping' element={<AppAdmin><ColorMapping /></AppAdmin>}></Route>
                        <Route path='/admin/pyramid' element={<AppAdmin><Pyramid /></AppAdmin>}></Route>
                        <Route path='/admin/stacked' element={<AppAdmin><Stacked /></AppAdmin>}></Route>
                      </Routes>



                    </SearchContextProvider>
                    </PromotionsContextProvider>
                  </BooklayoutsContextProvider>
                </LanguagesContextProvider>
              </PublishersContextProvider>
            </AuthorContextProvider>
          </ProductContextProvider>
        </CategoryContextProvider>
      </UserContextProvider>

    </BrowserRouter>


  );
}

export default App;
