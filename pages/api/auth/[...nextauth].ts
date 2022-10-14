import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// CANNOT CONNECT
export default NextAuth({
    // https://next-auth.js.org/providers
    providers: [
        GoogleProvider({
            id: "google-auth",
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    // adapter: FirestoreAdapter({
    //     apiKey: "AIzaSyBNaS097KHnzL3aWCzPB4XLz7FJAFY81Ow",
    //     authDomain: "open-cem.firebaseapp.com",
    //     projectId: "open-cem",
    //     storageBucket: "open-cem.appspot.com",
    //     messagingSenderId: "345071906471",
    //     appId: "1:345071906471:web:7149ce691041719952f582",
    //     measurementId: "G-5Y9W4X3SLN",
    //     emulator: {},
    // }),
});