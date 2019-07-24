import React from 'react'
import Layout from './Layout'
import {API} from '../../src/config'
const Home=() =>{
  return (
    <Layout title="Home page" description="Node react E-commerce App">
    {API}
    </Layout>
  )
}

export default Home