import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/axios.js";
import Loading from "../Skeletons/Loading.jsx";
import { getRandomAvatar } from "../utils/avatar.js";
import StarRating from "../components/StarRating.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "../styles/swiperstyle.css";
import { AuthContext } from "../store/AuthContext.jsx";
import {AttorneyContext} from "../store/AttorneyContext.jsx"
import ClientProfileSkeleton from "../Skeletons/ClientProfileSkeleton.jsx";

const ClientProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { authUser } = useContext(AuthContext);
  const{handleAddClient} = useContext(AttorneyContext)

  useEffect(() => {
    const fetchClient = async () => {
      const res = await API.get(`/client/${id}`);
      setData(res.data);
    };
    fetchClient();
  }, [id]);

  if (!data) {
    return <ClientProfileSkeleton />;
  }

  const { client, aggregatedReviews, reviews } = data;

  return (
    <div className="min-h-[calc(100vh-84px)] px-20 py-10">
      {/* client info */}
      <div className="flex items-center gap-4 bg-white shadow rounded-xl p-6 justify-between">
        <div className="flex">
          <img
            src={getRandomAvatar()}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex flex-col  justify-center">
            <h2 className="text-2xl font-semibold">
              {client.user.firstName} {client.user.lastName}
            </h2>
            <p className="text-gray-600">{client.user.email}</p>
          </div>
        </div>

        {authUser.role === "Attorney" && (
          <button
            className="bg-green-400 px-8 py-4 rounded-3xl hover:bg-green-500 transition-colors shadow"
            onClick={() => {
              handleAddClient(client.user.email)}}
          >
            Add Client
          </button>
        )}
      </div>

      {/* summary */}
      <div className="bg-gray-500 p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold mb-4">Summary</h3>
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(aggregatedReviews._avg).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between bg-white p-3 rounded-md shadow-sm"
            >
              <span className="capitalize">{key}</span>
              <StarRating rating={value || 0} />
            </div>
          ))}
        </div>
      </div>

      {/* all reviews */}
      <div className="mt-5">
        <h3 className="text-xl font-bold mb-4">Detailed Reviews</h3>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide
              key={review.id}
              className="shadow bg-gray-100 rounded-lg p-4 px-10"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={getRandomAvatar()}
                  alt="attorney avatar"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">
                    {review.attorney.user.firstName}{" "}
                    {review.attorney.user.lastName}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {review.attorney.user.email}
                  </p>
                </div>
              </div>
              <ul className="text-sm space-y-1">
                <li className="flex items-center justify-between">
                  <span className="font-semibold">Punctuality: </span>
                  <StarRating rating={review.punctuality} />
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-semibold">Behaviour: </span>
                  <StarRating rating={review.behaviour} />
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-semibold">PaymentTimeliness: </span>
                  <StarRating rating={review.paymentTimeliness} />
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-semibold">Preparedness: </span>
                  <StarRating rating={review.preparedness} />
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-semibold">Reliability: </span>
                  <StarRating rating={review.reliability} />
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">Feeback: </span>
                  <p className="text-gray-600">{review.feedback}</p>
                </li>
              </ul>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ClientProfile;
