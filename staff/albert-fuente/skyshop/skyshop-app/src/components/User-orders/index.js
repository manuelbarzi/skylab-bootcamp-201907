/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"
import Feedback from '../Feedback'




function ShowAllOrdersUser() {
  const[error,setError]=useState(undefined)

    
    const { credentials, setCredentials, setView, user, products, setProducts,productQuery,setProductQuery , orders,setOrders} = useContext(Context)

    useEffect(() => {

        if (credentials) {
          const { id, token } = credentials
          
          async function retrieve() {
            try {
              const orderId = await logic.retrieveAllOrdersUser(id, token)

              setOrders(orderId)      
              setError(undefined)
                  
              console.log('is order? '+orderId)
            } catch(error) {
              setError(error.message)
              console.log(error.message)
              
            }
          }
          retrieve()

        }
    }, [credentials])

 

    return <>
    {user &&
    <div>
      
   <h4>All orders:</h4>
         {error!=undefined && <Feedback message={error} />} 

    {orders &&
            <ul>
                 {orders.map(item=> {
                   return<>
                    <ul className='orders' >
                    <label className="orders-label">STATE:</label>
                    <li className="">{item.state[0]}</li>
                    <label className="orders-label">DATE:</label>
                    <li className="">{item.date.slice(0,16)}</li>
                    <label className="orders-label">ITEMS:</label>
                    <li className="">{item.items.map(prod=>"\n Product reference: "+prod.product+ "        Quantity: \n"+prod.quantity + "    ")}</li>

                    </ul>
                   </>
                 }
                 
                  )} 
                  <a href='/#/profile'><i className="far fa-2x fa-arrow-alt-circle-left addCart-a backArrow"></i></a>

            </ul> 
            
    }     

    </div>
    

    }
    </>
}

export default ShowAllOrdersUser