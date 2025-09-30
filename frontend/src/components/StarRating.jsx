import React from 'react'
import { FaStar } from "react-icons/fa";
const StarRating = ({rating,outOf=5}) => {
  return (
    <div className='flex'>
    {[...Array(outOf)].map((_,i)=>{
        return <FaStar
            key={i}
            className={`h-5 w-5 ${i<Math.round(rating)?"text-yellow-400" : "text-gray-300"}`}
        />
    })}
    </div>
  )
}

export default StarRating