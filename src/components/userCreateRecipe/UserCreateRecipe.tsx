const UserCreateRecipe = () => {
    return ( 
        <div className="max-w-md mx-auto mt-8 h-[1200px]">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
            <label className="label-style" htmlFor="name">
                Rezepttitel
            </label>
            <input
                className="input-style"
                id="name"
                type="text"
                name="name"
                placeholder="Gib den Rezepttitel ein"
            />
        </div>
        <div className="mb-4">
						<label className="label-style" htmlFor="description">
							Beschreibung des Rezepts
						</label>
						<input
							className="input-style"
							id="description"
							type="text"
							name="description"
							placeholder="Füge eine Rezept-Beschreibung hinzu"
						/>
					</div>
                    <div className="mb-4">
						<label className="label-style" htmlFor="servings">
							Portionen
						</label>
						<input
							className="input-style"
							id="servings"
							type="text"
							name="servings"
							placeholder="Gib die Anzahl der Portionen an"
						/>
					</div>
                    <div className="mb-4">
						<label className="label-style" htmlFor="category">
							Kategorie
						</label>
						<select className="input-style" name="category" id="category">
                            <option value="">Wähle eine Kategorie aus</option>
                            <option value="liter">Frühstück</option>
                            <option value="gram">Vorspeise</option>
                            <option value="cup">Mittagessen</option>
                            <option value="tspoon">Dessert</option>
                            <option value="spoon">Abendessen</option>  
                        </select>
					</div>

                    <div className="mb-4">
						<label className="label-style" htmlFor="quantity">
							Menge
						</label>
						<input
							className="input-style"
							id="quantity"
							type="text"
							name="quantity"
							placeholder="Füge hier die Menge hinzu"
						/>
					</div>
                    <div className="mb-4">
						<label className="label-style" htmlFor="unit">
							Einheit
						</label>
						<select className="input-style" name="unit" id="unit">
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
						<input
							className="input-style"
							id="instructions"
							type="text"
							name="instructions"
							placeholder="Füge hier die Arbeitsschritte hinzu"
						/>
					</div>
                    <div className="mb-4">
						<label className="label-style" htmlFor="additional_info">
							Zusätzliche Informationen
						</label>
						<input
							className="input-style"
							id="additional_info"
							type="text"
							name="additional_info"
							placeholder="Erwähne hier zusätzliche Informationen"
						/>
					</div>
        <div className="mb-4">
            <label className="label-style" htmlFor="image">
                Foto des Rezepts
            </label>
            <input
                className="label-style"
                id="image"
                type="file"
                name="image"
                accept="image/*"
            />
        </div>
        <div className="flex items-center justify-between">
            <button
                className="btn-yellow"
                type="submit"
            >
                Erstelle ein Rezept
            </button>
        </div>
    </form>
</div>
    );
}

export default UserCreateRecipe;