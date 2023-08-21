import styles from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useRef, useState } from 'react';

const MealItemForm = (props) => {
    const [isAmountValid, setIsAmountValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const inputAmount = amountInputRef.current.value;

        if (inputAmount.trim().length === 0 || +inputAmount < 1 || +inputAmount > 10) {
            setIsAmountValid(false);
            return;
        }

        props.onAddToCart(+inputAmount);
    }

    return <form className={styles.form} onSubmit={submitHandler}>
        <Input label='Количество' ref={amountInputRef} input={{
            id: props.id,
            type: 'number',
            min: '1',
            step: '1',
            defaultValue: '1',
        }}
        />
        <button>Добавить</button>
        {!isAmountValid && <p>Введите количество от 1 до 10</p>}
    </form>
}

export default MealItemForm;