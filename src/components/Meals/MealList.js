import { useEffect, useState} from 'react';
import styles from './MealList.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';


const MealList = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState();

  useEffect(()=> {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch('https://react-server-4992b-default-rtdb.firebaseio.com/meals.json');
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error('Что-то пошло не так');
      }

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          desciption: responseData[key].description,
          price: responseData[key].price,
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }
    
    fetchMeals().catch((err) => {
      setIsLoading(false);
      setHttpErrorMessage(err.message);
    })
  }, []);

  if (isLoading) {
    return <section className={styles.loading}>
      <p>Получение данных с сервера...</p>
    </section>
  }

  if (httpErrorMessage) {
    return <section className={styles.error}>
      <p>{httpErrorMessage}</p>
    </section>
  }

    const mealList = meals.map(meal => 
        <MealItem 
            name={meal.name} 
            price={meal.price} 
            description={meal.description} 
            key={meal.id}
            id={meal.id}
        />
    )

    return <section className={styles.meals}>
        <Card>
            <ul>
                {mealList}
            </ul>
        </Card>
    </section>
}

export default MealList;
  