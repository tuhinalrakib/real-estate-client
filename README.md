# 🏡 Real Estate Pro

Welcome to **Real Estate Pro** — a modern full-stack platform for buying, selling, and managing properties, built with the **MERN Stack**.

🔗 **Live Site**: [https://real-estate-316cb.web.app/]

🛠️ **Admin Login**  
- **Username**: admin77@gmail.com  
- **Password**: 12345As@  
---

# Technologies
<p>
  <img src="https://skillicons.dev/icons?i=html,css,js,react,tailwind" alt="tech icons" />
  <img src="https://daisyui.com/images/daisyui-logo/daisyui-logomark.svg" alt="DaisyUI" width="28" />
</p>

---

## 🚀 Features

✅ **1. Role-Based Authentication**
- Three user roles: **User**, **Agent**, and **Admin**
- Secure login/signup using **Firebase Authentication**

✅ **2. Property Listings**
- Users can browse and explore all available properties
- Agents can add, update, and manage their listings

✅ **3. Make Offers**
- Users can make offers on properties
- Offer status changes dynamically (pending → accepted/rejected → bought)

✅ **4. Integrated Stripe Payments**
- Once an offer is accepted, the user can pay securely via Stripe
- Payment status is updated in real-time, and transaction ID is stored

✅ **5. Dashboard for All Roles**
- User Dashboard: My Offers, Bought Properties
- Agent Dashboard: My Listings, Offer Requests, Sold Properties
- Admin Dashboard: Manage Users, Properties, and All Transactions

✅ **6. Review System**
- Users can leave reviews on properties they bought
- Reviews are visible on the property details page

✅ **7. Responsive & Mobile-Friendly UI**
- Built with **Tailwind CSS** and **DaisyUI** for modern responsive design

✅ **8. JWT Protected API**
- Backend routes secured with **JWT verification** and **role-based access**

✅ **9. Property Filtering**
- Filter properties by location, price, or category

✅ **10. Image Hosting & Upload**
- Images are uploaded and stored via **imgBB** or another third-party service

---

# Getting Started (Run Locally)

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, DaisyUI, Firebase Auth
- **Backend**: Node.js, Express.js, MongoDB
- **Auth**: Firebase + JWT
- **Payment**: Stripe Integration
- **Hosting**: Firebase Hosting & Render (backend)

---

## Prerequisites
- Node.js (>=14) and npm/yarn

## Setup
```bash
# clone
git clone https://github.com/tuhinalrakib/real-estate-client.git
cd your-repo

# install
npm install
# or
yarn

# run (React Vite/CRA)
npm run dev        # Vite/Next: npm run dev
# or (CRA)
npm start
