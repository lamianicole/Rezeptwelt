import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/setupSupabase';
import FavoriteIcon from '../../assets/SVG/FavoriteIcon';

interface Recipe {
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
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {favoriteRecipes.map(recipe => (
            <li key={recipe.id} className="mb-4">
              <h3 className="text-lg font-bold">{recipe.title}</h3>
              <p>{recipe.description}</p>
              <FavoriteIcon recipeId={recipe.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserFavRecipeList;
