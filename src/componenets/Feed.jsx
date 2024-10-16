// feed.jsx
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getFeed = async () => {
    if (feed) return feed;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleNextCard = () => {
    if (feed && feed.data.length > currentIndex + 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    feed && feed.data.length > 0 ? (
      <div className="flex justify-center my-10">
        <UserCard user={feed.data[currentIndex]} onNext={handleNextCard} />
      </div>
    ) : (
      <p>No more users to show.</p>
    )
  );
};

export default Feed;
