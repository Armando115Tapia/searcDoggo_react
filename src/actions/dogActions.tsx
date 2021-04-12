import {ActionCreator, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import { IDogState } from '../reducers/dogReducer';

export enum DogActionTypes {
    RANDOM_DOG = 'RANDOM_DOG',
    LOAD_DOG = 'LOAD_DOG',
    ERROR = 'ERROR'
}

export interface IRandomDogAction {
    type: DogActionTypes.RANDOM_DOG;
    image: string;
}

export interface ILoadDogAction {
    type: DogActionTypes.LOAD_DOG;
    loading: boolean;
}

export interface IErrorAction {
    type: DogActionTypes.ERROR;
    errorMessage: string;
}

export type dogActions = IRandomDogAction | ILoadDogAction | IErrorAction;
/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */


export const RandomDogAction: ActionCreator<ThunkAction<Promise<any>, IDogState, null, IRandomDogAction>> = (dogBreed: string) => {

    return async (dispatch: Dispatch) => {
        try {
            let resp = await fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random`);
            let data = await resp.json();
            if (data.status !== 'success') {
                throw new Error(data.message);
            }
            dispatch({image: data.message, type: DogActionTypes.RANDOM_DOG});
        } catch (err) {
            console.log(err);
            dispatch({type: DogActionTypes.ERROR, errorMessage: err.message});
            dispatch({type: DogActionTypes.LOAD_DOG, loading: false});
        }
    }
}

export const loadDogAction: ActionCreator<ThunkAction<any, IDogState, null, ILoadDogAction>> = (shouldLoad: boolean) =>
    (dispatch: Dispatch) => dispatch({type: DogActionTypes.LOAD_DOG, loading: shouldLoad})
