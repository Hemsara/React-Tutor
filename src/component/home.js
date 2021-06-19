import { useState, useEffect } from "react";
import BlogList from "./Bloglist";

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const handleDelete = (id) => {
    const newBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(newBlogs);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/blogs")
      .then((res) => {
        console.log(res)
        if(!res.ok){
            throw Error('Something Went Wrong!')
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setBlogs(data);
        setIsPending(false);
      })
      .catch(err => {
        alert(err.message)
      })

  }, []);

  return (
    <div className="home">
      { isPending && <div>Loading...</div> }
      {blogs && (
        <BlogList blogs={blogs} title="All Blogs" handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default Home;
