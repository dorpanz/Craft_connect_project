import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// Create context
const FavoritesContext = createContext();

// Custom hook
export const useFavorites = () => useContext(FavoritesContext);

// Provider
export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔹 Auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
                setFavorites([]);
            }
        });

        return () => unsubscribe();
    }, []);

    // 🔹 Fetch favorites
    useEffect(() => {
        const fetchFavorites = async () => {
            if (!userId) {
                setFavorites([]);
                setLoading(false);
                return;
            }

            try {
                const favDoc = await getDoc(doc(db, "favorites", userId));
                if (favDoc.exists()) {
                    setFavorites(favDoc.data().items || []);
                } else {
                    setFavorites([]);
                }
            } catch (error) {
                console.error("Failed to fetch favorites:", error);
            }

            setLoading(false);
        };

        fetchFavorites();
    }, [userId]);

    // 🔹 Sync favorites
    const syncFavoritesToFirestore = async (updatedFavorites) => {
        if (!userId) return;
        try {
            await setDoc(doc(db, "favorites", userId), {
                items: updatedFavorites,
            });
        } catch (error) {
            console.error("Failed to sync favorites:", error);
        }
    };

    // 🔹 Toggle favorite
    const toggleFavorite = (item) => {
        setFavorites((prev) => {
            const exists = prev.find((fav) => fav.id === item.id);
            const updatedFavorites = exists
                ? prev.filter((fav) => fav.id !== item.id)
                : [...prev, item];

            syncFavoritesToFirestore(updatedFavorites);
            return updatedFavorites;
        });
    };

    // 🔹 Clear all favorites (optional)
    const clearFavorites = async () => {
        setFavorites([]);
        if (userId) {
            try {
                await updateDoc(doc(db, "favorites", userId), { items: [] });
            } catch (error) {
                console.error("Failed to clear favorites:", error);
            }
        }
    };

    return (
        <FavoritesContext.Provider
            value={{ favorites, toggleFavorite, clearFavorites, loading }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};
