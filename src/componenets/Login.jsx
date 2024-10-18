/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [emailId, setEmailId] = useState("nihir@123.com");
  const [password, setPassword] = useState("Nihir@123");
  const [isLoginForm, setisLoginForm] = useState(true);
  const [error, SetError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
      const res = await axios.post(BASE_URL + "/login", {

        emailId,
        password
      }, {withCredentials:true});
      dispatch(addUser(res.data));
      navigate("/");
    }catch(err){
      SetError(err?.response?.data || "Something Went wrong");
    }
  }

  const handleSignUp = async ()=>{
    try{
      const res = await axios.post(BASE_URL + "/signup",{
        firstName, lastName, emailId, password
      },{withCredentials:true});

      dispatch(addUser(res.data.data));
      navigate('/profile')

    }catch(err){
      console.log(err);
    }
  }

  const handleisLogin = ()=>{
    setisLoginForm(!isLoginForm);
  }
  return (
    <div className="flex justify-center my-10 items-center ">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center"> { isLoginForm ? "Login" : "Sign Up"}</h2>
          <div>
            {!isLoginForm && <><label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">First Name: </span>
              </div>
              <input
                type="text"
                value={firstName}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFname(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">Last Name: </span>
              </div>
              <input
                type="text"
                value={lastName}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setLname(e.target.value)}
              />
            </label></>}
            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">Email: </span>
              </div>
              <input
                type="text"
                value={emailId}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-4">
            <div className="label">
                <span className="label-text">Password: </span>
              </div>
              <input
                type="text"
                value={password}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-end" >
            <button className="btn btn-primary" onClick={isLoginForm?handleLogin:handleSignUp}>{ isLoginForm ? "Login" :"Sign UP"}</button>
          </div>
          <p className="cursor-pointer" onClick={handleisLogin}>{isLoginForm?"Create an account ?":"Login ? Come with me"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;