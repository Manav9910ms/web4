import{getApp,getApps,initializeApp}from"firebase/app";import{getAuth}from"firebase/auth";

const config={
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export function isFirebaseConfigured(){
  return Object.values(config).every(Boolean);
}

export function getFirebaseAuth(){
  if(!isFirebaseConfigured()) throw new Error("Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* variables in Vercel.");
  const app=getApps().length?getApp():initializeApp(config);
  return getAuth(app);
}