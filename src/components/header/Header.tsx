import { Link } from "react-router-dom";

const Header = () => {
    return ( 
        <>
        <header className="bg-yellow-300 pt-4">
            <div className="bg-white flex items-end justify-between py-3">
                <img src="/images/RezeptweltLogo.svg" alt="Logo" />
                <nav className="flex gap-4">
                    <Link to={'index'}>Home</Link>
                    <Link to={'recipes'}>Rezepte</Link>
                    <Link to={'aboutUs'}>Über uns</Link>
                    <Link className="pl-16" to={'login'}>Login</Link>
                </nav>
            </div>
            
        </header>
        </>
    );
}

export default Header;