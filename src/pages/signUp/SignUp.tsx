import { FormEvent } from "react";
import { supabase } from "../../utils/setupSupabase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Type, bevor datasetupsupabase aktualisiert wird
type TUser = {
    email: string,
    password: string,
    options?: {
        data: {
            first_name: string,
            last_name: string,
            user_name: string,
    }
    }
}

const SignUp = () => {
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState<boolean>(false);

    const navigate = useNavigate()

    // register
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
// type erstellen, der dann übergeben wird zum Fetch
    const user: TUser = {   
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
        options: {
            data: {
                first_name: event.currentTarget.first_name.value,
                last_name: event.currentTarget.last_name.value,
                user_name: event.currentTarget.user_name.value
            }
        }
    }
    const result = await supabase.auth.signUp(user)
    console.log(user);
    console.log(result);
    if (result.data.user) { 
            setMessage("Du bist registriert."); 
            setIsError(false);

            // Navigiere nach 4 Sekunden zum Dashboard
            setTimeout(() => {
                navigate('/userdashboard');
            }, 4000);
        } else { 
            setMessage("Registrierung fehlgeschlagen."); 
            setIsError(true);
        } 
    }

    return ( 
        <div>
        {/* function zum Registrieren */}
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="user_name">Username
                </label>
                <input type="text" name="user_name"/>
            </div>
            <div>
                <label htmlFor="first_name">Vorname
                </label>
                <input type="text" name="first_name"/>
            </div>
            <div>
                <label htmlFor="last_name">Nachname
                </label>
                <input type="text" name="last_name"/>
            </div>
            <div>
                <label htmlFor="email">E-Mail
                </label>
                <input type="email" name="email"/>
            </div>
            <div>
                <label htmlFor="password">Passwort
                </label>
                <input type="password" name="password"/>
            </div>
            {/* button neuer User zum Registrieren */}
            <button type="submit">Register</button>
        </form>
        {message && <p className={`${isError? "text-red-700" : "text-green-500"}`}>{message}</p>}
        </div>
    );
}

export default SignUp;