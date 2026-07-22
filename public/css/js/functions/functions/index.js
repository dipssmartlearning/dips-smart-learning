{
  "name": "functions",
  "description": "Cloud Functions for Dips Smart Learning",
  "private": true,
  "main": "index.js",
  "engines": {
    "node": "20"
  },
  "scripts": {
    "serve": "firebase emulators:start --only functions",
    "shell": "firebase functions:shell",
    "start": "npm run shell",
    "deploy": "firebase deploy --only functions",
    "logs": "firebase functions:log"
  },
  "dependencies": {
    "firebase-admin": "^13.0.2",
    "firebase-functions": "^6.0.1",
    "cors": "^2.8.5",
    "razorpay": "^2.9.4"
  }
}
