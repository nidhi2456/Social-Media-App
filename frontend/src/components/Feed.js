import React, { useEffect, useState } from 'react';
import axios from '../axios';
import '../css/feed.css'; // Import the CSS file

function Feed() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({}); // Store user data
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // Change the number of posts per page as needed
  const [likedPosts, setLikedPosts] = useState([]); // Track liked posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/posts/');
        setPosts(response.data);
        fetchUsers(response.data);
      } catch (error) {
        console.error("There was an error fetching the posts!", error);
      }
    };

    fetchPosts();
  }, []);

  const fetchUsers = async (posts) => {
    const userIds = [];
    posts.forEach(post => {
      post.likes.forEach(like => {
        if (!userIds.includes(like.user)) {
          userIds.push(like.user);
        }
      });
    });

    const userPromises = userIds.map(userId => axios.get(`/users/${userId}`));
    try {
      const userResponses = await Promise.all(userPromises);
      const usersData = userResponses.reduce((acc, response) => {
        acc[response.data._id] = response.data;
        return acc;
      }, {});
      setUsers(usersData);
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    }
  };

  const handleLike = async (postId) => {
    console.log(localStorage.getItem('token'))
    try {
      const response = await axios.put(`/posts/like/${postId}`,{}, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      setPosts(posts.map(post => post._id === postId ? { ...post, likes: response.data } : post));
      setLikedPosts([...likedPosts, postId]); // Add liked post to state
    } catch (error) {
      console.error("There was an error liking the post!", error);
    }
  };

  const handleComment = async (postId, text) => {
    try {
      const response = await axios.put(`/posts/comment/${postId}`, { text }, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      setPosts(posts.map(post => post._id === postId ? { ...post, comments: response.data } : post));
    } catch (error) {
      console.error("There was an error commenting on the post!", error);
    }
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="feed">
      {currentPosts.map(post => (
        <div className="post" key={post._id}>
          <h2>{post.text}</h2>
          <p>Posted by: {post.name}</p>
          <p>Date: {new Date(post.date).toLocaleString()}</p>

          <h3>Likes: {post.likes.length}</h3>
          <button
            className={likedPosts.includes(post._id) ? 'liked' : ''}
            onClick={() => handleLike(post._id)}
          >
            Like
          </button>
          {/* <ul>
            {post.likes.map(like => (
              <li key={like._id}>
                {users[like.user] ? users[like.user].name : 'Loading...'}
              </li>
            ))}
          </ul> */}

          <h3>Comments:</h3>
          <ul>
            {post.comments.map(comment => (
              <li key={comment._id}>
                <p>{comment.text}</p>
                <p>Comment by: {comment.name}</p>
                <p>Date: {new Date(comment.date).toLocaleString()}</p>
              </li>
            ))}
          </ul>

          <div className="comment-section">
            <input 
              type="text" 
              placeholder="Add a comment..." 
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleComment(post._id, e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Feed;
