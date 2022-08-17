import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, googleAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: 'AIzaSyDNiGQeugewDSdCOLsGEyreuXgpFkBMGGI',
  authDomain: 'crwn-clothing-db-bed61.firebaseapp.com',
  projectId: 'crwn-clothing-db-bed61',
  storageBucket: 'crwn-clothing-db-bed61.appspot.com',
  messagingSenderId: '692173976703',
  appId: '1:692173976703:web:d2fdcffb9a7124c8b13b4a',
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName, email, createdAt
            })
        } catch(error)  {
            console.log("errror creating the user", error.message)
        }
    }


    return userDocRef
}

