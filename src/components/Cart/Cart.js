import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import { Fragment, useContext, useState } from 'react';
import CartContext from '../storage/cart-context';
import CartItem from './CartItem';
import SubmitOrder from './SubmitOrder';

const Cart = (props) => {

    const cartContext = useContext(CartContext);

    const [isSubmitOrderAvailable, setIsSubmitOrderAvailable] = useState();
    const [isDataSubmitting, setIsDataSubmitting] = useState(false);
    const [wasDataSendingSuccesful, setWasDataSendingSuccesful] = useState(false);

    const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;
    const hasItems = cartContext.items.length > 0;

    const removeCartItemHandler = (id) => {
        cartContext.removeItem(id);
    };

    const addCartItemHandler = (item) => {
        cartContext.addItem({...item, amount: 1})
    };

    const submitOrderHandler = async (userData) => {
        setIsDataSubmitting(true);
        await fetch('https://react-server-4992b-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                order: cartContext.items,
            })
        });
        setIsDataSubmitting(false);
        setWasDataSendingSuccesful(true);
        cartContext.clearCart();
    }

    const cartItems = (
        <ul className={styles['cart-items']}>
            {cartContext.items.map(item => (
            <CartItem 
                key={item.id} 
                name={item.name} 
                amount={item.amount} 
                price={item.price} 
                onAdd={addCartItemHandler.bind(null, item)} 
                onRemove={removeCartItemHandler.bind(null, item.id)}
            />
            ))}
        </ul>
    );

    const orderHandler = () => {
        setIsSubmitOrderAvailable(true);
    }

    const modalButtons = (
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.onHideCart}>Закрыть</button>
            {hasItems && <button className={styles.button} onClick={orderHandler}>Заказать</button>}
        </div>
    )

    const cartModalContent = (
        <Fragment>
            {cartItems}
            <div className={styles.total}>
                <span>Итого</span>
                <span>{totalAmount}</span>
            </div>
            {isSubmitOrderAvailable && <SubmitOrder onSubmit={submitOrderHandler} onCancel={props.onHideCart}/>}
            {!isSubmitOrderAvailable && modalButtons}
        </Fragment>
    );

    const submittingDataContent = (
        <p>Отправка данных заказа...</p>
    )

    const submittedDataContent = (
        <Fragment>
            <p>Ваш заказ успешно отправлен!</p>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onHideCart}>Закрыть</button>
            </div>
        </Fragment>
        
    )

    return (
        <Modal onHideCart={props.onHideCart}>
            {!isDataSubmitting && !wasDataSendingSuccesful && cartModalContent}
            {isDataSubmitting && submittingDataContent}
            {wasDataSendingSuccesful && submittedDataContent}
        </Modal>
    )
}

export default Cart;