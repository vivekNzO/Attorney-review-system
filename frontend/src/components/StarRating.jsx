import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating = 0, outOf = 5, onChange, editable = false }) => {
  const [hovered, setHovered] = useState(0);


  return (
    <div className="flex">
      {[...Array(outOf)].map((_, i) => {
        const fill = (hovered || rating) > i ? "text-yellow-400" : "text-gray-300";

        return (
          <FaStar
            key={i}
            className={`h-5 w-5 cursor-${editable ? "pointer" : "default"} ${fill}`}
            onMouseEnter={() => editable && setHovered(i + 1)}
            onMouseLeave={() => editable && setHovered(0)}
            onClick={() => editable && onChange(i + 1)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
