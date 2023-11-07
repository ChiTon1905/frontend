
import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers
  , Kanban, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, Line
} from './admin/pages';
import AppAdmin from './admin/App';

import IndexUser from './user/index'
import Home from './user/modules/Home';
import Product from './user/modules/Product'
import Login from './user/modules/Login'
import Register from './user/modules/Register';

import { UserContextProvider } from './Contexts/UserContext'
import { CategoryContextProvider } from './Contexts/CategoryContext';
import { ProductContextProvider } from './Contexts/ProductContext';



function App() {
  return (
    <UserContextProvider>
      <CategoryContextProvider>
        <ProductContextProvider>
          <BrowserRouter>
            <Routes>

              <Route path="/" element={<IndexUser ><Home /></IndexUser>} />
              <Route path="/books/:id" element={<IndexUser ><Product /> </IndexUser>} />

              <Route path="/login" element={<IndexUser ><Login /></IndexUser>} />
              <Route path="/register" element={<IndexUser ><Register /></IndexUser>} />
              <Route path="*" element={<div>404</div>} />


              {/* admin dashboard */}
              <Route path='/admin' element={<AppAdmin><Ecommerce /></AppAdmin>}></Route>
              <Route path='/admin/ecommerce' element={<AppAdmin><Ecommerce /></AppAdmin>}></Route>

              {/* Pages */}
              <Route path='/admin/orders' element={<AppAdmin><Orders /></AppAdmin>}></Route>
              <Route path='/admin/employees' element={<AppAdmin><Employees /></AppAdmin>}></Route>
              <Route path='/admin/customers' element={<AppAdmin><Customers /></AppAdmin>}></Route>

              {/* Apps */}
              <Route path='/admin/kanban' element={<AppAdmin><Kanban /></AppAdmin>}></Route>
              <Route path='/admin/editor' element={<AppAdmin><Editor /></AppAdmin>}></Route>
              <Route path='/admin/calendar' element={<AppAdmin><Calendar /></AppAdmin>}></Route>
              <Route path='/color-picker' element={<AppAdmin><ColorPicker /></AppAdmin>}></Route>

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



          </BrowserRouter>
        </ProductContextProvider>
      </CategoryContextProvider>

    </UserContextProvider>

  );
}

export default App;
