import React from 'react'
import { Link } from 'react-router-dom'
import PageHeading from '@/components/ui/PageHeading'

function PageCardLink({ title, url, icon }) {
  return (
    <Link
      className="flex flex-col w-48 p-4 place-items-center bg-neutral rounded-box hover:text-primary"
      to={url}
    >
      {React.createElement(icon, {
        className: 'h-36 w-36',
        'aria-hidden': 'true',
      })}

      <h3 className="text-lg font-bold">{title} </h3>
    </Link>
  )
}

function Home() {

  return (
    <>
      <PageHeading title="Home" />
    </>
  )
}

export default Home
