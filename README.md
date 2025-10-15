# 🛍️ Amazon Clone (AI Product Recommendation + Full E-Commerce)

> A powerful **full-stack eCommerce web application** inspired by Amazon — featuring **AI-powered product recommendations**, **secure payment integration**, and **real-time inventory management**.  
> Built with the **MERN stack** and modern technologies like **TensorFlow.js**, **TailwindCSS**, and **JWT Authentication**.

---

## 🚀 Features

🛒 **Full E-Commerce System** – Products, carts, orders, and payments  
🧠 **AI Recommendations** – Suggests related products using TensorFlow.js  
💳 **Secure Checkout** – Integrated payment gateway (Stripe / PayPal ready)  
🔐 **JWT Authentication** – Login, register, and protected routes  
📦 **Admin Dashboard** – Manage users, products, and orders easily  
💬 **Real-Time Updates** – Inventory and cart sync with WebSocket  
⚙️ **Scalable REST API** – Clean and modular Node.js architecture  
📱 **Responsive UI** – Beautiful shopping experience on all devices  

---

## 🧠 Tech Stack

| Category | Technologies |
|-----------|--------------|
| **Frontend** | React.js, Vite, TailwindCSS, ShadCN UI |
| **Backend** | Node.js, Express.js, REST API, JWT, Bcrypt |
| **Database** | MongoDB, Mongoose |
| **AI / ML** | TensorFlow.js (Product Recommendation Engine) |
| **Realtime** | WebSocket (Socket.io) |
| **Deployment** | Vercel (Frontend), Render / Railway (Backend) |
| **Payments** | Stripe / PayPal API |

---

## 🧩 Architecture Overview

```mermaid
graph TD;
  A[User 👤] --> B[React Frontend 🎨];
  B --> C[REST API 🌐];
  C --> D[Node.js Backend ⚙️];
  D --> E[MongoDB 💾];
  D --> F[TensorFlow.js AI Engine 🤖];
  F --> G[Recommendation System 🧠];
  D --> H[Payment Gateway 💳];
  B --> I[WebSocket 🔄];
