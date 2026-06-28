import Basic from '../cards/basic';
import Fashion from '../cards/fashion';
import Tome from '../cards/tome';
import Wanted from '../cards/wanted';
import Arcane from '../cards/arcane';
import Nordic from '../cards/nordic';
import Elven from '../cards/elven';
import Codex from '../cards/codex';
import Tarot from '../cards/tarot';

export const CARDS = {
    'basic': Basic,
    'fashion': Fashion,
    'tome': Tome,
    'wanted': Wanted,
    'arcane': Arcane,
    'nordic': Nordic,
    'elven': Elven,
    'codex': Codex,
    'tarot': Tarot,
}

export function toDefault(state) {
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
