
## MERN Stack Challenge

This project is a MERN stack application with a React frontend powered by Vite and a Node.js backend using MongoDB.

### **Frontend - React with Vite**

To run the frontend:

1. **Install dependencies:**

   Navigate to the `frontend` directory and run:

   ```bash
   npm install
   ```

2. **Start the development server:**

   After installing the dependencies, run the following command to start the Vite development server:

   ```bash
   npm run dev
   ```

3. **Access the frontend:**

   The app will be available at `http://localhost:5173/` by default.

---

### **Backend - Node.js with MongoDB**

To run the backend:

1. **Install dependencies:**

   Navigate to the backend directory and run:

   ```bash
   npm install
   ```

2. **Set up the MongoDB database:**

   - Ensure you have MongoDB installed locally or use a cloud-based solution like MongoDB Atlas.
   - If using MongoDB Atlas, ensure you have created a cluster and a database for the project and update your MongoDB URI in the backend code.

   Example MongoDB URI:
   ```bash
   mongodb://localhost:27017/your_database_name
   ```
   
3. **Start the server:**

   Once the dependencies are installed and the MongoDB URI is set up correctly, run the following command to start the server:

   ```bash
   node index.js
   ```

4. **Backend server information:**

   The backend server will be running on `http://localhost:3000/` by default.

---

### **Additional Notes**

- Make sure MongoDB is running locally or the connection string is correctly set to connect to a MongoDB Atlas database.
- The frontend will make API requests to the backend (which should be running on `http://localhost:3000/`).
- You can adjust the backend and frontend ports if needed by modifying configuration files in each directory.
