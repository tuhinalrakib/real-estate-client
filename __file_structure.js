/**
 * client/
├── public/
│   └── index.html
├── src/
│   ├── assets/                  # images, logos, etc.
│   ├── components/              # reusable UI components (e.g., Navbar, Footer)
│   ├── layout/                  # main layout files
│   ├── pages/                   # route-based pages
│   │   ├── Home/
│   │   ├── AllProperties/
│   │   ├── PropertyDetails/
│   │   ├── Login/
│   │   ├── Register/
│   │   └── Dashboard/
│   │       ├── User/
│   │       ├── Agent/
│   │       └── Admin/
│   ├── routes/
│   │   └── PrivateRoute.jsx     # route guards by role
│   ├── context/
│   │   └── AuthProvider.jsx     # Firebase + Auth context
│   ├── hooks/                   # custom hooks (e.g., useUser, useProperties)
│   ├── services/                # API calls (axios functions)
│   ├── firebase/                # Firebase config
│   ├── App.jsx
│   ├── main.jsx
│   └── tailwind.config.js
├── .env
├── package.json
└── vite.config.js
 * 
 */

// Fore Pages
/**
 * pages/
├── Home/
│   ├── Banner.jsx
│   ├── Advertisement.jsx
│   ├── LatestReviews.jsx
│   └── ExtraSection1.jsx
│   └── ExtraSection2.jsx
├── Dashboard/
│   ├── User/
│   │   ├── Profile.jsx
│   │   ├── Wishlist.jsx
│   │   ├── BoughtProperties.jsx
│   │   └── MyReviews.jsx
│   ├── Agent/
│   │   ├── Profile.jsx
│   │   ├── AddProperty.jsx
│   │   ├── MyProperties.jsx
│   │   ├── UpdateProperty.jsx
│   │   ├── SoldProperties.jsx
│   │   └── RequestedOffers.jsx
│   └── Admin/
│       ├── Profile.jsx
│       ├── ManageProperties.jsx
│       ├── ManageUsers.jsx
│       └── ManageReviews.jsx

 */