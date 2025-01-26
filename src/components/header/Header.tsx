import { Link, useNavigate } from "react-router-dom";
import HeroA from "../heroA/HeroA";
import { Tables } from "../../utils/database";
import { useUserContext } from "../../UserContext";
import { supabase } from "../../utils/setupSupabase";

interface HeaderProps { heroProps?: Tables<'recipes'> | null; }

const Header:React.FC<HeaderProps> = ({heroProps}) => {
    const {user, setUser} = useUserContext();
    const navigate = useNavigate();

    const handleLogout = async() => {
        await supabase.auth.signOut();
        setUser(null);
        console.log("Lougout erfolgreich");
        navigate('/');
    }

    return ( 
        <>
        <header className="bg-yellow-300 pt-4">
            <div className="bg-white flex items-end justify-between py-3 pl-28 pr-10">
                <Link to="/">
                    <img src="/RezeptweltLogo.svg" alt="Logo" />
                </Link>
                <nav className="flex gap-4 font-semibold">
                <div className="flex gap-4">
                    <Link to={'/'}>Home</Link>
                    <Link to={'/recipes'}>Rezepte</Link>
                    <Link to={'/aboutUs'}>Über uns</Link>
                </div>
                <div className="flex gap-4 pl-16">
                    {user? (
                        <>
                        <Link to={'/dashboard'}>Dashboard</Link>
                        <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                    <Link to={'/signup'}>Registrieren</Link>
                    <Link to={'/login'}>Login</Link>
                        </>
                    )}
                </div>
                </nav>
            </div>   
        </header>
        <HeroA heroProps={heroProps}/>
        </>
    );
}

export default Header;