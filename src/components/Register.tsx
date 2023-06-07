import React, { useState }from "react";
import { Link, useNavigate } from "react-router-dom";


export const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password1, setpassword1] = useState("");
  const [password2, setpassword2] = useState("");
  const navigate = useNavigate();

  const Submit = () => {
    if (password1 != password2) {
      alert("Incorrect confrim password");
    } else {
      if (localStorage.getItem(email) == null) {
        let arr = [email, password1];
        // alert(arr);
        let info = JSON.stringify(arr);
        localStorage.setItem(email, info);
        alert("Successfully registered!");
        navigate("/dashboard");
      } else {
        alert("Already registered user!");
      }
    }
  }

  const cancel =() =>{
    navigate("/dashboard")
  }

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-purple-600 lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
            Sign UP
          </h1>
          <form className="mt-6">
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Username
              </label>
              <input
                type="text"
                value={name}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) => setname(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password"
                value={password1}
                onChange={(e) => setpassword1(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Confirm Password
              </label>
              <input
                type="password"
                value={password2}
                onChange={(e) => setpassword2(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>
            <a href="#" className="text-xs text-purple-600 hover:underline"></a>
            <div className="mt-6">
              <button
                onClick={Submit}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Sign Up
              </button>
            </div>
          </form>
          <button className="w-full px-4 mt-2 py-2 tracking-wide text-white transition-colors 
                              duration-200 transform bg-red-700 rounded-md hover:bg-red-600 
                              focus:outline-none focus:bg-red-600"
                  onClick={cancel}>
            Cancel
          </button>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don't forgot your email?{" "}
            <a href="#" className="font-medium text-purple-600 hover:underline">
              Get Home
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
