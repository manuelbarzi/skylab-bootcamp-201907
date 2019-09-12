import Context from '../context';
import React, { useState, useEffect } from 'react'
import logic from '../../logic'

import Header from '../Header'
import Landing from '../Landing'
import Register from '../Register'
import RegisterSuccess from '../Register-success'
import Login from '../Login'
import Home from '../Home'
import Space from '../Space'
import SpaceRegister from '../Space-register'
import Month from '../Month'
import Week from '../Week'
import Day from '../Day'
import Footer from '../Footer'

import { withRouter, Route } from 'react-router-dom'

const { id, token } = sessionStorage

function App({ history }) {

  const [view, setView] = useState('')
  const [credentials, setCredentials] = useState({ id, token })
  //useState: state and setter --> [space,setSpace] = useState(*default value*)
  const[spaces, setSpaces] = useState() 
  const [spaceId, setSpaceId] = useState()
  const [mySpace, setMySpace] = useState()

  
  return (
    <>

    <Context.Provider value = {{ view, setView, credentials, setCredentials, spaces, setSpaces, spaceId, setSpaceId, mySpace, setMySpace }} >

      <Header/>
      
      <Route exact path="/" render={() => logic.isUserLoggedIn() ? history.push('/home') : <Landing/>} />
      <Route path="/sign-up" render={() => logic.isUserLoggedIn() ? history.push('/home') : <Register />} />
      <Route path="/sign-up-success" render={() => logic.isUserLoggedIn() ? history.push('/home') : <RegisterSuccess />} />
      <Route path="/sign-in" render={() => logic.isUserLoggedIn() ? history.push('/home') : <Login />} />
      <Route path="/home" render={() => logic.isUserLoggedIn() ? <Home /> :  history.push('/')} />
      <Route path="/space" render={() => !logic.isUserLoggedIn() ? history.push('/') : <Space />} />
      <Route path="/space-register" render={() => !logic.isUserLoggedIn() ? history.push('/') : <SpaceRegister />} />
      <Route path="/month" render={() => !logic.isUserLoggedIn() ? history.push('/') : <Month />} />
      <Route path="/week" render={() => !logic.isUserLoggedIn() ? history.push('/') : <Week />} />
      <Route path="/day" render={() => !logic.isUserLoggedIn() ? history.push('/') : <Day />} />

      <Footer/>

      </Context.Provider>
    </>
  )
}

export default withRouter(App)