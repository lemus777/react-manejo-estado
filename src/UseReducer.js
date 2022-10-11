import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

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
                    dispatch({ type: 'CONFIRM' });
                } else {
                    dispatch({ type: 'ERROR' });
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
                    onChange={(event) => {
                        dispatch({ type: 'WRITE', payload: event.target.value })
                        // onWrite(event.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        dispatch({ type: 'CHECK' })
                        // onCheck();
                    }}
                >Comprobar</button>
            </div>
        );
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>¿Seguro que quieres eliminar el archivo?</p>

                <button
                    onClick={() => {
                        dispatch({ type: 'DELETE' })
                        // onDelete();
                    }}
                >
                    Eliminar
                </button>

                <button
                    onClick={() => {
                        dispatch({ type: 'RESET' })
                        // onReset();
                    }}
                >
                    Cancelar
                </button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>

                <button
                    onClick={() => {
                        dispatch({ type: 'RESET' })
                        // onReset();
                    }}
                >
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

// Tercer tipo, dividido en dos, un reducerObject con los estados y un reducer con la lógica
const reducerObject = (state, payload) => ({
    'CONFIRM': {
        ...state, // esto nos mantiene todos los estados de State, y cambia sólo la declarada, pero no elimina el resto
        error: false,
        loading: false,
        confirmed: true,
    },
    'ERROR': {
        ...state,
        error: true,
        loading: false,
    },
    'WRITE': {
        ...state,
        value: payload,
    },
    'CHECK': {
        ...state,
        loading: true,
    },
    'DELETE': {
        ...state,
        deleted: true,
    },
    'RESET': {
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