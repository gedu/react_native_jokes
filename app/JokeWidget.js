import axios from 'axios';
import { connect } from 'react-redux';

import JokeView from './JokeView';

const LOADING_JOKE = "joke/LOADING";
const SUCCESS_JOKE = "joke/SUCCESS";
const ERROR_JOKE = "joke/ERROR";

const initialState = {
    isLoading: false,
    error: null,
    joke: ""
}

export const JokeReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOADING_JOKE: return { ...state, isLoading: true };
        case SUCCESS_JOKE: return { ...state, isLoading: false, joke: action.data.joke, error: null }
        case ERROR_JOKE: return { ...state, isLoading: false, error: action.error }
        default: return state;
    }
}

export const onSuccess = (data) => {
    return { type: SUCCESS_JOKE, data: data};
}

export const onLoading = () => {
    return { type: LOADING_JOKE };
}

export const onError = (error) => {
    return { type: ERROR_JOKE, error: error };
}

const mapState = (state) => {
    return {
        isLoading: state.JokeReducer.isLoading,
        joke: state.JokeReducer.joke,
        error: state.JokeReducer.error
    };
}

const mapDispatch = (dispatch) => {
    return {
        getNextJoke: () => dispatch(callJokeService())
    }
}

const callJokeService = () => {
    return dispatch => {
        dispatch(onLoading());
        return axios.get('https://icanhazdadjoke.com/', { headers: { 'Accept': 'application/json'} })
            .then(response => {
                dispatch(onSuccess(response.data))
            })
            .catch(error => {
                dispatch(onError(error));
            })
    }
}

export default connect(mapState, mapDispatch)(JokeView);