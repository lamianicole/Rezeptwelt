import { Link } from "react-router-dom";
import HeroA from "../heroA/HeroA";
import { Tables } from "../../utils/database";

interface HeaderProps { heroProps?: Tables<'recipes'> | null; }

const Header:React.FC<HeaderProps> = ({heroProps}) => {
    return ( 
        <>
        <header className="bg-yellow-300 pt-4">
            <div className="bg-white flex items-end justify-between py-3 pl-28 pr-10">
                <Link to="/">
                    <img src="/RezeptweltLogo.svg" alt="Logo" />
                </Link>
                <nav className="flex gap-4 font-semibold">
                    <Link to={'/'}>Home</Link>
                    <Link to={'/recipes'}>Rezepte</Link>
                    <Link to={'/aboutUs'}>Über uns</Link>
                    <Link className="pl-16" to={'/login'}>Login</Link>
                </nav>
            </div>   
        </header>
        <HeroA heroProps={heroProps}/>
        </>
    );
}

export default Header;