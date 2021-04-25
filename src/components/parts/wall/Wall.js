import Post from "../post/Post";

const Wall = ({ posts, children }) => {  
    return (
        <section className="main">
            {children}
            { posts.map((post) => (
                <Post post={post} key={post.id}></Post>
            ))}
        </section>
    );
};

export default Wall;
