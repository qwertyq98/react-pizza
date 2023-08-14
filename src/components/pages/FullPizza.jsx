import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';

export const FullPizza = () => {
  const params = useParams();
  const [pizza, setPizza] = React.useState();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const item = await api.getPizza(params.id);
        setPizza(item);
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
