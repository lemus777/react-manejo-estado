import { toHaveFormValues } from "@testing-library/jest-dom/dist/matchers";

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};

// Primer tipo de reducer, con if
const reducerIf = (state, action) => {
    if (action.type === 'ERROR') {
        return {
            ...state,
            error: true,
            loading: false,
        };
    } else if (action.type === 'CHECK') {
        return {
            ...state,
            loading: true,
        };
    } else {
        return {
            ...state,
        };
    }
};

// Segundo tipo, con switch
const reducerSwitch = (state, action) => {
    switch (action.type) {
        case 'ERROR': 
            return {
                ...state,
                error: true,
                loading: false,
            };
        case 'CHECK': 
            return {
                ...state,
                loading: true,
            };
        default:
            return {
                ...state,
            };
    }
};

// Tercer tipo, dividido en dos, un reducerObject con los estados y un reducer con la lógica
const reducerObject = (state) => ({
    'ERROR': {
        ...state,
        error: true,
        loading: false,
    },
    'CHECK': {
        ...state,
        loading: true,
    },
});

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state)[action.type];
    } else {
        return state;
    }
};