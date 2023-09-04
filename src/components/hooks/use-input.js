import { useReducer } from 'react';

const initialInputState = {
    enteredValue: '',
    wasTouched: false,
}

const inputStateReducer = (state, action) => {
    if (action.type === 'CHANGE') {
        return {
            enteredValue: action.value,
            wasTouched: state.wasTouched,
        }
    }
    if (action.type === 'BLUR') {
        return {
            enteredValue: state.enteredValue,
            wasTouched: true,
        }
    }
    if (action.type === 'SUBMIT') {
        return {
            enteredValue: '',
            wasTouched: true,
        }
    }
    if (action.type === 'RESET') {
        return {
            enteredValue: '',
            wasTouched: false
        }
    }

    return initialInputState
}

const useInput = (validateInputFunc) => {
    const [inputState, dispatchAction] = useReducer(inputStateReducer, initialInputState);

    const isEnteredValueValid = validateInputFunc(inputState.enteredValue);
    const isInputInvalid = !isEnteredValueValid && inputState.wasTouched;

    const inputChangeHandler = (event) => {
        dispatchAction({type: 'CHANGE', value: event.target.value});
    }

    const inputLostFocusHandler = () => {
        dispatchAction({type: 'BLUR'})
    }

    const submitFormHandler = () => {
        dispatchAction({type: 'SUBMIT'})
    }

    const resetValues = () => {
        dispatchAction({type: 'RESET'});
    }

    return {
        value: inputState.enteredValue,
        isValid: isEnteredValueValid,
        hasError: isInputInvalid,
        inputChangeHandler,
        inputLostFocusHandler,
        submitFormHandler,
        resetValues,
    }
}

export default useInput;