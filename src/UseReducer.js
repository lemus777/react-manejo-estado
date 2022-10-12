import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    
    const onConfirm = () => dispatch({ type: actionTypes.confirm });
    const onError = () => dispatch({ type: actionTypes.error });
    const onWrite = ({ target: { value } }) => dispatch({ type: actionTypes.write, payload: value });
    const onCheck = () => dispatch({ type: actionTypes.check });
    const onDelete = () => dispatch({ type: actionTypes.delete });
    const onReset = () => dispatch({ type: actionTypes.reset });

    // el useEffect simula la consulta al backend: 
    // hace un efecto (primer parámetro) que se va a consultar cada vez que cambie el estado de loading (segundo parámetro)
    // el primer parámetro es la función setTimeout que cambia el estado a falso después de una demora de 3000 milisegundos
    // para evitar que se active nada más cargar la página, como el estado inicial de loading es false, le decimos que setTimeout se ejecuta sólo si loading es true (doble negación !!)
    React.useEffect(() => {
        console.log('Empezando el efecto');

        if (!!state.loading) {
            setTimeout(() => {
                console.log('Haciendo la validación');

                if (state.value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError();
                }

                console.log('Terminando la validación');
            }, 3000);
        }

        console.log('Terminando el efecto');
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
    
                <p>Por favor, introduce el código de seguridad.</p>
    
                {(state.error && !state.loading) && ( // en el caso de que haya un error (error == true) y que no estemos cargando, entonces, renderiza nuestro párrafo
                    <p>Error: el código es incorrecto</p>
                )}
    
                {state.loading && (
                    <p>Cargando...</p>
                )}
    
                <input 
                    placeholder="Código de seguridad"
                    value={state.value}
                    onChange={onWrite}
                />
                <button onClick={onCheck}>
                    Comprobar
                </button>
            </div>
        );
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>¿Seguro que quieres eliminar el archivo?</p>

                <button onClick={onDelete}>
                    Eliminar
                </button>

                <button onClick={onReset}>
                    Cancelar
                </button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>

                <button onClick={onReset}>
                    Deshacer
                </button>
            </React.Fragment>
        )
    }
}

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};

const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    write: 'WRITE',
    check: 'CHECK',
    delete: 'DELETE',
    reset: 'RESET',
};

// Tercer tipo, dividido en dos, un reducerObject con los estados y un reducer con la lógica
const reducerObject = (state, payload) => ({
    [actionTypes.confirm]: {
        ...state, // esto nos mantiene todos los estados de State, y cambia sólo la declarada, pero no elimina el resto
        error: false,
        loading: false,
        confirmed: true,
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.write]: {
        ...state,
        value: payload,
    },
    [actionTypes.check]: {
        ...state,
        loading: true,
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true,
    },
    [actionTypes.reset]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    },
});

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
};

export { UseReducer };