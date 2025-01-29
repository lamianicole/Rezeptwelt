
import { supabase } from '../utils/setupSupabase';

export const checkIfFavorited = async (recipeId: string) => {
  const { data, error } = await supabase
    .from('recipe_favorites')
    .select('*')
    .eq('recipe_id', recipeId)
    .single();
  if (error) {
    console.error('Error checking favorite:', error);
  }
  return data !== null;
};

export const addFavorite = async (recipeId: string, userId: string) => {
  const { error } = await supabase
    .from('recipe_favorites')
    .insert({ recipe_id: recipeId, user_id: userId });
  if (error) {
    console.error('Error adding favorite:', error);
  }
  return error;
};

export const removeFavorite = async (recipeId: string, userId: string) => {
  const { error } = await supabase
    .from('recipe_favorites')
    .delete()
    .eq('recipe_id', recipeId)
    .eq('user_id', userId);
  if (error) {
    console.error('Error removing favorite:', error);
  }
  return error;
};
