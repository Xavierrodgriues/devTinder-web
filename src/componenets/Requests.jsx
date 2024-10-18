/* eslint-disable no-unused-vars */
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  // handle accept or reject the connection request

  const reviewRequest = async (status, _id)=>{
    const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {withCredentials: true});
    fetchRequest();

  }

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return;
  if (requests.length === 0) return <h1> No Connections found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Requests:</h1>
      {requests.map((request) => {
        const { firstName, lastName, photoUrl } =
          request.fromUserId;
        return (
          <div
            key={request._id}
            className="flex m-3 p-10 items-center gap-10 justify-center w-1/2 h-12 mx-auto rounded-xl border border-base-100 bg-base-200"
          >
            <div>
              <img
                src={
                  photoUrl ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                className="w-14 h-14 rounded-full"
                alt="photo"
              ></img>
            </div>
            <div>
              <h1 className="text-blue-500 font-bold text-2xl">
                {firstName + " " + lastName}
              </h1>
            </div>
            <div className="flex gap-5 items-end mx-auto">
              <button onClick={()=>reviewRequest("rejected", request._id)} className="btn bg-secondary justify-center my-auto text-white btn-xs sm:btn-sm md:btn-md lg:btn-md">
                Reject
              </button>
              <button onClick={()=>reviewRequest("accepted", request._id)} className="btn btn-xs bg-primary text-white sm:btn-sm md:btn-md lg:btn-md">
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
