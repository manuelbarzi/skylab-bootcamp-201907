import React from 'react';

function PlayerResultInitial({ player }) {

   
    const {name, surname,  photo}  = player
    
    function addDefaultSrc(event) {
       
        event.target.src = 'http://localhost:8080/images/avatar.jpg'
          
    }

    return <div>
              <div className="card-initial">
                
                <img  className="card-initial__image" onError={addDefaultSrc} src={"http://localhost:8080" + photo} /> 
                
                <div className="card-initial__info" >
                    <p className="card-initial_info__name">{name} {surname} </p>
                </div>
                </div>
           
        
    </div>
    


}

export default PlayerResultInitial

