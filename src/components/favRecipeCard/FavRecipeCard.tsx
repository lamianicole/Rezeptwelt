import { Link } from "react-router-dom";
import { Tables } from "../../utils/database";

interface IFavRecipeCardProps {
    favRecipe: Tables<'recipes'>
}

const FavRecipeCard:React.FC<IFavRecipeCardProps> = ({favRecipe}) => {
    return ( 
        <article className="border-2 border-slate-100 rounded-xl w-80 mb-6">
            {/* ternary operator, wenn img nicht angezeigt wird */}
               {!favRecipe.image_url || favRecipe.image_url == undefined ? 
               (<>
                <p>image not found</p>
               </>)
               :(<>              
               <img src={`${favRecipe?.image_url}`} alt={favRecipe.name} />
               </>)
            }
            <div className="p-8 text-start bg-slate-400">
                <h3 className="text-xl font-bold">{favRecipe.name}</h3>
                <p className="pb-4 text-xs text-wrap pr-8">{favRecipe.description}</p>
                <Link className="btn-yell bg-yellow-300 py-2 px-5 rounded-2xl" to={`/detailPage/${favRecipe.id}`}>Zum Rezept</Link>
            </div>
        </article>
    );
}

export default FavRecipeCard;