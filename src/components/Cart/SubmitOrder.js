import useInput from '../hooks/use-input';
import styles from './SubmitOrder.module.css';

const SubmitOrder = (props) => {

    const {
        value: enteredName,
        isValid: isEnteredNameValid,
        hasError: isNameInputInvalid,
        inputChangeHandler: nameInputChangeHandler,
        inputLostFocusHandler: nameInputLostFocusHandler,
        submitFormHandler: nameSubmit,
        resetValues: nameInputReset,
    } = useInput(val => val.trim() !=='');

    const {
        value: enteredCity,
        isValid: isEnteredCityValid,
        hasError: isCityInputInvalid,
        inputChangeHandler: cityInputChangeHandler,
        inputLostFocusHandler: cityInputLostFocusHandler,
        submitFormHandler: citySubmit,
        resetValues: cityInputReset,
    } = useInput(val => val.trim() !=='' && val.length >= 3);

    const {
        value: enteredAddress,
        isValid: isEnteredAddressValid,
        hasError: isAddressInputInvalid,
        inputChangeHandler: addressInputChangeHandler,
        inputLostFocusHandler: addressInputLostFocusHandler,
        submitFormHandler: addressSubmit,
        resetValues: addressInputReset,
    } = useInput(val => val.trim() !=='' && val.includes(','));

    const isFormValid = isEnteredNameValid && isEnteredCityValid && isEnteredAddressValid;

    const confirmOrder = (ev) => {
        ev.preventDefault();

        if (!isEnteredNameValid) {
            nameSubmit();
        }  
        
        if (!isEnteredCityValid) {
            citySubmit();
        }
        
        if (!isEnteredAddressValid) {
            addressSubmit()
        }

        if (!isFormValid) {
            return
        }

        nameInputReset();
        cityInputReset();
        addressInputReset();

        props.onSubmit({
            name: enteredName,
            city: enteredCity,
            address: enteredAddress,
        });
    }

    const nameInputClasses = `${styles.control} ${isNameInputInvalid ? styles.invalid : ''}`;
    const cityInputClasses = `${styles.control} ${isCityInputInvalid ? styles.invalid : ''}`;
    const addressInputClasses = `${styles.control} ${isAddressInputInvalid ? styles.invalid : ''}`;

    return <form className={styles.form} onSubmit={confirmOrder}>
        <div className={nameInputClasses}>
            <label htmlFor='name'>Ваше имя</label>
            <input 
                type='text' 
                id='name'
                value={enteredName}
                onChange={nameInputChangeHandler}
                onBlur={nameInputLostFocusHandler}
            />
            {isNameInputInvalid && <p className={styles.error}>Некорректный ввод</p>}
        </div>
        <div className={cityInputClasses}>
            <label htmlFor='city'>Город доставки</label>
            <input 
                type='text' 
                id='city'
                value={enteredCity}
                onChange={cityInputChangeHandler}
                onBlur={cityInputLostFocusHandler}
            />
            {isCityInputInvalid && <p className={styles.error}>Некорректный ввод</p>}
        </div>
        <div className={addressInputClasses}>
            <label htmlFor='address'>Точный адрес доставки</label>
            <input 
                type='text' 
                id='address'
                value={enteredAddress}
                onChange={addressInputChangeHandler}
                onBlur={addressInputLostFocusHandler}
            />
            {isAddressInputInvalid && <p className={styles.error}>Введите улицу и дом через запятую</p>}
        </div>
        <div className={styles.actions}>
            <button  className={styles.submit}>Подтвердить заказ</button>
            <button type='button' onClick={props.onCancel}>Отменить</button>
        </div>
    </form>
}

export default SubmitOrder;