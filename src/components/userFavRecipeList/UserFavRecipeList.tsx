// import React, { useState, useEffect } from 'react';
// import { supabase } from '../../utils/setupSupabase';
// import FavoriteIcon from '../../assets/SVG/FavoriteIcon';

// interface IRecipe {
//   id: string;
//   title: string;
//   description: string;
//   image_url: string | null;
//   instructions: string;
//   servings: number;
//   category_id: string;
//   created_at: string;
//   rating: number | null;
// }

// const UserFavRecipeList: React.FC = () => {
//   const [favoriteRecipes, setFavoriteRecipes] = useState<IRecipe[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFavoriteRecipes = async () => {
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
//       if (userError) {
//         console.error('Error fetching user:', userError);
//         setLoading(false);
//         return;
//       }
//       if (!user) {
//         console.error('User not logged in');
//         setLoading(false);
//         return;
//       }

//       const { data: favorites, error: favError } = await supabase
//         .from('recipe_favorites')
//         .select('recipe_id')
//         .eq('user_id', user.id);

//       if (favError) {
//         console.error('Error fetching favorites:', favError);
//         setLoading(false);
//         return;
//       }

//       const recipeIds = favorites.map(fav => fav.recipe_id);
      
//       const { data: recipes, error: recipesError } = await supabase
//         .from('recipes')
//         .select('*')
//         .in('id', recipeIds);

//       if (recipesError) {
//         console.error('Error fetching recipes:', recipesError);
//         setLoading(false);
//         return;
//       }

//       const mappedRecipes = recipes.map(recipe => ({
//         ...recipe,
//         title: recipe.name  // Mappe 'name' zu 'title'
//       }));

//       setFavoriteRecipes(mappedRecipes);
//       setLoading(false);
//     };

//     fetchFavoriteRecipes();
//   }, []);

//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul>
//           {favoriteRecipes.map(recipe => (
//             <li key={recipe.id} className="mb-4">
//               <h3 className="text-lg font-bold">{recipe.title}</h3>
//               <p>{recipe.description}</p>
//               <FavoriteIcon recipeId={recipe.id} />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default UserFavRecipeList;



import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/setupSupabase';
import FavoriteIcon from '../../assets/SVG/FavoriteIcon';
import { Link } from "react-router-dom";

interface IRecipe {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  instructions: string;
  servings: number;
  category_id: string;
  created_at: string;
  rating: number | null;
}

const UserFavRecipeList: React.FC = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('Error fetching user:', userError);
        setLoading(false);
        return;
      }
      if (!user) {
        console.error('User not logged in');
        setLoading(false);
        return;
      }

      const { data: favorites, error: favError } = await supabase
        .from('recipe_favorites')
        .select('recipe_id')
        .eq('user_id', user.id);

      if (favError) {
        console.error('Error fetching favorites:', favError);
        setLoading(false);
        return;
      }

      const recipeIds = favorites.map(fav => fav.recipe_id);
      
      const { data: recipes, error: recipesError } = await supabase
        .from('recipes')
        .select('*')
        .in('id', recipeIds);

      if (recipesError) {
        console.error('Error fetching recipes:', recipesError);
        setLoading(false);
        return;
      }

      const mappedRecipes = recipes.map(recipe => ({
        ...recipe,
        title: recipe.name  // Mappe 'name' zu 'title'
      }));

      setFavoriteRecipes(mappedRecipes);
      setLoading(false);
    };

    fetchFavoriteRecipes();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[2rem] font-medium text-center my-4">Meine gesammelten Rezepte</h1> {/* Überschrift hinzugefügt */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col items-center gap-4"> {/* Flexbox für vertikale Ausrichtung */}
          {favoriteRecipes.map(recipe => (
            <article key={recipe.id} className="bg-slate-100 rounded-xl shadow-lg overflow-hidden w-72 mx-auto">
              {!recipe.image_url || recipe.image_url === undefined ? 
              (
                <p>Image not found</p>
              ) : 
              (
                <img className="h-[220px] w-full object-cover" src={`${recipe?.image_url}`} alt={recipe.title} />
              )}
              <div className="p-8 text-center bg-slate-100">
                <h3 className="text-xl font-semibold pb-2">{recipe.title}</h3>
                <p className="pb-4 text-xs text-wrap">{recipe.description}</p>
                <div className="flex justify-center items-center gap-2 mt-4"> {/* Flexbox für den Button und das Icon */}
                  <Link className="btn-yellow" to={`/detailPage/${recipe.id}`}>Zum Rezept</Link>
                  <FavoriteIcon recipeId={recipe.id} /> {/* FavoriteIcon rechts vom Button */}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserFavRecipeList;

