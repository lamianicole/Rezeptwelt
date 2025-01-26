import { Link } from "react-router-dom";
import { Tables } from "../../utils/database";

interface INewRecipeCardProps{
    newRecipe: Tables<'recipes'>
}

const NewRecipeCard:React.FC<INewRecipeCardProps> = ({newRecipe}) => {
return ( 
    <article className="flex items-center bg-slate-100 rounded-xl shadow-lg overflow-hidden h-48 w-3/4 mx-auto">
        <img className="h-full w-48 object-cover" src="/LogoMug.png" alt="Food image" />
        <div className="p-8 text-start bg-slate-100 h-full w-full">
            <h3 className="text-xl font-semibold pb-2">{newRecipe.name}</h3>
            <p className="pb-4 text-xs">{newRecipe.description}</p>
            <Link className="btn-yellow" to={`/detailPage/${newRecipe.id}`}>Zum Rezept</Link>
        </div>
    </article>
);
}

export default NewRecipeCard;