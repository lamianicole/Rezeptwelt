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
        <div className="flex items-center justify-center min-h-screen pb-32">
            <div className="bg-slate-100 rounded-xl shadow-lg overflow-hidden w-72 mx-auto p-8">
                <h3 className="text-xl font-semibold pb-2 text-center">Kundenkonto erstellen</h3>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-gray-700" htmlFor="user_name">Username</label>
                        <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            type="text" 
                            name="user_name"
                            placeholder="Username"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700" htmlFor="first_name">Vorname</label>
                        <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            type="text" 
                            name="first_name"
                            placeholder="Vorname"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700" htmlFor="last_name">Nachname</label>
                        <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            type="text" 
                            name="last_name"
                            placeholder="Nachname"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700" htmlFor="email">E-Mail</label>
                        <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            type="email" 
                            name="email"
                            placeholder="email@mail.com"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700" htmlFor="password">Passwort</label>
                        <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            type="password" 
                            name="password"
                            placeholder="********"
                        />
                    </div>
                    <button type="submit" className="p-2 bg-yellow-400 rounded-lg w-full text-center">Registrieren</button>
                </form>
                {message && <p className={`${isError ? "text-red-700" : "text-green-500"}`}>{message}</p>}
            </div>
        </div>
    );
}

export default SignUp;