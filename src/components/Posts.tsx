import {useQuery} from "@tanstack/react-query";

const fetchPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if(!response.ok) throw new Error("Error fetching posts.");
    return response.json();
}

const Posts = () => {

    const {data, isLoading, error} = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        staleTime: 10000,

    })

    console.log(data)

    if (isLoading) return <p>Loading......</p>

    if (error) return <p>Error Occurred: {error.message}</p>

    return (
        <>
            {" "}
            {data?.map((post: Post) => (
                <p>{post.title}</p>
            ))}
        </>
    )
}
export default Posts
