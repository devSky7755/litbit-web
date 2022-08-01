import React from 'react'

export const PageHeading = ({ title }) => {
  return (
    <div className="pb-5 mt-4 border-b border-accent">
      <h1 className="leading-6">{title}</h1>
    </div>
  )
}