// UserCard.jsx
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

/* eslint-disable react/prop-types */
const UserCard = ({ user, onNext }) => {
  const { _id, firstName, lastName, about, age, photoUrl } = user;
  const dispatch = useDispatch();

  const handleSendReq = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
      onNext(); // Show the next card after removing the current one
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="card bg-base-300 h-[34rem] w-96 shadow-xl">
        <figure>
          <img
            src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
            alt="User"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>Age: {age}</p>
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={() => handleSendReq("ignored", _id)}>
              Ignore
            </button>
            <button className="btn btn-secondary" onClick={() => handleSendReq("interested", _id)}>
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
