/**
 * /client
├── public
│   └── index.html
├── src
│   ├── assets               # Static images, logos, icons
│   ├── components           # Shared/reusable UI components (Button, Card, Modal, etc.)
│   ├── layouts              # Layouts for public and dashboard views
│   │   ├── MainLayout.jsx
│   │   └── DashboardLayout.jsx
│   ├── pages                # All page components
│   │   ├── Home
│   │   ├── Auth
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Properties
│   │   │   ├── AllProperties.jsx
│   │   │   └── PropertyDetails.jsx
│   │   ├── Dashboard
│   │   │   ├── User
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── Wishlist.jsx
│   │   │   │   ├── BoughtProperties.jsx
│   │   │   │   └── MyReviews.jsx
│   │   │   ├── Agent
│   │   │   │   ├── AddProperty.jsx
│   │   │   │   ├── MyProperties.jsx
│   │   │   │   ├── SoldProperties.jsx
│   │   │   │   └── Offers.jsx
│   │   │   └── Admin
│   │   │       ├── ManageUsers.jsx
│   │   │       ├── ManageProperties.jsx
│   │   │       └── ManageReviews.jsx
│   │   └── NotFound.jsx
│   ├── routes               # React Router DOM routes
│   │   └── AppRoutes.jsx
│   ├── api                  # React Query API functions
│   │   ├── properties.js
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── reviews.js
│   ├── context              # React context (Auth, Role, etc.)
│   │   └── AuthContext.jsx
│   ├── hooks                # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useUserRole.js
│   │   └── useWishlist.js
│   ├── firebase             # Firebase configuration and helpers
│   │   └── firebase.config.js
│   ├── utils                # Helper functions and validators
│   │   ├── priceValidator.js
│   │   └── roleChecker.js
│   ├── App.jsx
│   └── main.jsx
├── .env
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── package.json

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