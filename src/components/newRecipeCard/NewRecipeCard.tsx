import { Link } from "react-router-dom";
import { Tables } from "../../utils/database";

interface INewRecipeCardProps{
    newRecipe: Tables<'recipes'>
}

const NewRecipeCard:React.FC<INewRecipeCardProps> = ({newRecipe}) => {
    return ( 
        <article className="flex py-4">
            <img src="/LogoMug.png" alt="Food image" />
                <div className="bg-slate-100 text-start px-4 py-6">
                    <p className="text-lg pb-4">{newRecipe.name}</p>
                    <p className="text-xs pb-4">{newRecipe.description}</p>
                    <Link to={`/details/${newRecipe.id}`}>Zum Rezept</Link>
                </div>
        </article>
    );
}

export default NewRecipeCard;