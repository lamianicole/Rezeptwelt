import { Link } from "react-router-dom";
import HeroA from "../heroA/HeroA";

const Header = () => {
    return ( 
        <>
        <header className="bg-yellow-300 pt-4">
            <div className="bg-white flex items-end justify-between py-3 pl-28 pr-10">
                <img src="/RezeptweltLogo.svg" alt="Logo" />
                <nav className="flex gap-4 font-bold">
                    <Link to={'/'}>Home</Link>
                    <Link to={'recipes'}>Rezepte</Link>
                    <Link to={'aboutUs'}>Über uns</Link>
                    <Link className="pl-16" to={'login'}>Login</Link>
                </nav>
            </div>   
        </header>
        <HeroA/>
        </>
    );
}

export default Header;