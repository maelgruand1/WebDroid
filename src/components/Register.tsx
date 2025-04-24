// components/RequireAuth.tsx
import React, { useState, useEffect, JSX } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from './Classes/firebase'; // Instance de l'auth Firebase
import Login from './Login';
import { User } from './Classes/User';

type RequireAuthProps = {
  children: (user: User) => JSX.Element;
};

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const { doc, getDoc, getFirestore, collection } = await import('firebase/firestore');
        const db = getFirestore();
        const docRef = doc(collection(db, 'users'), firebaseUser.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setUser(User.fromData(snap.id, snap.data()));
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (!user) return <Login onLoginSuccess={setUser} />;

  return children(user); // Passe l'utilisateur à l'enfant
};

export default RequireAuth;
