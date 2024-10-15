import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  try {
    const getConnections = async () => {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    };

    useEffect(() => {
      getConnections();
    }, []);
  } catch (err) {
    console.log(err);
  }

  if (!connections) return;
  if (connections.length === 0) return <h1> No Connections found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Connections:</h1>
      {connections.map((connection) => {
        const {firstName, lastName, photoUrl, age, gender, about} = connection;
        return (
          <div key={connection._id} className="flex m-10 p-10 items-center gap-10 justify-center w-1/2 mx-auto rounded-xl border border-base-100 bg-base-200">
            <div>
            <img src={photoUrl || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} className="w-20 h-20 rounded-full" alt="photo"></img>
            </div>
            <div>
            <h1 className="text-blue-500 font-bold text-2xl">{firstName +" " +lastName}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
