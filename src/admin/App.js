import IndexAdmin from './index'
import { ContextProvider } from './contexts/ContextProvider'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers
  , Kanban, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, Line
} from './pages';


function AppAdmin({ children }) {
  return (
    <ContextProvider >
      <IndexAdmin >
       { children }
        </IndexAdmin >
        {/*
        /* dong duoi k lien quan 
        <Routes>
          /* Dashboard 
          <Route path='/admin' element={<IndexAdmin > <Ecommerce /> </IndexAdmin>}></Route>
          <Route path='/admin/ecommerce' element={<Ecommerce />}></Route>

          /* Pages 
          <Route path='/orders' element={<Orders />}></Route>
          <Route path='/employees' element={<Employees />}></Route>
          <Route path='/customers' element={<Customers />}></Route>

          /* Apps 
          <Route path='/kanban' element={<Kanban />}></Route>
          <Route path='/editor' element={<Editor />}></Route>
          <Route path='/calendar' element={<Calendar />}></Route>
          <Route path='/color-picker' element={<ColorPicker />}></Route>

          /* Charts 
          <Route path='/line' element={<Line />}></Route>

          <Route path='/area' element={<Area />}></Route>
          <Route path='/bar' element={<Bar />}></Route>
          <Route path='/pie' element={<Pie />}></Route>
          <Route path='/financial' element={<Financial />}></Route>
          <Route path='/color-mapping' element={<ColorMapping />}></Route>
          <Route path='/pyramid' element={<Pyramid />}></Route>
          <Route path='/stacked' element={<Stacked />}></Route>

        </Routes>
        */}
      
    </ContextProvider>
  );
}

export default AppAdmin;
