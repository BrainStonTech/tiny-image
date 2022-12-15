import React from 'react'
import { NavLink } from 'react-router-dom'
// CSS
import '../assets/css/navbar.css'

export default function Navbar() {
  return (
    <nav className='main_nav'>
      <div className='container'>
        <div className='branding'>
          <img src={require('../assets/images/logo.png')} alt='logo' />
        </div>
        
        <ul className='links'>
          <li><a className='brand active' href='https://facebook.com/HovSofts' target='_blank'>HovSofts</a></li>
        </ul>
      </div>
    </nav>
  )
}
