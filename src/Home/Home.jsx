import React from 'react'
import SideMenu from '../Home/SideMenu/SideMenu'
import Content from './Content/Content'
import "./Home.css"


export default function Home() {
  return (
    <div className='App'>
      <SideMenu></SideMenu>
      <Content></Content>

    </div>
  )
}
