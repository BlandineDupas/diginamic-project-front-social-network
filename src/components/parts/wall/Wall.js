import Post from 'components/parts/post/Post';

const Wall = ({ posts }) => {  
  return (
    <section className="main">
      { posts.length === 0 && <p>Pas de nouvelles récentes</p>}
      { posts.map((post) => (
        <Post post={post} key={post.id}></Post>
      ))}
    </section>
  );
};

export default Wall;
