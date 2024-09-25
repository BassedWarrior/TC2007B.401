import React from 'react'

import { Routes } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Encabezado/>

      <main>
        <Routes/>
      </main>

      <PiePagina/>
    </>
  )
}

export default Layout