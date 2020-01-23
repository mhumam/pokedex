import {
    CATCH_POKEMON
} from './ActionsTypes';


export function catch_pokemon(data) {
    return {
        type: CATCH_POKEMON, data
    }
}