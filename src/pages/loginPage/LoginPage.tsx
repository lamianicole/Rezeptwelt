import { useRef } from "react";
import { supabase } from "../../utils/setupSupabase";
import { useUserContext } from "../../UserContext";

export const LoginPage = () => {
    const usernameRef = useRef<HTMLInputElement>(null!);
    const passwordRef = useRef<HTMLInputElement>(null!);

    const { setUser } = useUserContext();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // hier lesen wir die aktuellen Werte aus den Inputs aus und übermitteln sie an signInWithPassword
        const result = await supabase.auth.signInWithPassword({
            email: usernameRef.current.value,
            password: passwordRef.current.value,
        });
    // im ersten Step: 
    // console.dir(result);
    // d.h., was auch immer wir zurückbekommen, wir loggen es
        // im zweiten Step: falls es einen User gibt, übermitteln wir ihn an den Context
        if (result.data.user) {
            setUser(result.data.user);
        } else {
            // falls es einen Fehler gibt, wird dieser geloggt
            console.error(result.error);
        }
        // im ersten Step: 
    console.dir(result);
    };
    const handleRegister = async () => {
        const result = await supabase.auth.signUp({
            email: usernameRef.current.value,
            password: passwordRef.current.value,
        });
        console.log(result);
    };

    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="username"
                    type="text"
                    name="username"
                    ref={usernameRef} 
                />
                <input
                    placeholder="password"
                    type="password"
                    name="password"
                    ref={passwordRef} 
                />
                <button className="mr-6">Log In</button>
                <button type="button" onClick={handleRegister}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default LoginPage;