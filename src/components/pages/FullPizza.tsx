import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

type PizzaInfo = {
  imageUrl: string
  title: string
  price: string
  description: string
}

export const FullPizza: React.FC = () => {
  const params = useParams();

  const [pizza, setPizza] = React.useState<PizzaInfo>();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const item = await axios.get('https://64b03ccac60b8f941af5724f.mockapi.io/items/' + params.id);
        setPizza(item.data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    }
    fetchPizza();
  }, [])

  if(!pizza) {
    return <div className='loading'>Загрузка...</div>
  }
  
  return (
    <div className='container__full'>
      <img className='container__img' src={pizza.imageUrl} />
      <div className='container__text'>
        <div className='container__wrapper'>
          <h2 className='content__title'>{pizza.title}</h2>
          <p className='container__description'>{pizza.description}</p>
          <h4 className='pizza-block__price'>{pizza.price} ₽</h4>
        </div>
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  )
}
