import { onMount } from 'solid-js';
import { useCard } from '../context/card';

const Field = (props) => {
    const { style, state } = useCard();

    const align = () => props.align;
    const textAnchor = () => props.align === 'center' ? 'middle' : props.align;
    const textX = () => {
        if (props.align === 'center') return props.x + props.width / 2;
        if (props.align === 'end') return props.x + props.width;
        return props.x;
    };
    const textY = () => props.y + props.height / 2;

    onMount(() => {
        if (!state[props.name])
            state[props.name] = '';
    });

    return (
        <svg name={props.name} className={'field'} x={0} y={0} width={props.width + props.x} height={props.height + props.y}>
            <text x={textX()} y={textY()} style={{
                "text-anchor": textAnchor(),
                "dominant-baseline": "central",
                "fill": style.trim,
                ...props.text
            }}></text>
            <foreignObject x={props.x} y={props.y} width={props.width} height={props.height}>
                <input
                    aria-label={props.name}
                    name={"field-" + props.name}
                    value={state[props.name]}
                    onInput={(e) => state[props.name] = e.target.value}
                    style={{
                        "border": "0",
                        "outline": "none",
                        "box-sizing": "border-box",
                        "width": "100%",
                        "height": "100%",
                        "background-color": "transparent",
                        "vertical-align": "top",
                        "text-align": align(),
                        "color": style.trim,
                        ...props.text
                    }}
                    placeholder={props.placeholder}
                    autocomplete='off'
                    maxLength={props.max_length}
                />
            </foreignObject>
        </svg>
    );
}

export default Field;
