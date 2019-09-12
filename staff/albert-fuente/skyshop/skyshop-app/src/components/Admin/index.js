/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"



function Admin() {
    
    const { setView,view,setCredentials,admin,setUser } = useContext(Context)

    function handleGoRegisterProduct(event){
        event.preventDefault()
        setView("registerProducts")
        console.log("got to register product")
    }
 
    return <>
        {view==="redirectLanding" && <Redirect to="/landing"/>}

        <h2 className="formPanel">Admin</h2>
        {admin===true &&
        <nav>
        <ul >
            <li ><a className="nav-but" href='/#/admin/register-products'> Register Products</a></li>
            <li ><a className="nav-but" href=''> Update product TODO!!!!</a></li>
            <li ><a className="nav-but" href='/#/admin/view-orders'> View orders</a></li>
            <li ><a className="nav-but" href='/#/admin/admin-update'> Update profile</a></li>
            <li ><a className="nav-but" onClick={event => {
                event.preventDefault()  
                setCredentials(undefined)
                setView("redirectLanding")
                sessionStorage.clear()
                //setUser()
                console.log("no credentials")
            }}> Log out</a></li>
           


        </ul> 
        </nav>}
        
    </>
}

export default Admin