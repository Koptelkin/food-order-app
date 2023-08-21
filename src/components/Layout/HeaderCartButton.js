import { useContext, useState, useEffect } from "react";
import CartIcon from "../Cart/CartIcon";
import styles from './HeaderCartButton.module.css';
import CartContext from "../storage/cart-context";

const HeaderCartButton = (props) => {

    const cartContext = useContext(CartContext);

    const cartItemsNumber = cartContext.items.reduce((currentValue, item) => {
        return currentValue + item.amount;
    }, 0);

    const [isBtnAnimated, setIsBtnAnimated] = useState(false);

    const buttonClasses = `${styles.button} ${isBtnAnimated ? styles.bump : ''}`;

    useEffect(()=> {
        if (cartContext.items.length === 0) {
            return;
        }
        setIsBtnAnimated(true);

        const timer = setTimeout(()=> {
            setIsBtnAnimated(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }

    }, [cartContext.items])

    return (
        <button className={buttonClasses} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Корзина</span>
            <span className={styles.badge}>{cartItemsNumber}</span>
        </button>
    )
}

export default HeaderCartButton;