# Notes App

A full-stack Notes app where users can sign up, log in, and create, edit, and delete notes. The app features authentication and a clean UI for managing notes.

## Features

- User authentication (Sign up, Login, Logout)
- Create, edit, and delete notes
- Responsive and user-friendly interface

## Tech Stack

- **Frontend**: React.js, React Router, React Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT-based Authentication, Cookies for storing tokens

## Setup

### Prerequisites

- Node.js
- MongoDB
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/thaibapratik/note-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd notes-app
   ```

3. Install dependencies for both the frontend and backend:

    - **Backend**:
      Navigate to the `backend` directory (if it's separated) and run:

      ```bash
      npm install
      ```

    - **Frontend**:
      Navigate to the `frontend` directory (if it's separated) and run:

      ```bash
      npm install
      ```

4. Create an `.env` file in the backend root directory and add the necessary environment variables (e.g., MongoDB URI, JWT Secret Key):

   ```env
   PORT=3000
   MONGO_URI=your-mongodb-uri
   SECRET_KEY=your-secret-key
   NODE_ENV=development (or production)
   ```

5. Run the project:

    - **Backend**: Run the backend server:

      ```bash
      npm run dev
      ```

    - **Frontend**: Run the frontend server:

      ```bash
      npm start
      ```

### Running the Application Locally

1. Ensure MongoDB is running (locally or via a cloud service like MongoDB Atlas).
2. Start both the frontend and backend servers.
3. Open `http://localhost:3000` in your browser to view the app.

## Deployment

View the deployed website by clicking [here]().
