import {
    CATCH_POKEMON
} from './ActionsTypes';

const initialState = {
    myPokemonList: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CATCH_POKEMON:
            return {
                ...state,
                myPokemonList: (action.data) ? [...state.myPokemonList, action.data] : state.myPokemonList
            };
        default:
            return state;
    }
}