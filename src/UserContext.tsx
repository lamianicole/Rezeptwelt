import { User } from "@supabase/supabase-js";
import { createContext, useContext, useState } from "react";

interface UserContext {
    user: User | null;
// setUser kann auch einfacher gehyped werden,
// (user: User | null) => void
// diese Variante ist aber präziser
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContext>(null!);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);