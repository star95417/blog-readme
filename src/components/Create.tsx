import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/authContext";

interface BlogItem {
  title: string;
  url: string;
  text: string;
  user: string | null;
  date: string;
  time:number,
  watch: number;
  like: number;
}

export const Create = () => {
  const [title, settitle] = useState("");
  const [url, seturl] = useState("");
  const [text, settext] = useState("");
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);

  const submit = () => {
    const d = new Date();
    const date = d.toJSON();
    const time=d.getTime()

    if (!title || !url || !text) return;

    const arr: BlogItem = {
      title: title,
      url: url,
      text: text,
      user: username,
      date: date,
      time:time,
      watch: 0,
      like: 0,
    };

    if (localStorage.getItem("blog") === null) {
      const blog: BlogItem[] = [];
      blog.push(arr);
      const data = JSON.stringify(blog);
      localStorage.setItem("blog", data);
      navigate("/dashboard");
    } else {
      // localStorage.clear()
      const b = JSON.parse(localStorage.getItem("blog") as string);
      b.push(arr);
      const data = JSON.stringify(b);
      localStorage.setItem("blog", data);
      navigate("/dashboard");
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
          News Form
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label>
              <span className="text-gray-700">Tittle</span>
              <input
                type="text"
                className="w-full block px-16 py-2 mt-2 border-gray-300 rounded-md shadow-sm  focus:border-indigo-300
                           focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="John cooks"
                required
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-2">
            <label>
              <span className="text-gray-700">Image url</span>
              <input
                type="text"
                className="block w-full mt-2 px-16 py-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300
                            focus:ring focus:ring-indigo-200focus:ring-opacity-50"
                placeholder="http://abc.com or ../../a/b.jpg"
                value={url}
                onChange={(e) => seturl(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="mb-2">
            <label>
              <span className="text-gray-700">Text</span>
              <textarea
                name="message"
                className="block w-full mt-2 px-16 py-8 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring
                            focus:ring-indigo-200 focus:ring-opacity-50"
                value={text}
                onChange={(e) => settext(e.target.value)}
              ></textarea>
            </label>
          </div>

          <div className="mb-6 flex justify-around">
            <button
              className=" h-10 px-5 text-indigo-100 bg-indigo-700 rounded-lg transition-color duration-150 focus:shadow-outline
                        hover:bg-indigo-800"
              onClick={submit}
            >
              Upload
            </button>
            <button
              className="h-10 px-5 text-indigo-100 bg-red-800 rounded-lg transition-colors duration-150 focus:shadow-outline
                        hover:bg-red-800"
            >
              <Link to="/dashboard">Cancel</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
