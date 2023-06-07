import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/authContext";

export function Header() {
  const navigate = useNavigate();
  const { clearUsername, username } = useContext(AuthContext);

  const log_out = () => {
    clearUsername();
    navigate("/dashboard");
  };
  return (
    <nav className="dark:bg-gray-800  shadow-xl bg-grey z-20 relative">
      <div className="w-5/6 mx-auto max-w-7xl px-12">
        <div className="flex items-center justify-between h-20">
          <div className="w-full justify-between flex items-center">
            <Link className="flex-shrink-0" to="/">
              <img className="w-auto h-12" src="./logo.png" alt="Workflow" />
            </Link>
            <div className="hidden md:block">
              <div className="flex items-baseline ml-10 space-x-4">
                <Link
                  className="text-gray-300 text-lg hover:text-sky-400 hover:text-sky-400 dark:hover:text-white px-3 py-2 rounded-md font-medium"
                  to="/"
                >
                  Blog
                </Link>
                {username ? (
                  <Link
                    onClick={log_out}
                    className="text-gray-300 text-lg hover:text-sky-400 dark:hover:text-white px-3 py-2 rounded-md font-medium"
                    to="/dashboard"
                  >
                    Log out
                  </Link>
                ) : (
                  <div>
                    <Link
                      className="text-gray-300 text-lg hover:text-sky-400 hover:text-sky-400 dark:hover:text-white px-3 py-2 rounded-md font-medium"
                      to="/login"
                    >
                      Login
                    </Link>
                    <Link
                      className="text-gray-300 text-lg hover:text-sky-400 dark:hover:text-white px-3 py-2 rounded-md font-medium"
                      to="/register"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            className="text-gray-300 text-lghover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            to="/"
          >
            Blog
          </Link>
          <Link
            className="text-gray-300 text-lghover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="text-gray-300 text-lghover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            to="/register"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
