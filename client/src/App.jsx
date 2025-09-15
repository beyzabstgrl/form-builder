import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function App(){
  return (
    <div className="container">
      <nav className="nav">
        <Link to="/" className="btn">Formlar</Link>
        <Link to="/builder" className="btn">Yeni Form Oluştur</Link>
      </nav>
      <Outlet/>
    </div>
  )
}
