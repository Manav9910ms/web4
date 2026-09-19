# e-CyberCafe
Online cyber-cafe platform for service booking, digital assistance, printing and payments.

## Architecture
Customer browser → Firebase Authentication → Next.js Route Handlers → Firebase Admin/Firestore.
Payment: browser → server-created Razorpay Order → Razorpay Checkout → server-side signature + captured-status verification → Firestore.
Asynchronous payment reconciliation: Razorpay webhook → HMAC verification → Firestore.

## Customer features
Public service catalog, email/password + Google sign-in, customer profile, service booking, server-calculated pricing, Razorpay checkout, verified payment, order history and status tracking.

## Admin features
Admin role, order queue, order status workflow and customer/order details.

## Firestore model
users/{uid}: uid, name, email, phone, role, createdAt, updatedAt
orders/{orderId}: userId, serviceId, serviceName, amount, quantity, unit, notes, scheduledDate, customerName, customerPhone, status, razorpayOrderId, razorpayPaymentId, createdAt, updatedAt

## Setup
1. Create a Firebase project and enable Email/Password and Google Authentication.
2. Create Firestore.
3. Add a Firebase web app and configure NEXT_PUBLIC_FIREBASE_*.
4. Create a Firebase Admin service account and configure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY.
5. Create Razorpay test-mode keys and configure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.
6. Configure a Razorpay webhook for /api/payments/webhook and set RAZORPAY_WEBHOOK_SECRET.
7. Put your admin email in ADMIN_EMAILS before creating that account.
8. npm install && npm run dev

Never expose RAZORPAY_KEY_SECRET, FIREBASE_PRIVATE_KEY or webhook secret with NEXT_PUBLIC_.
