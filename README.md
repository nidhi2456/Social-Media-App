# Project Name

Brief description of your project.

## Functionalities

### Authentication

- Users can register and log in securely.
- JSON Web Token (JWT) is used for authentication.

### Login and Signup

- New users can sign up with a username, email, and password.
- Existing users can log in using their credentials.

### Profile Creation

- Users can create their profiles with additional information (e.g., profile picture, bio).

### Post Creation

- Authenticated users can create posts.
- Posts include text content and optional media (images, videos).

### Real-Time Chatting

- Users can engage in real-time chat with other users.
- Socket.io is used for real-time communication.

### Real-Time Liking and Commenting

- Users can like and comment on posts in real-time.
- Changes are immediately reflected across all connected clients.

## User Guidelines

Follow these steps to start the MERN stack application:

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed locally or MongoDB Atlas account for cloud database.

### Installation

#### Clone the Repository

git clone https://github.com/nidhi2456/social-media-app.git
### Install Dependencies
# Install server dependencies
npm install

# Install client dependencies
cd frontend
npm install
cd ..


# Start server and client concurrently
npm start -> for run the client side application
nodemon app.js -> for run the server

Access the Application
Open your web browser and go to http://localhost:3000 to access the application.

Register and Log In
Click on "Sign Up" to create a new account.
After registration, log in with your credentials.
## Explore Features
Create your profile with profile picture and bio information.
Create posts with text and optional media attachments.
Engage in real-time chat with other users.
Like and comment on posts, and see updates in real-time.

### Technologies Used
Frontend: React.js, HTML/CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB (Mongoose ODM)
Real-Time Communication: Socket.io
Authentication: JSON Web Tokens (JWT)
