import {useQuery} from "@tanstack/react-query";

const fetchPosts = async (id:number): Promise<Post> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if(!response.ok) throw new Error("Failed to fetch the post by id.");
    return response.json();
}

const PostById = ({id}: {id: number}) => {

    const {data, isLoading, error} = useQuery({
        queryKey: ["posts", id],
        queryFn: () => fetchPosts(id),
        staleTime: 1000
    })

    if(isLoading) return <p>Loading the data from the backend......</p>;

    if(error) return <p>{error.message}</p>

    return (
        <div>
            {data?.title}
        </div>
    )
}
export default PostById
