import { useState, useRef } from 'react';
import { supabase } from '../../utils/setupSupabase';

type TIngredient = {
  name: string;
  quantity: number;
  unit: string;
  additional_info: string | null;
};

type TUserRecipe = {
  category_id: string;
  name: string;
  description: string;
  servings: number;
  instructions: string;
  image_url: string;
};

const UserCreateRecipe = () => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const servingsRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const instructionsRef = useRef<HTMLInputElement>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);

  const handleAddIngredient = () => {
    setIngredients((prev) => [...prev, { name: '', quantity: 0, unit: '', additional_info: null }]);
  };

  const handleIngredientChange = (index: number, field: string, value: string | number) => {
    const updatedIngredients = ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [field]: value } : ingredient
    );
    setIngredients(updatedIngredients);
  };

  const handleImageUpload = async (): Promise<string | null> => {
    const file = imageFileRef.current?.files?.[0];
    if (!file) {
      setUploadStatus('No file selected');
      return null;
    }

    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage.from('upload-recipe-images').upload(fileName, file);

    if (error) {
      setUploadStatus(`Upload failed: ${error.message}`);
      return null;
    } else {
      setUploadStatus('Upload successful!');
      return supabase.storage.from('upload-recipe-images').getPublicUrl(data.path).data.publicUrl;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const imageUrl = await handleImageUpload();
    if (!imageUrl) {
      alert('Image upload failed. Please try again.');
      return;
    }

    const name = nameRef.current?.value || '';
    const description = descriptionRef.current?.value || '';
    const servings = servingsRef.current?.value ? parseInt(servingsRef.current.value) : 0;
    const category_id = categoryRef.current?.value || '';
    const instructions = instructionsRef.current?.value || '';

    const recipe: TUserRecipe = {
      category_id,
      name,
      description,
      servings,
      instructions,
      image_url: imageUrl
    };

    // Rezept speichern und die ID zurückbekommen
    const { data: recipeData, error: recipeError } = await supabase.from('recipes').insert([recipe]).select('id');

    if (recipeError) {
      alert(`Error saving recipe: ${recipeError.message}`);
      return;
    }

    const recipeId = recipeData[0].id;

    // Zutaten mit der Rezept-ID speichern
    const ingredientsWithRecipeId = ingredients.map(ingredient => ({ ...ingredient, recipe_id: recipeId }));
    const { data: ingredientsData, error: ingredientsError } = await supabase.from('ingredients').insert(ingredientsWithRecipeId);

    if (ingredientsError) {
      alert(`Error saving ingredients: ${ingredientsError.message}`);
      return;
    }

    console.log('Recipe and ingredients saved successfully!', recipeData, ingredientsData);
    alert('Recipe and ingredients saved successfully!');
  };

  return (
    <div className="max-w-md mx-auto mt-8 h-[1200px]">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="label-style" htmlFor="category">
            Kategorie
          </label>
          <select className="input-style" name="category" id="category" ref={categoryRef}>
            <option value="">Wähle eine Kategorie aus</option>
            <option value="cdd26218-aee7-4455-9d09-e28c2afc9c87">Frühstück</option>
            <option value="15207681-4adb-49b9-90bd-0d84d497a2a1">Vorspeise</option>
            <option value="0b9e46b7-bee4-4128-a1c8-58f15b8ce90a">Mittagessen</option>
            <option value="e5db3116-4273-4a6d-ab09-fb45526a92c3">Dessert</option>
            <option value="0a3d3e9f-ebfc-4144-8878-507920d67591">Abendessen</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="label-style" htmlFor="name">
            Rezepttitel
          </label>
          <input className="input-style" id="name" type="text" name="name" placeholder="Gib den Rezepttitel ein" ref={nameRef} />
        </div>
        <div className="mb-4">
          <label className="label-style" htmlFor="description">
            Beschreibung des Rezepts
          </label>
          <input className="input-style" id="description" type="text" name="description" placeholder="Füge eine Rezept-Beschreibung hinzu" ref={descriptionRef} />
        </div>
        <div className="mb-4">
          <label className="label-style" htmlFor="servings">
            Portionen
          </label>
          <input className="input-style" id="servings" type="text" name="servings" placeholder="Gib die Anzahl der Portionen an" ref={servingsRef} />
        </div>
        <div className="mb-4">
          <label className="label-style" htmlFor="instructions">
            Zubereitung
          </label>
          <input className="input-style" id="instructions" type="text" name="instructions" placeholder="Füge hier die Arbeitsschritte hinzu" ref={instructionsRef} />
        </div>
        <div className="mb-4">
          <label className="label-style" htmlFor="image">
            Foto des Rezepts
          </label>
          <input className="label-style" id="image" type="file" name="image" accept="image/*" ref={imageFileRef} />
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Zutaten</h2>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Zutat"
                className="input-style"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              />
              <input
                type="number"
                placeholder="Menge"
                className="input-style w-24"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, 'quantity', Number(e.target.value))}
              />
              <select
                className="input-style w-24"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
              >
                <option value="">Einheit</option>
                <option value="liter">Liter</option>
                <option value="gram">Gramm</option>
                <option value="cup">Tasse(n)</option>
                <option value="tspoon">Teelöffel</option>
                <option value="spoon">Esslöffel</option>
                <option value="dash">Prise</option>
              </select>
              <input
                type="text"
                placeholder="Zusätzliche Infos"
                className="input-style"
                value={ingredient.additional_info || ''}
                onChange={(e) => handleIngredientChange(index, 'additional_info', e.target.value)}
              />
            </div>
          ))}
          <button type="button" className="btn-yellow" onClick={handleAddIngredient}>+ Zutat hinzufügen</button>
        </div>
        <div className="flex items-center justify-between">
          <button className="btn-yellow" type="submit">Rezept hochladen</button>
        </div>
        <p>{uploadStatus}</p>
      </form>
    </div>
  );
};

export default UserCreateRecipe;
