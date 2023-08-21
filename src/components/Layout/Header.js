import React, {Fragment} from 'react';
import sushiImage from '../assets/sushi.jpg';
import styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return (
        <Fragment>
            <header className={styles.header}>
                <h1>Японская кухня</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={styles['main-image']}>
                <img src={sushiImage} alt='Блюда японской кухни'/>
            </div>
        </Fragment>
    )
}

export default Header;