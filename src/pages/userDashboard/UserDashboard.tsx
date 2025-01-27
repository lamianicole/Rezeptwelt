import { useEffect, useState } from "react";
import UserCreateRecipe from "../../components/userCreateRecipe/UserCreateRecipe";
import { supabase } from "../../utils/setupSupabase";

    interface IProfile {
        email: string;
        first_name: string;
        last_name: string;
        user_name: string;
        created_at: string;
        updated_at: string;
        last_sign_in_at: string;
        [key: string]: string | number | boolean | null;
    }

    const UserDashboard = () => {
        const [profile, setProfile] = useState<IProfile | null>(null);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const fetchProfile = async () => {
                setIsLoading(true);
                // erster fetch session für Daten Profile (auth.user bzw. user table)
// getSession holt Daten vom Supabase-Server.
// const { data: { session }, error } entpackt (oder nimmt auseinander) die Antwort von getSession.
// session enthält die Sitzungsdaten des Benutzers (wenn vorhanden).
// error enthält mögliche Fehler, die aufgetreten sind.
// Das Entpacken bedeutet, dass wir die Teile der Antwort, die wir brauchen (session und error), direkt herausnehmen und benennen, damit wir sie leicht verwenden können. So müssen wir nicht jedes Mal auf die ganze Antwort zugreifen.
                const { data: {session}, error } = await supabase.auth.getSession()
                console.log(session, error);
                if (session) {
                // zweiter fetch von table profiles
                const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*') // Wählt alle colums
                .eq('id', session.user.id) // Filtert die Daten, um die column zu finden, deren id mit der id des angemeldeten Benutzers übereinstimmt.
                .single(); // Gibt nur eine einzelne Zeile zurück (denn die id ist eindeutig).
                console.log(profileData, profileError);

// setProfile({ ... }): Die Profildaten werden im Zustand (state) profile gespeichert.
// email: session.user.email ?? '': Die E-Mail des Benutzers wird gesetzt, oder ein leerer String, falls email null oder undefined ist.
                setProfile({
                    email: session.user.email ?? '',
                    created_at: session.user.created_at ?? '', 
                    last_sign_in_at: session.user.last_sign_in_at ?? '', 
                    updated_at: session.user.updated_at ?? '', 
// profileData hab ich als Platzhalter aus zweitem fetch
                    first_name: profileData?.first_name ?? '', 
                    last_name: profileData?.last_name ?? '', 
                    user_name: profileData?.user_name ?? '',
                });
// setIsLoading(false);: Der Ladezustand wird auf false gesetzt, da die Daten erfolgreich abgerufen wurden.
                setIsLoading(false);
            }
            };
        fetchProfile();
        }, []);
        
        const handleLogout = async () => {
            try {
                const { error } = await supabase.auth.signOut();
                if (error) throw error;

        console.log('User ist ausgeloggt');
        setProfile(null);
        } catch (err) {
            console.error(err);
        }
    };

    if (isLoading) return <p>Loading...</p>;

    return ( 
        <>
        <h1 className="headline font-medium text-[2rem] pb-6 text-center">🥙 👩🏻‍🍳 Willkommen auf deinem Dashboard 👨🏼‍🍳 🥗</h1>
        <section className="h-screen flex justify-center items-center">
            <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 border border-gray-300 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900">Dein Profil</h2>
                <p>E-Mail: {profile?.email}</p>
                <p>Username: {profile?.user_name}</p>
                <p className="mt-1 text-gray-800">Vorname: {profile?.first_name}</p>
                <p className="mt-1 text-gray-800">Nachname: {profile?.last_name}</p>
            <div className="mt-4 text-gray-700">

            <button className='button' onClick={handleLogout}>Logout</button>
                <p>Angelegt am: {profile?.created_at}</p>
                <p>Zuletzt geändert am: {profile?.updated_at}</p>
                <p>Zuletzt eingeloggt am: {profile?.last_sign_in_at}</p>
            </div>
            </div>
        </section>
            <UserCreateRecipe />
        </>
    );
}

export default UserDashboard;