import { useEffect, useState } from "react";
import FavRecipeSection from "../../components/favRecipeSection/FavRecipeSection";
import NewRecipeCard from "../../components/newRecipeCard/NewRecipeCard";
import { Tables } from "../../utils/database";
import { supabase } from "../../utils/setupSupabase";

/* interface IRecipePageProps{
    newRecipe: Tables<'recipes'>
} */

const RecipePage = () => {

    const [newRecipes, setNewRecipes]= useState<Tables<'recipes'> [] | null>([]);
    const [loading, setLoading]= useState<boolean>(true);

    useEffect(() => {
        const fetchNewRecipes = async () => {
            setLoading(true);
            try {
                const {data, error} = await supabase
                .from('recipes')
                .select('*')
                .order('created_at')
                .limit(3);
                console.log(data);
                
                if(error) {
                    console.error('fetching recipes failed', error)
                }  else {
                    setNewRecipes(data || [])
                }   
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        };
        fetchNewRecipes()
    }, []);

    return ( 
        <div className="recipepage p-4 text-center">
            <FavRecipeSection/>
            <section className="newsection">
                <h3>Neueste Rezepte</h3>
                {loading ? (
                    <p>Recipes are loading... </p>
                ) : (
                        newRecipes?.map((newRecipe)=> (
                            <NewRecipeCard key={newRecipe.id} newRecipe={newRecipe}/>
                        ))
                    )}
            </section>
        </div>
    );
}

export default RecipePage;