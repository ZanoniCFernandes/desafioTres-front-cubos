import './style.css';
import { useState } from 'react';

function FilterModal({ CategoriesArray }) {
    const [SelectedCategory, setSelectedCategory] = useState([]);

    function HandleFilterSelect(id) {
        if (SelectedCategory.includes(id)) {
            const CleanedSelectedCategory = SelectedCategory.filter((category) => {
                return category !== id
            })

            setSelectedCategory(CleanedSelectedCategory)
            return
        }
        setSelectedCategory([...SelectedCategory, id]);
    }

    return (
        <div className="container-filter">
            <div className='title-filter'>
                <strong>Categoria</strong>
            </div>
            <div className='categories'>
                {CategoriesArray.map((Category) => {
                    return (
                        <div
                            onClick={() => HandleFilterSelect(Category.id)}
                            key={Category.id}
                            className={SelectedCategory.includes(Category.id) ? 'category selected' : 'category'}>
                            <div>
                                <span>{Category.descricao}</span>
                            </div>
                            <div>
                                {SelectedCategory.includes(Category.id) ? <strong>&times;</strong> : <strong>+</strong>}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='filter-buttons'>
                <div
                    onClick={() => setSelectedCategory([''])}>
                    Limpar Filtros
                </div>
                <div>Aplicar Filtros</div>
            </div>
        </div>
    )

}

export default FilterModal;