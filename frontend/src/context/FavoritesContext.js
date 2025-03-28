import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (item) => {
        setFavorites((prevFavorites) => {
            const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === item.id);
            if (isAlreadyFavorite) {
                return prevFavorites.filter((fav) => fav.id !== item.id);
            }
            return [...prevFavorites, item];
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
