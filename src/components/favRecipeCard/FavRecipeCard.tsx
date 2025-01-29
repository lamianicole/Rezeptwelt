import { Link } from "react-router-dom";
import { Tables } from "../../utils/database";

interface IFavRecipeCardProps {
    favRecipe: Tables<'recipes'>
}

const FavRecipeCard:React.FC<IFavRecipeCardProps> = ({favRecipe}) => {
    return ( 
            <article className="bg-slate-100 rounded-xl shadow-lg overflow-hidden w-72 mx-auto">
                {!favRecipe.image_url || favRecipe.image_url == undefined ? 
                (<>
                <p>Image not found</p>
                </>)
                :(<>              
                <img className="h-[220px] w-full object-cover" src={`${favRecipe?.image_url}`} alt={favRecipe.name} />
                </>)
            }
            <div className="p-8 text-center bg-slate-100">
                <h3 className="text-xl font-semibold pb-2">{favRecipe.name}</h3>
                <p className="pb-4 text-xs text-wrap">{favRecipe.description}</p>
                <Link className="btn-yellow" to={`/detailPage/${favRecipe.id}`}>Zum Rezept</Link>
            </div>
        </article>
    );
}

export default FavRecipeCard;