# React Query CRUD Example

## Overview
This project demonstrates how to use **React Query** for data fetching and mutation in a React application. It includes functionality for fetching, creating, and caching posts using **React Query**.

## Features
- Fetch posts using `useQuery` from `@tanstack/react-query`.
- Create new posts using `useMutation`.
- Cache management and optimistic updates with `queryClient`.
- TypeScript support for better type safety.

## Technologies Used
- **React** (Frontend Framework)
- **TypeScript** (Type Safety)
- **React Query** (Data Fetching & Caching)
- **JSONPlaceholder API** (Mock Backend for Posts)

## Installation & Setup
### Prerequisites
- Node.js & npm/yarn

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/yvesHakizimana/tanstack-react-query-starter.git
   cd tanstack-react-query-starter
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   npm run dev
   ```

## API Endpoints (Using JSONPlaceholder)
### Fetch all posts
```http
GET https://jsonplaceholder.typicode.com/posts
```

### Create a new post
```http
POST https://jsonplaceholder.typicode.com/posts
Content-Type: application/json

{
  "title": "New Post",
  "body": "This is a new post."
}
```

## React Query Implementation
### Fetching Posts
```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  staleTime: 10000,
});
```

### Creating a Post
```tsx
const { mutate } = useMutation({
  mutationFn: createNewPost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  },
});
```

## Contributions
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.

