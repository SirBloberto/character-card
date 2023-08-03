import { useCard } from '../context/card';

const Field = ({ name, x, y, width, height, align, text, placeholder }) => {
    const { style, setState } = useCard();

    let textAnchor = align;
    if (align == "center")
        textAnchor = "middle"
    const textX = { "start": x, "center": x + width / 2, "end": x + width };
    const textY = y + height / 2;

    return (
        <svg name={name} className={'field'}>
            <text x={textX[align]} y={textY} style={{
                "text-anchor": textAnchor,
                "dominant-baseline": "central",
                "fill": style.trim,
                ...text,
            }}></text>
            <foreignObject x={x} y={y} width={width} height={height} >
                <input style={{
                    "border": "0",
                    "outline": "none",
                    "box-sizing": "border-box",
                    "width": "100%",
                    "height": "100%",
                    "background-color": "#00000000",
                    "text-align": align,
                    "fill": style.trim,
                    ...text
                }} placeholder={placeholder} onInput={(input) => setState(name, input.target.value)} />
            </foreignObject>
        </svg>
    );
}

export default Field;