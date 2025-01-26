import { useRef } from "react";
import { supabase } from "../../utils/setupSupabase";
import { useUserContext } from "../../UserContext";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


export const LoginPage = () => {
    const usernameRef = useRef<HTMLInputElement>(null!);
    const passwordRef = useRef<HTMLInputElement>(null!);

    // für Nachricht an user nach Login und Registrierung
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState<boolean>(false);

    const { setUser } = useUserContext();

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // hier lesen wir die aktuellen Werte aus den Inputs aus und übermitteln sie an signInWithPassword
        const result = await supabase.auth.signInWithPassword({
            email: usernameRef.current.value,
            password: passwordRef.current.value,
        });
        console.dir(result);
    // im ersten Step: 
    // console.dir(result);
    // d.h., was auch immer wir zurückbekommen, wir loggen es
        // im zweiten Step: falls es einen User gibt, übermitteln wir ihn an den Context
        if (result.data.user) {
            setUser(result.data.user);
            setMessage("Du bist eingeloggt.");
            setIsError(false);

            // Navigiere bei erfolgeichem Login nach 4 Sekunden zum Dashboard/Userprofil
            setTimeout(() => {
            navigate('/userdashboard');
        }, 4000);

        } else {
            // falls es einen Fehler gibt, wird dieser geloggt
            console.error(result.error);
            setMessage("Login fehlgeschlagen.");
            setIsError(true);
        }
    };

return ( 
    <div className="flex items-center justify-center min-h-screen pb-64">
        <div className="bg-slate-100 rounded-xl shadow-lg overflow-hidden w-72 mx-auto p-8">
            <h3 className="text-xl font-semibold pb-2 text-center">Mein Konto</h3>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="E-Mail-Adresse"
                    type="text"
                    name="username"
                    ref={usernameRef} 
                />
                <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Passwort"
                    type="password"
                    name="password"
                    ref={passwordRef} 
                />
                <div className="flex flex-col items-center">
                    <button className="p-2 bg-yellow-400 rounded-lg w-full text-center">Anmelden</button>
                    <p className="pt-4 text-black">
                        Du hast noch kein Konto? Hier geht's zur <Link className="text-blue-500" to={"/signup"}>Registrierung</Link>
                    </p>
                </div>
            </form>
            {message && <p className={`${isError? "text-red-700" : "text-green-500"}`}>{message}</p>}
        </div>
    </div>
);
}

export default LoginPage;