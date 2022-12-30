import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {

  return (
    <nav>
      <section>
        <h1>pusher</h1>

        <div className="navContent">
          <div className="navLinks"></div>
          <Link to="/">Events</Link>
        </div>
      </section>
    </nav>
  )
}
