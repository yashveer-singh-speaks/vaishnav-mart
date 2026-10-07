# Firebase Setup & Production Migration Guide

Vaishnava Mart is architected with a repository abstraction layer (`ProductRepository`, `OrderRepository`, `UserRepository`, `CartRepository`, `PageRepository`, `CategoryRepository`, `SettingsRepository`). 

Switching between `mock` and `firebase` modes requires **no UI redesign** and **zero code changes** in storefront components.

---

## 1. Firebase Project Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a project (e.g. `vaishnava-mart-prod`).
2. **Cloud Firestore:**
   - Create a Cloud Firestore database in production mode.
   - Choose a region close to your primary customers (e.g., `asia-south1` - Mumbai).
3. **Authentication:**
   - Enable the **Google** sign-in provider in Authentication > Sign-in method.
   - Add your domains (`vaishnavamart.com` and `localhost`) to the Authorized Domains list.

---

## 2. Deploying Security Rules

Deploy the included `firestore.rules` and `firestore.indexes.json` using the Firebase CLI:

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to your Google account
firebase login

# Set your active project
firebase use vaishnava-mart-prod

# Deploy Firestore rules and indexes
firebase deploy --only firestore
```

The rules guarantee:
- Public visitors can only view published active products and pages.
- Authenticated customers can only view and mutate their own profile, cart, and orders.
- Only accounts with the custom claim `role: 'super_admin'` can write to products, pages, orders, settings, and logs.

---

## 3. Setting the Admin Custom Claim

To grant Super Admin privileges to the owner's Google account:

```javascript
// Run via Firebase Admin SDK script (e.g., in a Node.js admin tool)
const admin = require('firebase-admin');
admin.initializeApp();

async function setSuperAdmin(uid) {
  await admin.auth().setCustomUserClaims(uid, {
    role: 'super_admin'
  });
  console.log(`User ${uid} successfully granted super_admin role.`);
}

setSuperAdmin('FIREBASE_UID_OF_OWNER');
```

---

## 4. Switching the Application to Firebase Mode

Update your `.env.local` or hosting provider environment variables:

```env
# Switch mode from mock to firebase
NEXT_PUBLIC_DATA_MODE=firebase

# Client Firebase SDK credentials
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=vaishnava-mart-prod.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=vaishnava-mart-prod
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=vaishnava-mart-prod.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:...

# Server Firebase Admin SDK (Keep secret, do NOT expose in client code)
FIREBASE_ADMIN_PROJECT_ID=vaishnava-mart-prod
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xyz@vaishnava-mart-prod.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBg..."
```

Restart your Next.js server (`npm run build && npm run start`). The application will seamlessly connect to live Firestore.
