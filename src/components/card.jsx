import { Dynamic } from 'solid-js/web';
import { useCard } from '../context/card';
import { CARDS } from '../utilities/load';

const Card = () => {
    const { type } = useCard();

    return (
        <Dynamic component={CARDS[type()]}/>
    );
}

export default Card;