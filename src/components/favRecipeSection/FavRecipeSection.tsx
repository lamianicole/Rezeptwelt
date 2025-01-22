import { useEffect, useState } from "react";
import FavRecipeCard from "../favRecipeCard/FavRecipeCard";
import { supabase } from "../../utils/setupSupabase";
import { Tables } from "../../utils/database";

/* type Recipe = Tables<'recipes'> */
const FavRecipeSection = () => {
    const [favRecipes, setFavRecipes] = useState<Tables<'recipes'>[] | null>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFavRecipes = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                .from('recipes')
                .select('*')
                .order('created_at')
                .limit(3);
                console.log(data);

                if (error) {
                    console.error("Fetching favorite recipes failed", error);      
                } else {
                    setFavRecipes(data || []);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
            };
        
            fetchFavRecipes();
        }, []);


    return ( 
        <section className="text-center mb-14">
            <h2 className="headline font-bold text-[1.5rem] pb-6">Die beliebtesten Rezepte</h2>
            {loading ? (
                <p>Loading recipes ...</p>
            ) : (
            <div className="flex justify-center gap-8">
                {favRecipes?.map((favRecipe) => (
                    <div key={favRecipe.rating}>
                        <FavRecipeCard favRecipe={favRecipe}/>
                        </div>
            ))}
            </div>
            )}
        </section>
    );
}

export default FavRecipeSection;