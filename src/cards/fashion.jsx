import { useCard } from "../context/card";
import Field from '../components/field';
import Image from '../components/image';

const Ability = ({ name, x, y, text }) => {
    const { style } = useCard();

    return (
        <g transform={`translate(${x} ${y})`}>
            <text x={-30} y={15} style={{
                "text-anchor": "start",
                "dominant-baseline": "central",
                "fill": style.trim
            }}>{text}</text>
            <Field name={name} x={4} y={4} width={22} height={22} align={'center'} text={{"font-family": "Helvetica, sans-serif"}}/>
        </g>
    );
}

const Fashion = () => {
    const { style } = useCard();

    return (
        <svg card-type='fashion' viewBox={"0 0 400 300"} xmlns="http://www.w3.org/2000/svg" class="character-card">
            <defs>
                <mask id={"fashion-image-mask"}>
                    <rect x={19.5} y={44.5} width={191} height={191} rx={30} ry={30} fill={'white'}/>
                </mask>
            </defs>
            <rect x={5} y={5} width={390} height={290} style={{
                "fill": style.base,
                "stroke-width": "1px",
                "stroke": style.trim
            }}/>
            <g mask="url(#fashion-image-mask)">
                <rect x={20} y={45} width={190} height={190} rx={30} ry={30} style={{
                    "fill": style.fill,
                    "stroke-width": "2px",
                    "stroke": style.trim
                }}/>
                <Image name={'image'} x={20} y={45} width={190} height={190} size={20} newPosition={{x: (190 - 20) / 2, y: (190 - 20) / 2}} deletePosition={{x: 190 - 20 - 15, y: 15}}>
                    <rect x={0} y={0} width={190} height={190} rx={30} ry={30} clipPath={'url(#fashion-image-mask)'}/>
                </Image>
                <rect x={20} y={45} width={190} height={190} rx={30} ry={30} clipPath={'url(#fashion-image-mask)'} style={{
                    "fill": "none",
                    "stroke-width": "2px",
                    "stroke": style.trim
                }}/>
            </g>
            <g>
                <rect x={225} y={222.5} width={145} height={25} rx={12.5} style={{
                    "fill": style.fill,
                    "stroke-width": "1.5px",
                    "stroke": style.trim
                }}/>
                <Field name={'class'} x={245} y={226.5} width={120} height={17} align={'start'} text={{
                    "font-size": "0.6em",
                    "font-family": "Helvetica, sans-serif"
                }} placeholder={'Class..'}/>
            </g>
            <g>
                <rect x={40} y={215} width={200} height={40} rx={20} style={{
                    "fill": style.fill,
                    "stroke-width": "2px",
                    "stroke": style.trim
                }}/>
                <Field name={'name'} x={55} y={222} width={170} height={26} align={'start'} text={{
                    "font-size": "1.5em",
                    "font-weight": "bold",
                    "font-family": "Helvetica, sans-serif"
                }} placeholder={'Name..'}/>
            </g>
            <rect x={5} y={20} width={390} height={2} style={{"fill": style.trim}}/>
            <rect x={5} y={30} width={390} height={2} style={{"fill": style.trim}}/>
            <rect x={5} y={270} width={390} height={2} style={{"fill": style.trim}}/>
            <rect x={5} y={280} width={390} height={2} style={{"fill": style.trim}}/>
            <rect x={235} y={105} width={140} height={30} rx={15} style={{
                "fill": style.fill,
                "stroke-width": "1.5px",
                "stroke": style.trim
            }}/>
            <rect x={235} y={140} width={140} height={30} rx={15} style={{
                "fill": style.fill,
                "stroke-width": "1.5px",
                "stroke": style.trim
            }}/>
            <rect x={235} y={175} width={140} height={30} rx={15} style={{
                "fill": style.fill,
                "stroke-width": "1.5px",
                "stroke": style.trim
            }}/>
            <rect x={305} y={103} width={4} height={34} rx={2} style={{"fill": style.trim}}/>
            <rect x={305} y={138} width={4} height={34} rx={2} style={{"fill": style.trim}}/>
            <rect x={305} y={173} width={4} height={34} rx={2} style={{"fill": style.trim}}/>
            <Ability name={'strength'} x={275} y={105} text={'STR'}/>
            <Ability name={'dexterity'} x={275} y={140} text={'DEX'}/>
            <Ability name={'constitution'} x={275} y={175} text={'CON'}/>
            <Ability name={'wisdom'} x={345} y={105} text={'WIS'}/>
            <Ability name={'intelligence'} x={345} y={140} text={'INT'}/>
            <Ability name={'charisma'} x={345} y={175} text={'CHA'}/>
            <g transform={'translate(241 45)'}>
                <path transform={'scale(2 2)'} d={"M16.1111 3C19.6333 3 22 6.3525 22 9.48C22 15.8138 12.1778 21 12 21C11.8222 21 2 15.8138 2 9.48C2 6.3525 4.36667 3 7.88889 3C9.91111 3 11.2333 4.02375 12 4.92375C12.7667 4.02375 14.0889 3 16.1111 3Z"} style={{
                    "fill": style.fill,
                    "stroke-width": "0.75px",
                    "stroke": style.trim
                }}/>
                <Field name={'health'} x={13} y={11.5} width={22} height={22} align={'center'} text={{"font-family": "Helvetica, sans-serif"}}/>
            </g>
            <g transform={'translate(311 45)'}>
                <path transform={'scale(2 2)'} d={'M11.302 21.6147C11.5234 21.7439 11.6341 21.8085 11.7903 21.842C11.9116 21.868 12.0884 21.868 12.2097 21.842C12.3659 21.8085 12.4766 21.7439 12.698 21.6147C14.646 20.4783 20 16.9083 20 11.9999V7.21747C20 6.41796 20 6.0182 19.8692 5.67457C19.7537 5.37101 19.566 5.10015 19.3223 4.8854C19.0465 4.64231 18.6722 4.50195 17.9236 4.22122L12.5618 2.21054C12.3539 2.13258 12.25 2.0936 12.143 2.07815C12.0482 2.06444 11.9518 2.06444 11.857 2.07815C11.75 2.0936 11.6461 2.13258 11.4382 2.21054L6.0764 4.22122C5.3278 4.50195 4.9535 4.64231 4.67766 4.8854C4.43398 5.10015 4.24627 5.37101 4.13076 5.67457C4 6.0182 4 6.41796 4 7.21747V11.9999C4 16.9083 9.35396 20.4783 11.302 21.6147Z'} style={{
                    "fill": style.fill,
                    "stroke-width": "0.75px",
                    "stroke": style.trim
                }}/>
                <Field name={'armor'} x={13} y={11.5} width={22} height={22} align={'center'} text={{"font-family": "Helvetica, sans-serif"}}/>
            </g>
            <path transform='translate(1 1) scale(1 1)' d="M 0 10 L 0 38 Q 0 40 2 40 L 9 40 Q 10 40 11 39 Q 20 20 39 11 Q 40 10 40 9 L 40 2 Q 40 0 38 0 L 10 0 Q 0 0 0 10" style={{
                "fill": style.fill,
                "stroke-width": "1px",
                "stroke": style.trim}} />
            <path transform='translate(399 299) scale(-1 -1)' d="M 0 10 L 0 38 Q 0 40 2 40 L 9 40 Q 10 40 11 39 Q 20 20 39 11 Q 40 10 40 9 L 40 2 Q 40 0 38 0 L 10 0 Q 0 0 0 10" style={{
                "fill": style.fill,
                "stroke-width": "1px",
                "stroke": style.trim}} />
            <path transform='translate(399 1) scale(-1 1)' d="M 0 10 L 0 38 Q 0 40 2 40 L 9 40 Q 10 40 11 39 Q 20 20 39 11 Q 40 10 40 9 L 40 2 Q 40 0 38 0 L 10 0 Q 0 0 0 10" style={{
                "fill": style.fill,
                "stroke-width": "1px",
                "stroke": style.trim}}/>
            <path transform='translate(1 299) scale(1 -1)' d="M 0 10 L 0 38 Q 0 40 2 40 L 9 40 Q 10 40 11 39 Q 20 20 39 11 Q 40 10 40 9 L 40 2 Q 40 0 38 0 L 10 0 Q 0 0 0 10" style={{
                "fill": style.fill,
                "stroke-width": "1px",
                "stroke": style.trim}}/>
        </svg>
    )
}

export default Fashion;