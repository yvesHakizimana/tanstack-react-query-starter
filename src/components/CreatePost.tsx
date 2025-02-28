import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const createNewPost = async (newPost: Partial<Post>): Promise<Post> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  return response.json();
};

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();


    const {mutate} = useMutation({
        mutationFn: createNewPost,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['posts']});
        },
        onMutate: async (newPost) => {
            await queryClient.cancelQueries({queryKey: ['posts']});

            const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

            queryClient.setQueryData(["posts"], [
                {id: Date.now(), title: newPost.title, body: newPost.body}, ...previousPosts,
            ])
            return {previousPosts}
        },
        onError: (err, newPost, context) => {
            if(context?.previousPosts){
                queryClient.setQueryData(["posts"], context.previousPosts)
            }
        }
    });

  const handleFormSubmission = (e) => {
      e.preventDefault();
      mutate({title, body: "new post."})
      setTitle("");
  }

  return (
    <>
      {" "}
      <form onSubmit={handleFormSubmission}>
        <input type="text" placeholder="Post title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <button type="submit">Create</button>
      </form>
    </>
  );
};
export default CreatePost;
