import { useState } from 'react';
import { supabase } from '../../utils/setupSupabase';
import React, { useEffect } from 'react';
import { checkIfFavorited, addFavorite, removeFavorite } from '../../services/UserFavs.ts';

const FavoriteIcon: React.FC<{ recipeId: string }> = ({ recipeId }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const isFav = await checkIfFavorited(recipeId);
      setIsFavorited(isFav);
    };
    fetchFavoriteStatus();
  }, [recipeId]);

  const handleClick = async () => {
    const {
      data: {user},
    error} = await supabase.auth.getUser();
    if(error) {
      console.error('Error getting user: ',error);
    return;
  }
    if(!user){
      console.error('User not logged in');
      return;
    }
    const userId = user.id;
    
    if (isFavorited) {
      await removeFavorite(recipeId, userId);
    } else {
      await addFavorite(recipeId, userId);
    }
    setIsFavorited(!isFavorited);
  };



    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            id="Layer_1" 
            data-name="Layer 1" 
            viewBox="0 0 24 24"
            onClick={handleClick} 
            // Achtung, anpassen wg. tailwind statt css
            className={`w-6 h-6 cursor-pointer ${isFavorited ? 'text-red-600' : 'text-black'}`}
            fill="currentColor"
        >
            <path d="M20.5,13h-.763c.092-.394,.176-.788,.243-1.183,.116-.673-.079-1.367-.532-1.905-.487-.578-1.198-.909-1.951-.909l-14.996-.003c-.753,0-1.465,.331-1.952,.909C.097,10.447-.098,11.142,.018,11.815c.996,5.807,4.9,11.713,5.065,11.962l.148,.223H14.768l.148-.223c.093-.14,1.373-2.076,2.651-4.777h2.933c1.897,0,3.5-1.537,3.5-3.357,0-1.654-1.308-2.643-3.5-2.643Zm-6.272,10H5.772c-.718-1.131-3.914-6.372-4.769-11.354-.066-.388,.044-.776,.311-1.093,.292-.347,.736-.554,1.188-.554l14.996,.003c.451,0,.894,.207,1.187,.554,.267,.316,.377,.704,.311,1.093-.853,4.979-4.049,10.22-4.768,11.351Zm6.272-5h-2.478c.545-1.241,1.059-2.602,1.454-4h1.024c.934,0,2.5,.214,2.5,1.643,0,1.256-1.168,2.357-2.5,2.357ZM9.711,7.325l.289,.204,.289-.204c.38-.269,3.711-2.688,3.711-4.9,0-1.337-1.009-2.425-2.25-2.425-.706,0-1.337,.353-1.75,.902-.413-.55-1.044-.902-1.75-.902-1.241,0-2.25,1.088-2.25,2.425,0,2.212,3.332,4.632,3.711,4.9Zm-1.461-6.325c.689,0,1.25,.64,1.25,1.425v.575h1v-.575c0-.785,.561-1.425,1.25-1.425s1.25,.64,1.25,1.425c0,1.306-1.955,3.071-3,3.871-1.046-.799-3-2.562-3-3.871,0-.785,.561-1.425,1.25-1.425Z"/>
        </svg>
    );
};

export default FavoriteIcon;