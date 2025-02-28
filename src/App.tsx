import './App.css'
import Posts from "./components/Posts.tsx";
import CreatePost from "./components/CreatePost.tsx";
import PostById from "./components/PostById.tsx";

function App() {
  return (
    <>
        <CreatePost />
      <Posts />
      <PostById id={10} />
    </>
  )
}

export default App
