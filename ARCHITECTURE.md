# e-CyberCafe Architecture

## 1. Product layers

### Public website
- Landing page
- Service catalog
- Service detail/booking entry points
- Business information and trust signals

### Customer application
- Firebase Authentication
- Customer profile
- Service selection and quantity
- Appointment / preferred date-time
- Notes
- Razorpay checkout
- Payment result
- Order history
- Order status tracking

### Staff / admin
- Admin authentication
- Order queue
- Customer details
- Payment state
- Fulfillment status controls

## 2. Runtime architecture

```
Browser
  │
  ├── Firebase Auth (client SDK)
  │       └── ID token
  │
  └── Next.js 16 App Router
          │
          ├── Route Handlers
          │     ├── Profile API
          │     ├── Orders API
          │     ├── Payment Order API
          │     ├── Payment Verify API
          │     ├── Razorpay Webhook
          │     └── Admin Orders API
          │
          ├── Firebase Admin SDK
          │     └── Firestore
          │
          └── Razorpay Node SDK
                └── Orders / Payments
```

## 3. Authentication and authorization

Firebase Authentication is the identity provider.

The browser receives a Firebase ID token after sign-in. Protected Next.js routes require that token in the Authorization header.

The server verifies the token with Firebase Admin. Customer requests are scoped to `uid`. Admin requests additionally require the Firestore `users/{uid}.role === "admin"`.

The optional `ADMIN_EMAILS` environment variable bootstraps a known admin email into the admin role when the profile is first created.

## 4. Database model

### users/{uid}

```
uid
name
email
phone
role: customer | admin
createdAt
updatedAt
```

### orders/{orderId}

```
userId
serviceId
serviceName
amount
quantity
unit
notes
scheduledDate
customerName
customerPhone
status
razorpayOrderId
razorpayPaymentId
createdAt
updatedAt
```

Recommended future collections:

```
services/{serviceId}
staff/{uid}
auditLogs/{logId}
notifications/{notificationId}
refunds/{refundId}
```

## 5. Payment architecture

Pricing is never trusted from the browser.

The booking client sends only the service ID, requested quantity and customer information. The server resolves the service from the trusted service catalog and calculates the amount.

The server creates a Razorpay Order using the amount in paise and stores the Razorpay order ID against the Firestore order.

The browser opens Razorpay Standard Checkout with the public Key ID and server-created Order ID.

After checkout, the browser sends Razorpay's payment ID, order ID and signature to the verification route.

The server:
1. Recomputes the HMAC SHA-256 signature.
2. Confirms the Firestore order belongs to the authenticated user.
3. Confirms the Razorpay order ID matches the stored order.
4. Fetches the payment from Razorpay.
5. Requires the payment status to be captured.
6. Marks the local order as paid.

Razorpay `order.paid` webhooks are also accepted through an HMAC-protected endpoint for asynchronous reconciliation.

## 6. Security model

- Razorpay secret, webhook secret and Firebase private key are server-only.
- No server secret uses a `NEXT_PUBLIC_` prefix.
- Firestore client rules deny direct reads/writes. The server is the controlled data-access layer.
- Every protected API verifies the Firebase ID token.
- Admin APIs verify the user's Firestore role.
- Service prices are resolved server-side.
- Payment signatures are verified server-side.
- Webhook signatures are verified before database changes.
- User orders are scoped by authenticated UID.
- Input lengths and quantities are bounded at the API boundary.

## 7. Status lifecycle

```
pending_payment
      │
      ▼
    paid
      │
      ▼
 in_progress
      │
      ▼
    ready
      │
      ▼
  completed

pending_payment ──► cancelled
paid ─────────────► cancelled
in_progress ──────► cancelled
```

## 8. Next production modules

The current foundation is ready for:
- Firebase Storage document uploads with controlled access
- Printing/scan file handling
- Email/SMS/WhatsApp notifications
- Service availability and time slots
- Online queue tokens
- Refund and cancellation workflows
- Revenue dashboard
- Daily settlement reports
- Staff accounts and permissions
- Audit logging
- Rate limiting
- App Check
- Automated tests and GitHub Actions
