import React, {useEffect,useState} from 'react';
import axios from 'axios'
import { Link} from 'react-router-dom'

export default function Places() {
    const [places,setPlaces] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:4000/get-places',{
          headers: {
            token: localStorage.getItem("userToken")
          }
        })
        .then(res=>setPlaces(res.data))
        .catch(err=> console.log(err))
  },[]) 

  
  return (
    <div>
    <h1>Places</h1>
     {places.map(place=>{
      return (
        <div key={place._id} className='onePlace'>
          <div className='placeImg'><img src={place.image} alt="place img" /></div>
          <div className='placeText'>
            <h2>{place.title}</h2>
            <p>{place.description}</p>
            {/* <p>Author: {place.user.firstname}</p> */}
            <Link to={`/places/${place._id}`}>See More</Link>
          </div>
        </div>
      )
     })}
    </div>
  )
}
