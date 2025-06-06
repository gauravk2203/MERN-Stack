# 🛡️ Role-Based Access Control (RBAC) - Comment Section

A simple MERN stack implementation of **Role-Based Access Control (RBAC)** for a comment section feature. This task demonstrates how to manage permissions based on user roles like **Admin** and **User**.

---

## 📚 Features

- **Users** can:
  - Add comments
  - Read comments

- **Admins** can:
  - Add comments
  - Read comments
  - Delete comments

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)

---

## 🗂️ Project Structure

```

/backend
├── controllers/
├── middleware/
├── models/
├── routes/
├── server.js
/frontend
├── components/
├── pages/
├── App.js
├── index.js
.env
README.md
package.json

````

---

## 🔐 RBAC Logic

Role permissions are controlled using middleware in the backend.  
JWT token contains the role, and authorization middleware verifies whether a user is allowed to perform a specific action.

- `authMiddleware.js`
  - Verifies JWT and extracts user role.
  - Blocks unauthorized actions.

**Example:**

```javascript
const permission = (allowedRoles) => {
  return (req, res, next) => {
    const role = req.user.role;

    if (!role) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Forbidden: insufficient permissions" });
    }

    next();
  };
};
````

---

## 🚀 How to Run the Project

### 1️⃣ Clone the repository:

```bash
git clone https://github.com/your-username/rbac-comment-section.git
cd rbac-comment-section
```

### 2️⃣ Install dependencies:

```bash
npm install
cd frontend
npm install
```

### 3️⃣ Set up `.env` file in the root directory:

```
PORT=5000
MONGODB=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Start the backend and frontend:

```bash
# In one terminal
npm run server

# In another terminal (inside frontend folder)
npm start
```

---

## 📸 Demo

> \[Include a few screenshots or screen recordings if possible]

---

## 📖 Learning Outcome

* Implemented **Role-Based Access Control** in a MERN stack app.
* Applied **JWT Authentication**.
* Created **Authorization Middleware**.
* Built a functional **comment section** respecting user roles.

---

## 📌 Future Improvements

* Add role management UI.
* Add comment editing functionality for Admin.
* Integrate notification for unauthorized actions.
* Add user registration and role assignment via UI.

---

## 📝 Author

**Gaurav Kadam**
[GitHub](https://github.com/gauravk2203)

---

## 🪪 License

This project is licensed under the [MIT License](LICENSE).