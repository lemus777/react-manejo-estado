import React from 'react';

function UseState({ name }) {
    const [error, setError] = React.useState(false); // esta constante define el estado de error, la funcion para cambiar su estado, y por defecto es false
    const [loading, setLoading] = React.useState(false); // esta constante define el estado de loading y la funcion para cambiar su estado

    // el useEffect simula la consulta al backend: 
    // hace un efecto (primer parámetro) que se va a consultar cada vez que cambie el estado de loading (segundo parámetro)
    // el primer parámetro es la función setTimeout que cambia el estado a falso después de una demora de 3000 milisegundos
    // para evitar que se active nada más cargar la página, como el estado inicial de loading es false, le decimos que setTimeout se ejecuta sólo si loading es true (doble negación !!)
    React.useEffect(() => {
        console.log('Empezando el efecto');

        if (!!loading) {
            setTimeout(() => {
                console.log('Haciendo la validación');
    
                setLoading(false);
    
                console.log('Terminando la validación');
            }, 3000);
        }

        console.log('Terminando el efecto');
    }, [loading]);

    return (
        <div>
            <h2>Eliminar {name}</h2>

            <p>Por favor, introduce el código de seguridad.</p>

            {error && ( // en el caso de que haya un error (error == true), entonces, renderiza nuestro párrafo
                <p>Error: el código es incorrecto</p>
            )}

            {loading && (
                <p>Cargando...</p>
            )}

            <input placeholder="Código de seguridad" />
            <button
                onClick={() => setLoading(true)} // Nuestro botón lanza un evento al hacer click, cambia el estado al opuesto (true - false)
            >Comprobar</button>
        </div>
    );
}

export { UseState };