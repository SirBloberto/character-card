import { onMount } from 'solid-js';
import { useCard } from '../context/card';

const Field = ({ name, x, y, width, height, align, text, placeholder }) => {
    const { style, state } = useCard();

    let textAnchor = align;
    if (align == "center")
        textAnchor = "middle";
    const textX = { "start": x, "center": x + width / 2, "end": x + width };
    const textY = y + height / 2;

    onMount(() => {
        if (!state[name])
            state[name] = '';
    });

    return (
        <svg name={name} className={'field'} x={0} y={0} width={width + x} height={height + y}>
            <text x={textX[align]} y={textY} style={{
                "text-anchor": textAnchor,
                "dominant-baseline": "central",
                "fill": style.trim,
                ...text
            }}></text>
            <foreignObject x={x} y={y} width={width} height={height}>
                <input name={"field-" + name} value={state[name]} onInput={(input) => state[name] = input.target.value} style={{
                    "border": "0",
                    "outline": "none",
                    "box-sizing": "border-box",
                    "width": "100%",
                    "height": "100%",
                    "background-color": "#00000000",
                    "vertical-align": "top",
                    "text-align": align,
                    "color": style.trim,
                    ...text
                }} placeholder={placeholder} />
            </foreignObject>
        </svg>
    );
}

export default Field;