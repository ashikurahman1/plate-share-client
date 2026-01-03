# PlateShare — Community Food Sharing Platform

### Desktop Preview

| Home Page | Admin Dashboard |
| :---: | :---: |
| ![Home Page](src/assets/Screenshots/home_page.png) | ![Admin Dashboard](src/assets/Screenshots/admin_dash.png) |

**Live Site:**
[https://plate-share-v1.vercel.app/](https://plate-share-v1.vercel.app/)  
**Client Repo:**
[https://github.com/ashikurahman1/plate-share-client](https://github.com/ashikurahman1/plate-share-client)  
**Server Repo:**
[https://github.com/ashikurahman1/plate-share-server](https://github.com/ashikurahman1/plate-share-server)

---

## About the Project

**PlateShare** is a **community-driven food sharing platform** designed to
reduce food waste and help those in need.  
Users can share surplus food, browse available items, and request donations
directly from the platform.  
Built with the **MERN Stack**, it features secure authentication, CRUD
operations, and a modern, responsive UI with smooth animations.

---

## Key Features

- **Food Donation System:** Logged-in users can add, manage, update, and delete
  their food donations.
- **Browse & Request Foods:** Anyone can explore available foods and request
  them easily.
- **Food Request Management:** Donors can accept or reject food requests in
  real-time.
- **Firebase Authentication:** Email/password and Google login with protected
  private routes.
- **MongoDB Integration:** All food and request data securely stored in MongoDB
  Atlas.
- **Responsive & Animated UI:** Optimized layout for mobile, tablet, and desktop
  with Framer Motion animations.

---

## Core Functionalities

### Home Page

- Hero section with a clear call-to-action (“View All Foods”).
- Dynamic **Featured Foods** section showing top 6 foods with the highest
  servings.
- Two static sections: **“How It Works”** and **“Our Mission”** for better user
  engagement.
- Smooth entry animations using **Framer Motion / AOS**.

### Authentication (Firebase)

- User registration with name, photo URL, email, and strong password validation.
- Google Sign-In integration.
- Real-time success/error toasts for all auth actions.
- Redirects users to the intended route after login.

### Food Management (CRUD)

- **Add Food (Private):** Add new food info with image (via imgbb), quantity,
  expiry date, and pickup location.
- **Available Foods (Public):** View all foods marked as “Available.”
- **Food Details (Private):** Full food info + option to request food.
- **Manage My Foods (Private):** Update or delete foods with confirmation
  prompts.

### Food Request System

- Users can submit a request with location, reason, and contact info.
- Donors can **accept** or **reject** requests directly from the food details
  page.
- Auto-updates request and food status (e.g., to “Donated” when accepted).

### Additional Features

- Protected routes using Firebase JWT or middleware.
- Elegant modals and alerts with **SweetAlert2**.
- **404 Page** with creative design and a “Back to Home” button.

## Dependencies

**Frontend Dependencies:**

- @tailwindcss/vite: ^4.1.17
- aos: ^2.3.4
- axios: ^1.13.2
- daisyui: ^5.4.7
- firebase: ^12.5.0
- react: ^19.1.1
- react-dom: ^19.1.1
- react-hook-form: ^7.66.0
- react-hot-toast: ^2.6.0
- react-icons: ^5.5.0
- react-router: ^7.9.5
- sweetalert2: ^11.26.3
- tailwindcss: ^4.1.17

**Frontend Dev Dependencies:**

- @eslint/js: ^9.36.0
- @types/react: ^19.1.16
- @types/react-dom: ^19.1.9
- @vitejs/plugin-react: ^5.0.4
- eslint: ^9.36.0
- eslint-plugin-react-hooks: ^5.2.0
- eslint-plugin-react-refresh: ^0.4.22
- globals: ^16.4.0
- vite: ^7.1.7

**Backend Dependencies:**

- express: ^4.x
- mongoose: ^7.x
- cors: ^2.x
- dotenv: ^16.x
- nodemon (for development): ^2.x

---

## Technologies Used

| Category           | Tools & Libraries                                                                       |
| ------------------ | --------------------------------------------------------------------------------------- |
| **Frontend**       | React.js, React Router DOM, TanStack Query, Axios, React Hook Form, Framer Motion / AOS |
| **Backend**        | Node.js, Express.js                                                                     |
| **Database**       | MongoDB Atlas                                                                           |
| **Authentication** | Firebase Auth (Email/Password, Google Sign-In)                                          |
| **Hosting**        | Netlify / Surge (Client), Vercel (Server)                                               |
| **UI & Styling**   | Tailwind CSS, DaisyUI, SweetAlert2                                                      |
| **Image Hosting**  | imgbb API                                                                               |

---

## Run Project Locally

Follow these steps to run the project on your local machine:

### **Server Setup**

1. Clone the server repo:

```bash
-- Server
git clone https://github.com/ashikurahman1/plate-share-server.git
cd plate-share-server
npm install
Create a .env file and add: MONGO_URI=your_mongodb_connection_string
                            FIREBASE_API_KEY=your_firebase_api_key
npm run dev

-- Client
git clone https://github.com/ashikurahman1/plate-share-client.git
cd plate-share-client
npm install
Create a .env file (if needed) for Firebase config.
npm run dev
```
