import React from 'react'
import Pie from './Pie'
import Barra from  './Barra'

import Routes from './../../routes/Routers'

const Layout = () => {
  return (
    <>

    <Barra/>
      <main>
        <Routes/>
      </main>
    <Pie/>

    </>
  )
}

export default Layout