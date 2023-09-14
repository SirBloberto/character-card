import Basic from '../cards/basic';
import Fashion from '../cards/fashion';

export const CARDS = {
    'basic': Basic,
    'fashion': Fashion
}

export const CardType = (svg) => svg.querySelector("card-type");

export const toDefault = (state) => {
    for (const key in state) {
        if (typeof(state[key]) == 'string')
            state[key] = '';
        else if(typeof(state[key]) == 'number')
            state[key] = 0;
        else if(typeof(state[key]) == 'object') {
            state[key] = {
                data: null,
                translation: {x: 0, y: 0},
                scale: 1
            }
        }
    }
    return state;
}