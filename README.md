# MERN Stack Challenge Project

This project is a MERN (MongoDB, Express, React, Node.js) stack application, with the backend developed in **Spring Boot** and the frontend using **React with Vite**. Follow the instructions below to set up and run the project.

---

<h2>Project Setup and Execution</h2>
<br>
<h2>Frontend Setup (React with Vite)</h2>
<br>
1. Navigate to the `frontend` directory:
   <br>
   cd frontend
  <br>

2. Install the required dependencies:
  
   npm install
  

3. Start the development server:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000` (or another port specified in the terminal).

---

### **Backend Setup (Spring Boot)**

1. Open your Spring Boot IDE (e.g., **Spring Tool Suite (STS)** or **Eclipse**).
2. Import the backend project:
   - Click on **File > Import > Maven > Existing Maven Projects**.
   - Browse to the directory where the `pom.xml` file is located and import the project.
3. Configure the database:
   - Open `application.properties` (or `application.yml`) in the `src/main/resources` folder.
   - Update the following database properties with the required credentials:
     ```properties
     spring.datasource.url=jdbc:mysql://<your-database-host>:3306/<your-database-name>
     spring.datasource.username=<your-database-username>
     spring.datasource.password=<your-database-password>
     ```
4. Run the backend:
   - Right-click on the main application file (the one annotated with `@SpringBootApplication`) and select **Run As > Spring Boot App**.

---

### **Database Setup**

To ensure the database is correctly configured:

1. Export your database as a `.sql` file:
   - In MySQL Workbench, run the following command to export the database:
     ```bash
     mysqldump -u <username> -p <database_name> > project_database.sql
     ```
   - Share the `project_database.sql` file in your GitHub repository under a folder named `database`.

2. For the user to set up the database:
   - Import the `.sql` file into their local MySQL server:
     ```bash
     mysql -u <username> -p <database_name> < project_database.sql
     ```

---

## Notes

- Ensure you have the required tools installed:
  - Node.js (for the frontend)
  - JDK and Maven (for the backend)
  - MySQL (for the database)
- Use Postman or any API testing tool to test the backend endpoints.

If you encounter issues, feel free to contact me for support!

---

Let me know if you'd like me to refine or add more details to the instructions!
