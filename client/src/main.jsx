import './polyfills.js'  
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Builder from './pages/Builder.jsx'
import Fill from './pages/Fill.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'react-form-builder2/dist/app.css'  // önce kütüphane CSS
import './styles.css'      

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route index element={<Home/>}/>
        <Route path="builder" element={<Builder/>}/>
        <Route path="forms/:id/fill" element={<Fill/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
)
