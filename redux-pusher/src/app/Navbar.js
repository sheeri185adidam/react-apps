import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectPusherApp } from '../features/pusher/pusherSlice'

export const Navbar = () => {
  const pusher = useSelector(selectPusherApp)

  let content
  if (pusher.appKey && pusher.appCluster) {
    content = (
      <>
        <Link to="/app">App</Link>
        <Link to="/events">Events</Link>
      </>
    )
  } else {
    content = (
      <>
        <Link to="/app">App</Link>
      </>
    )
  }

  return (
    <nav>
      <section>
        <h1>pusher</h1>

        <div className="navContent">
          <div className="navLinks"></div>
          {content}
        </div>
      </section>
    </nav>
  )
}
