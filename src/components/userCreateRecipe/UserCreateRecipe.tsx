// import { supabase } from "../../utils/setupSupabase";


// const UserCreateRecipe = () => {
//     return (
//         <div className="max-w-md mx-auto mt-8 h-[1200px]">
//             <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label className="label-style" htmlFor="category">
//                         Kategorie
//                     </label>
//                     <select className="input-style" name="category" id="category">
//                         <option value="">Wähle eine Kategorie aus</option>
//                         <option value="liter">Frühstück</option>
//                         <option value="gram">Vorspeise</option>
//                         <option value="cup">Mittagessen</option>
//                         <option value="tspoon">Dessert</option>
//                         <option value="spoon">Abendessen</option>
//                     </select>
//                 </div>
//                 <div className="mb-4">
//                     <label className="label-style" htmlFor="name">
//                         Rezepttitel
//                     </label>
//                     <input
//                         className="input-style"
//                         id="name"
//                         type="text"
//                         name="name"
//                         placeholder="Gib den Rezepttitel ein"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="label-style" htmlFor="description">
//                         Beschreibung des Rezepts
//                     </label>
//                     <input
//                         className="input-style"
//                         id="description"
//                         type="text"
//                         name="description"
//                         placeholder="Füge eine Rezept-Beschreibung hinzu"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="label-style" htmlFor="servings">
//                         Portionen
//                     </label>
//                     <input
//                         className="input-style"
//                         id="servings"
//                         type="text"
//                         name="servings"
//                         placeholder="Gib die Anzahl der Portionen an"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="label-style" htmlFor="quantity">
//                         Menge
//                     </label>
//                     <input
//                         className="input-style"
//                         id="quantity"
//                         type="text"
//                         name="quantity"
//                         placeholder="Füge hier die Menge hinzu"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="label-style" htmlFor="unit">
//                         Einheit
//                     </label>
//                     <select className="input-style" name="unit" id="unit">
//                         <option value="">Wähle eine Einheit aus</option>
//                         <option value="liter">Liter</option>
//                         <option value="gram">Gramm</option>
//                         <option value="cup">Tasse(n)</option>
//                         <option value="tspoon">Teelöffel</option>
//                         <option value="spoon">Esslöffel</option>
//                         <option value="dash">Prise</option>
//                     </select>
//                 </div>
//                 <div className="mb-4">
//                     <label className="label-style" htmlFor="instructions">
//                         Zubereitung
//                     </label>
//                     <input
//                         className="input-style"
//                         id="instructions"
//                         type="text"
//                         name="instructions"
//                         placeholder="Füge hier die Arbeitsschritte hinzu"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="label-style" htmlFor="additional_info">
//                         Zusätzliche Informationen
//                     </label>
//                     <input
//                         className="input-style"
//                         id="additional_info"
//                         type="text"
//                         name="additional_info"
//                         placeholder="Erwähne hier zusätzliche Informationen"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="label-style" htmlFor="image">
//                         Foto des Rezepts
//                     </label>
//                     <input
//                         className="label-style"
//                         id="image"
//                         type="file"
//                         name="image"
//                         accept="image/*"
//                     />
//                 </div>
//                 <div className="flex items-center justify-between">
//                     <button
//                         className="btn-yellow"
//                         type="submit"
//                     >Rezept hochladen</button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default UserCreateRecipe;


import { useState, useRef } from 'react';
import { supabase } from '../../utils/setupSupabase';

type TUserRecipe = {
  category: string;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  instructions: string;
  servings: number;
  additional_info: string | null;
  image_url: string;
  ingredients: { name: string; quantity: number; unit: string }[];
};

const UserCreateRecipe = () => {
  const [ingredients, setIngredients] = useState<{ name: string; quantity: number; unit: string }[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const servingsRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const unitRef = useRef<HTMLSelectElement>(null);
  const instructionsRef = useRef<HTMLInputElement>(null);
  const additionalInfoRef = useRef<HTMLInputElement>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);

  
  const handleAddIngredient = () => {
    setIngredients((prev) => [...prev, { name: '', quantity: 0, unit: '' }]);
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
    const { data, error } = await supabase.storage
	.from('upload-recipe-images')
	.upload(fileName, file);
	// code für recipe image in storage laden

    if (error) {
      setUploadStatus(`Upload failed: ${error.message}`);
      return null;
    } else {
      setUploadStatus('Upload successful!');
      return supabase.storage
	  .from('upload-recipe-images')
	  .getPublicUrl(data.path).data.publicUrl;
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
    const category = categoryRef.current?.value || '';
    const quantity = quantityRef.current?.value ? parseInt(quantityRef.current.value) : 0;
    const unit = unitRef.current?.value || '';
    const instructions = instructionsRef.current?.value || '';
    const additional_info = additionalInfoRef.current?.value || '';

    const recipe: TUserRecipe = {
      category,
      name,
      description,
      quantity,
      unit,
      instructions,
      servings, // Hier wird servings auf 0 gesetzt, wenn es null ist
      additional_info,
      image_url: imageUrl,
      ingredients,
    };

    const { data, error } = await supabase
	.from('recipes')
	.insert([recipe]).select('id');

    if (error) {
      alert(`Error saving recipe: ${error.message}`);
    } else {
		console.log('Recipe saved successfully!', data);
      	alert('Recipe saved successfully!');
    }
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
			{/* aus categories table die uuid einsetzen statt liter*/}
            <option value="liter">Frühstück</option>
            <option value="gram">Vorspeise</option>
            <option value="cup">Mittagessen</option>
            <option value="tspoon">Dessert</option>
            <option value="spoon">Abendessen</option>
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
          <label className="label-style" htmlFor="quantity">
            Menge
          </label>
          <input className="input-style" id="quantity" type="text" name="quantity" placeholder="Füge hier die Menge hinzu" ref={quantityRef} />
        </div>
        <div className="mb-4">
          <label className="label-style" htmlFor="unit">
            Einheit
          </label>
          <select className="input-style" name="unit" id="unit" ref={unitRef}>
            <option value="">Wähle eine Einheit aus</option>
            <option value="liter">Liter</option>
            <option value="gram">Gramm</option>
            <option value="cup">Tasse(n)</option>
            <option value="tspoon">Teelöffel</option>
            <option value="spoon">Esslöffel</option>
            <option value="dash">Prise</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="label-style" htmlFor="instructions">
            Zubereitung
          </label>
          <input className="input-style" id="instructions" type="text" name="instructions" placeholder="Füge hier die Arbeitsschritte hinzu" ref={instructionsRef} />
        </div>
        <div className="mb-4">
          <label className="label-style" htmlFor="additional_info">
            Zusätzliche Informationen
          </label>
          <input className="input-style" id="additional_info" type="text" name="additional_info" placeholder="Erwähne hier zusätzliche Informationen" ref={additionalInfoRef} />
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
}

export default UserCreateRecipe;