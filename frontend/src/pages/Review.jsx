import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from "../components/StarRating";

const Review = () => {
  const { userId } = useParams();
  const [reviewData, setReviewData] = useState({
    punctuality: 0,
    behaviour: 0,
    paymentTimeliness: 0,
    preparedness: 0,
    reliability: 0,
    feedback: "",
  });

  const handleSubmit = async() => {
    try {
      
    } catch (error) {
      
    }
  };

  useEffect(()=>{
    console.log(reviewData)
  },[reviewData])

  return (
    <div className="min-h-[calc(100vh-84px)] p-24 w-full ">
      {/* form */}
      <div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-lg shadow"
        >
          <div>
            <span>Punctuality:</span>
            <StarRating 
              rating={reviewData["punctuality"]}
              editable={true}
              onChange = {(value)=>setReviewData(prev=>({...prev,punctuality:5}))}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Review;
