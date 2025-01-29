import { useEffect, useState } from "react";
import FavRecipeSection from "../../components/favRecipeSection/FavRecipeSection";
import NewRecipeCard from "../../components/newRecipeCard/NewRecipeCard";
import { Tables } from "../../utils/database";
import { supabase } from "../../utils/setupSupabase";


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
        <div className="recipepage p-4 text-center min-h-screen pb-36">
            <FavRecipeSection/>
            <section className="newsection mt-4">
            <h2 className="headline font-medium text-[2rem] pb-6">Neueste Rezepte</h2>
                {loading ? (
                    <p>Recipes are loading... </p>
                ) : (
                    <div className="flex flex-col gap-y-8 pb-16">
                        {newRecipes?.map((newRecipe) => (
                            <NewRecipeCard key={newRecipe.id} newRecipe={newRecipe}/>
                        ))}
                        </div>
                    )}
            </section>
        </div>
    );
}

export default RecipePage;