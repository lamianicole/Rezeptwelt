import React from 'react';

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

interface UserProfileProps {
  profile: IProfile;
  handleLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ profile, handleLogout }) => {
  return (
    <div className="flex items-center justify-center min-h-screen pb-4">
      <div className="bg-slate-100 rounded-xl shadow-lg overflow-hidden w-72 mx-auto p-8">
        <h3 className="text-xl font-semibold pb-2 text-center">Dein Profil</h3>
        <div className="flex flex-col space-y-4">
          <p>E-Mail: {profile.email}</p>
          <p>Username: {profile.user_name}</p>
          <p className="text-gray-800">Vorname: {profile.first_name}</p>
          <p className="text-gray-800">Nachname: {profile.last_name}</p>
          <p>Angelegt am: {profile.created_at}</p>
          <p>Zuletzt geändert am: {profile.updated_at}</p>
          <p>Zuletzt eingeloggt am: {profile.last_sign_in_at}</p>
          <div className="flex justify-center">
            <button className="p-2 bg-yellow-400 rounded-lg w-full text-center" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;


