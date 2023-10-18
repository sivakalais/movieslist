import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import Details from './Details';
 
const Content = () => {
  const [items,setItems] = useState([])
  const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTH_KEY,
    }
  };
  
  useEffect(()=>{
    const fetchItems = async ()=>{
      try{
        const response = await fetch(url,options)
        if(!response.ok) throw Error ('Data not received')
        const data =await response.json();
        setItems(data)
        console.log(data)
      }catch(err){
        console.log(err.message);
      } 
    }
    fetchItems();
    // console.log(items)
  },[])
  console.log("items",items)
  // console.log("items.results", items.results.id);
 
  return (
    <main>
      {(items.results)? (
        <ul className='moviesList'>
           {items.results.map((item)=>(
               <li key={item.id}>
                 <div className='movies'>
                     <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}  className='image'/>
                     <div className="descrip">
                        <h4>{item.original_title}</h4>
                        <p>{item.release_date}</p>
                     </div>
                     <Link to={`/content/${item.id}`} params={{id:item.id}}>Details</Link>
                 </div>
               </li>  
            ))}
        </ul>
      ): (
        <p>Page is not found.</p>
      )}
          
    </main>
  )
  }
export default Content