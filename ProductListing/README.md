# 🛒 Product Listing Page with MERN Stack

A simple and modern product listing page built using **MongoDB**, **Express**, **React**, **Node.js**, and **Tailwind CSS**.  
The project fetches product data from a MongoDB Atlas database via an Express API and displays them in a clean, responsive grid layout.

---

## 📌 Features  

- Fetch products from MongoDB using an Express API  
- Clean and modern UI using **Tailwind CSS**  
- Responsive product grid (1-2-3-4 columns)
- Smooth image zoom effects on hover  
- Display product image, name, price, and description  
- Error handling for API calls  

---

## 📦 Tech Stack  

- **Frontend:** React, Tailwind CSS, Axios  
- **Backend:** Express.js, Node.js  
- **Database:** MongoDB Atlas  

---

## 📁 Project Structure  

```

/server
├── Controllers
│     └── products.controller.js
├── Models
│     └── product.model.js
├── Routes
│     └── products.routes.js
├── .env
└── server.js

/client
├── src
│     └── App.jsx
└── tailwind.config.js

README.md

````

---

## 🛠️ Getting Started  

### 📌 Prerequisites  

- Node.js  
- MongoDB Atlas account  
- npm / yarn  

---

## 🚀 Installation  

### 1️⃣ Backend  

```bash
cd server
npm install
````

* Add your MongoDB URI in a `.env` file:

```
MONGOURI=your_mongo_uri_here
```

* Start the backend server:

```bash
npm run start
```

---

### 2️⃣ Frontend

```bash
cd client
npm install
npm run dev
```

---

## 📊 Sample Data (Insert in MongoDB)

Go to your MongoDB Atlas cluster and insert this array of product documents into your `product` collection:

There is a `seed.js` file run that to insert the product array into MongoDB Atlas


## 📸 Final UI Preview

![Product Listing UI]()

---

## 📞 Contact

**Made by Gaurav Kadam**
[GitHub](https://github.com/gauravk2203)

---

## 📌 License

This project is open source and free to use for personal and educational purposes.

