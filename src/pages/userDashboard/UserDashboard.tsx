import { useEffect, useState } from "react";
import UserCreateRecipe from "../../components/userCreateRecipe/UserCreateRecipe";
import { supabase } from "../../utils/setupSupabase";

    interface IProfile {
        email: string;
        first_name: string;
        last_name: string;
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
                const { data: { user }, error: userError } = await supabase.auth.getUser();

                if (userError || !user) {
                    console.error(userError || 'Es wurde kein User gefunden');
                    setIsLoading(false);
                    return;
                }

                const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

                if (profileError) {
                    console.error(profileError);
                    setIsLoading(false);
                    return;
                }

                setProfile({
                    email: user.email ?? '', // Fallback auf einen leeren String, falls undefined
                    created_at: user.created_at ?? '', // Fallback auf einen leeren String, falls undefined
                    last_sign_in_at: user.last_sign_in_at ?? '', // Fallback auf einen leeren String, falls undefined
                    updated_at: profileData.updated_at ?? '', // Fallback auf einen leeren String, falls undefined
                    first_name: profileData.first_name ?? '', // Fallback auf einen leeren String, falls undefined
                    last_name: profileData.last_name ?? '', 
                });
                setIsLoading(false);
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
        <h1 className="text-4xl text-center">Willkommen auf deinem Dashboard</h1>
        <section className="h-screen flex justify-center items-center">
            <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 border border-gray-300 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900">Dein Profil</h2>
                <p>E-Mail: {profile?.email}</p>
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