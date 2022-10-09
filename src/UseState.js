import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });

    const onConfirm = () => {
        setState({
            ...state, // esto nos mantiene todos los estados de State, y cambia sólo la declarada, pero no elimina el resto
            error: false,
            loading: false,
            confirmed: true,
        });
    };

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false,
        });
    };

    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue,
        });
    };

    const onCheck = () => {
        setState({
            ...state,
            loading: true,
        });
    };

    const onDelete = () => {
        setState({
            ...state,
            deleted: true,
        });
    };

    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: '',
        })
    }

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
                    onChange={(event) => {
                        onWrite(event.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        onCheck();
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
                        onDelete();
                    }}
                >
                    Eliminar
                </button>

                <button
                    onClick={() => {
                        onReset();
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
                        onReset();
                    }}
                >
                    Deshacer
                </button>
            </React.Fragment>
        )
    }
}

export { UseState };