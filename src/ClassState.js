import React from "react";
import { Loading } from "./Loading.js";

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
    constructor(props) {
        super(props); // para poder usar propiedades con this tenemos que recoger las props de ClassState en app, y llamar a super con esas props

        this.state = { // definimos el estado inicial para error y para loading
            value: '',
            error: false,
            loading: false,
        }
    }
    // cuando el componente se actualice (al cambiar estados) se ejecuta nuestro componentDidUpdate
    // si el estado es loading true se ejecuta el setTimeout, y el estado cambiará a false
    // al cambiar a false como se ha actualizado el estado vuelve a ejecutarse el componentDidUpdate, pero como loading es false no se ejecuta el setTimeout
    // Si no tuvieramos esta validación de estado de loading entraría en bucle infinito: declaro estado false, ejecuto didUpdate, false de nuevo, didUpdate...
    componentDidUpdate() {
        console.log('Actualización');

        if (!!this.state.loading) {
            setTimeout(() => {
                console.log('Haciendo la validación');

                if (SECURITY_CODE === this.state.value) {
                    this.setState({ error: false, loading: false }); // this.setState es una función por defecto de React.Component, vamos a decirle que nos cambie el valor de loading a false
                } else {
                    this.setState({ error: true, loading: false });
                }

                console.log('Terminando la validación');
            }, 3000)
        }
    }

    render() {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>

                <p>Por favor, introduce el código de seguridad.</p>

                {(this.state.error && !this.state.loading) && (
                    <p>Error: el código es incorrecto</p>
                )}

                {this.state.loading && ( // Cuando loading sea true renderizamos el componente Loading
                    <Loading />
                )}

                <input 
                    placeholder="Código de seguridad"
                    value={this.state.value}
                    onChange={(event) => {
                        this.setState({ value: event.target.value })
                    }}
                />
                <button
                    onClick={() => {this.setState({ loading: true })}} // this.setState es una función por defecto de React.Component, vamos a decirle que nos cambie el valor de loading a true
                >Comprobar</button>
            </div>
        );
    }
}

export { ClassState };