import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { json } from "stream/consumers";

interface BlogItem {
  title: string;
  url: string;
  text: string;
  user: string | null;
  date: string;
  watch: number;
  like: number;
  time: number;
}

export function Blog() {
  const blogs = JSON.parse(localStorage.getItem("blog") as string);
  const [showModal, setShowModal] = useState(false);
  const [showedit, setEdit] = useState(false);
  const [url, seturl] = useState("");
  const [title, settitle] = useState("");
  const [text, settext] = useState("");
  const [like, setlike] = useState(0);
  const [watch, setwatch] = useState("");
  const [date, setdate] = useState("");
  const [user, setuser] = useState("");
  const [time, settime] = useState(0);
  const { username } = useContext(AuthContext);
  const [key, setkey] = useState(0);
  const navigate = useNavigate();

  const view = (key: number) => {
    seturl(blogs[key].url);
    settitle(blogs[key].title);
    settext(blogs[key].text);
    setlike(blogs[key].like);
    setwatch(blogs[key].watch);
    setdate(blogs[key].date);
    setuser(blogs[key].user);
    setkey(key);
    setShowModal(true);
    // alert(username)
    // alert(user)
    if (username != blogs[key].user) {
      blogs[key].watch++;
      localStorage.setItem("blog", JSON.stringify(blogs));
    }
    return;
  };

  const edit = (key: number) => {
    seturl(blogs[key].url);
    settitle(blogs[key].title);
    settext(blogs[key].text);
    setlike(blogs[key].like);
    setwatch(blogs[key].watch);
    setdate(blogs[key].date);
    setuser(blogs[key].user);
    settime(blogs[key].time);
    setEdit(true);
    setShowModal(false);
  };

  const like_create = () => {
    const b = localStorage.getItem(url);
    if (!username) {
      alert("Log in!");
      return;
    }

    if (b === null) {
      if (blogs[key].user != username) {
        blogs[key].like++;
        const a: string[] = [];
        a.push(username);
        localStorage.setItem(url, JSON.stringify(a));
        localStorage.setItem("blog", JSON.stringify(blogs));
      }
    } else {
      const arr = JSON.parse(b);

      if (blogs[key].user != username && arr.indexOf(username) == -1) {
        blogs[key].like++;
        localStorage.setItem("blog", JSON.stringify(blogs));
        const a = JSON.parse(b);
        a.push(username);
        localStorage.setItem(url, JSON.stringify(a));
      }
    }
    setShowModal(false);
  };

  const like_sort = () => {
    const blog: BlogItem[] = blogs;
    blog.sort(function (a, b) {
      return b.like - a.like;
    });
    localStorage.setItem("blog", JSON.stringify(blog));
    navigate("/dashboard");
  };

  const watch_sort = () => {
    const blog: BlogItem[] = blogs;
    blog.sort(function (a, b) {
      return b.watch - a.watch;
    });
    localStorage.setItem("blog", JSON.stringify(blog));
    navigate("/dashboard");
  };

  const date_sort = () => {
    const blog: BlogItem[] = blogs;
    blog.sort(function (a, b) {
      return b.time - a.time;
    });
    localStorage.setItem("blog", JSON.stringify(blog));
    navigate("/dashboard");
  };
  // const date_sort = () =>{
  //   const blog :BlogItem[]=blogs
  //   blog.sort(function(a, b){return b.date - a.date})
  //   localStorage.setItem("blog", JSON.stringify(blog))

  // }

  const edit_save = () => {
    const d = new Date();
    const date = d.toDateString();

    if (!title || !url || !text) return;

    const arr: BlogItem = {
      title: title,
      url: url,
      text: text,
      user: username,
      date: date,
      time: time,
      watch: 0,
      like: 0,
    };
    const b = localStorage.getItem("blog");
    if (b == null) return;
    else {
      const blog = JSON.parse(b);
      blog[key] = arr;
      localStorage.setItem("blog", JSON.stringify(blog));
      alert("saved");
      setEdit(false);
    }
  };

  return (
    <div className="w-5/6 p-12 bg-white m-auto mt-8 bg-transparent">
      {username ? (
        <div className="fixed top-30 right-20 right-0 w-20 h-20">
          <Link to="/create">
            <img
              src="./create.png"
              alt="create photo"
              className="w-20 h-20"
            ></img>
          </Link>
        </div>
      ) : (
        <div></div>
      )}

      <div className="flex items-end justify-between mb-12 header">
        <div className="title ">
          <p className="mb-4   text-4xl font-bold text-gray-800">
            Welcome {username}
          </p>
        </div>
        <div>
          <button
            className="text-black  active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="button"
            onClick={like_sort}
          >
            Like
          </button>
          <button
            className="text-black  active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="button"
            onClick={watch_sort}
          >
            Watch
          </button>
          <button
            className="text-black  active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="button"
            onClick={date_sort}
          >
            Date
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {localStorage.getItem("blog") != null ? (
          blogs.map((blog: any, key: number) => (
            <div
              className="m-auto overflow-hidden rounded-lg shadow-lg cursor-pointer h-90 w-60 lg:w-72 sm:w-64"
              key={key}
              onClick={() => view(key)}
            >
              <Link to="#" className="block w-full h-full">
                <img
                  alt="blog photo"
                  src={blog.url}
                  className="object-cover w-full max-h-40"
                />
                <div className="w-full p-4 bg-white dark:bg-gray-800">
                  <p className="font-medium text-indigo-500 text-md">
                    {blog.user}
                  </p>
                  <p className="mb-2 text-xl font-medium text-gray-800 dark:text-white">
                    {blog.title}
                  </p>
                  <p className="font-light text-gray-400 dark:text-gray-300 text-md">
                    {blog.text}
                  </p>
                  <div className="flex items-center mt-4">
                    <div className="flex flex-col justify-between ml-4 text-sm">
                      <p className="text-gray-800 dark:text-white">
                        <i
                          className="fa fa-hand-stop-o"
                          style={{ fontSize: "18px" }}
                        ></i>
                        {blog.like}
                      </p>
                      <p className="text-gray-400 dark:text-gray-300">
                        <i
                          className="fa fa-eye"
                          style={{ fontSize: "18px" }}
                        ></i>
                        {blog.watch}
                      </p>
                    </div>
                    <div className="flex flex-col justify-between ml-4 text-sm">
                      <p className="text-gray-400 dark:text-gray-300">
                        <i
                          className="fa fa-clock-o"
                          style={{ fontSize: "18px" }}
                        ></i>
                        {blog.date}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>

      <>
        {showModal ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 border border-2">
              <div className="relative w-full my-6 mx-auto max-w-3xl">
                <div className="border-2 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-3xl font=semibold">Detail Info</h3>
                    <button
                      onClick={() => setShowModal(false)}
                      className="bg-transparent border-0 text-black float-right"
                    >
                      <span className="text-white opacity-7 h-6 w-6 text-xl block bg-red-700 py-0 rounded-full">
                        x
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <div
                      className="m-auto overflow-hidden rounded-lg shadow-lg cursor-pointer h-300 w-full lg:w-full sm:w-full"
                      onClick={() => setShowModal(true)}
                    >
                      <img
                        alt="blog photo"
                        src={url}
                        className="object-cover w-3/6 h-1/2 m-auto"
                      />
                      <div className="w-full p-4 bg-white dark:bg-800">
                        <p className="font-medium text-indigo-500 text-md">
                          {user}
                        </p>
                        <p className="mb-2 text-xl font-medium text-black-800 dark:text-black">
                          {title}
                        </p>
                        <p className="font-light text-black-800 dark:text-black text-md">
                          {text}
                        </p>
                        <div className="inline-block items-center mt-4">
                          <p className="text-gray-800 dark:text-grey">
                            <i
                              className="fa fa-hand-stop-o"
                              style={{ fontSize: "18px" }}
                            ></i>
                            {like}
                          </p>
                          <p className="text-gray-800 dark:text-grey">
                            <i
                              className="fa fa-eye"
                              style={{ fontSize: "18px" }}
                            ></i>
                            {watch}
                          </p>

                          <p className="text-gray-800 dark:text-grey">
                            <i
                              className="fa fa-clock-o"
                              style={{ fontSize: "18px" }}
                            ></i>
                            {date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-around p-6 border-t border-solid border-blueGray-200 rounded-b">
                    {username === user ? (
                      <>
                        <button
                          className="text-white bg-green-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          key={key}
                          onClick={() => edit(key)}
                        >
                          Edit
                        </button>
                      </>
                    ) : (
                      <button
                        className="text-white bg-sky-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={like_create}
                      >
                        Like
                        <i
                          className="fa fa-hand-stop-o"
                          style={{ fontSize: "18px" }}
                        ></i>
                      </button>
                    )}

                    <button
                      className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </>
      <>
        {showedit ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 border border-2">
              <div className="relative w-full my-6 mx-auto max-w-3xl">
                <div className="border-2 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-3xl font=semibold">Edit Page</h3>
                    <button
                      onClick={() => setEdit(false)}
                      className="bg-transparent border-0 text-black float-right"
                    >
                      <span className="text-white opacity-7 h-6 w-6 text-xl block bg-red-700 py-0 rounded-full">
                        x
                      </span>
                    </button>
                  </div>
                  <div className="grid grid-cols2 gap-2 h-400px">
                    <div className="relative p-6 h-300px">
                      <div className="m-auto overflow-hidden rounded-lg shadow-lg cursor-pointer h-100 w-50 lg:w-50 sm:w-50">
                        <img
                          alt="blog photo"
                          src={url}
                          className="object-cover w-50 h-300px m-auto"
                        />
                        <form className="mt-6 p-5">
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
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-around p-6 border-t border-solid border-blueGray-200 rounded-b">
                    {username == user ? (
                      <>
                        <button
                          className="text-white bg-green-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          key={key}
                          onClick={edit_save}
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <button
                        className="text-white bg-red-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => setEdit(false)}
                      >
                        Cancel
                        <i
                          className="fa fa-hand-stop-o"
                          style={{ fontSize: "18px" }}
                        ></i>
                      </button>
                    )}

                    <button
                      className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => setEdit(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </>
    </div>
  );
}
