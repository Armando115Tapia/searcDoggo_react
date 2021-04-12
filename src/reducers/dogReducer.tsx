import {Reducer} from 'redux';
import {DogActionTypes, dogActions} from '../actions/dogActions';

// Define what the store should look like
export interface IDogState {
    image: string;
    loading: boolean;
    errorMessage: string;
}

// Set the initial state
const initialDogState: IDogState = {
    image: '',
    loading: false,
    errorMessage: ''
};

export const dogReducer: Reducer<IDogState, dogActions> =
    (state = initialDogState, action) => {

        switch (action.type) {
            case DogActionTypes.RANDOM_DOG: {
                return {
                    ...state,
                    image: action.image
                };
            }
            case DogActionTypes.LOAD_DOG: {
                return {
                    ...state,
                    loading: action.loading
                };
            }
            case DogActionTypes.ERROR: {
                return {
                    ...state,
                    errorMessage: action.errorMessage,
                    image: ''
                }
            }
            default:
                return state;
        }
    };