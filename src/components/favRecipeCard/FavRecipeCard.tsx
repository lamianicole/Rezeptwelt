import { Link } from "react-router-dom";
import { Tables } from "../../utils/database";

interface IFavRecipeCardProps {
    favRecipe: Tables<'recipes'>
}

const FavRecipeCard:React.FC<IFavRecipeCardProps> = ({favRecipe}) => {
    return ( 
        <article className="border-2 border-slate-100 rounded-xl w-72 mb-6">
            {/* ternary operator, wenn img nicht angezeigt wird */}
                {!favRecipe.image_url || favRecipe.image_url == undefined ? 
                (<>
                <p>image not found</p>
                </>)
                :(<>              
                <img className="h-[220px] w-full rounded-t-xl" src={`${favRecipe?.image_url}`} alt={favRecipe.name} />
                </>)
            }
            <div className="p-8 text-center bg-slate-400 rounded-bl-xl rounded-br-xl">
                <h3 className="text-xl font-bold pb-2">{favRecipe.name}</h3>
                <p className="pb-4 text-xs text-wrap">{favRecipe.description}</p>
                <Link className="btn-yell bg-yellow-300 py-2 px-5 rounded-2xl" to={`/detailPage/${favRecipe.id}`}>Zum Rezept</Link>
            </div>
        </article>
    );
}

export default FavRecipeCard;