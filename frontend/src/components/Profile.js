import React, { useState, useEffect } from 'react';
import axios from '../axios'; // Adjust the path as necessary
import '../css/profile.css'; // Import your CSS file for styling

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/users/profile', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get('/posts', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchProfile();
    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/posts', { text: newPost }, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      setPosts([response.data, ...posts]); // Add the new post to the list of posts
      setNewPost('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-info">
        <h2>{profile.username}</h2>
        <p>Email: {profile.email}</p>
        <p>Bio: {profile.bio}</p>
        <p>Time: {profile.joined}</p>
        {/* Add more profile fields as needed */}
      </div>
      <div className="post-form-container">
        <h3>Create a Post</h3>
        <form onSubmit={handlePostSubmit}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            rows="4"
            required
          />
          <button type="submit">Post</button>
        </form>
      </div>
      <div className="posts-list">
        <h3>Your Posts</h3>
        {posts.map((post) => (
          <div key={post._id} className="post">
            <p>{post.text}</p>
            <small>Posted by {post.name}</small>
            {/* Add more post details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
