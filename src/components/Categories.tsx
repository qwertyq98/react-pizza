import React from "react";

type CategoriesProps = {
  categoryId: number;
  onClickCategory: (index: number) => void;
}

const Categories: React.FC<CategoriesProps> = ({ categoryId, onClickCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            onClick={() => onClickCategory(index)}
            key={index}
            className={categoryId === index ? 'active' : ''}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
