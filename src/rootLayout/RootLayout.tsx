import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Tables } from "../utils/database";
import { useEffect, useState } from "react";

const RootLayout = () => {
    const [heroProps, setHeroProps] = useState<Tables<'recipes'> | null>(null);
    const location = useLocation();

    useEffect(() => { 
        if (location.pathname === "/") { 
            setHeroProps(null);
        }
      }, [location]); /* reset to matching banner img */

    return ( 
        <>
        <Header heroProps={heroProps}/>
        <main>
            <Outlet context={{setHeroProps}}/>
        </main>
        <Footer />
        </>
    );
}

export default RootLayout;