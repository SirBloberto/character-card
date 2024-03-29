import Field from '../components/field';
import Image from '../components/image';
import { useCard } from '../context/card';

const Ability = ({ name, x, y, text }) => {
    const { style } = useCard();

    return (
        <g transform={`translate(${x} ${y})`}>
            <text x={-30} y={15} style={{
                "text-anchor": "middle",
                "dominant-baseline": "central",
                "fill": style.trim
            }}>{text}</text>
            <rect width={30} height={30} rx={10} ry={10} style={{
                "fill": style.fill,
                "stroke-width": "2px",
                "stroke": style.trim
            }} />
            <Field name={name} x={4} y={4} width={22} height={22} align={'center'} text={{"font-family": "Helvetica, sans-serif"}}/>
        </g>
    );
}
 
const Basic = () => {
    const { style } = useCard();

    return (
        <svg card-type='basic' viewBox={"0 0 400 300"} xmlns="http://www.w3.org/2000/svg" class="character-card">
            <defs>
                <mask id={'basic-border'}>
                    <rect x={2.5} y={2.5} width={395} height={295} rx={20} ry={20} fill={'white'}/>
                </mask>
                <mask id={"basic-image-mask"}>
                    <circle cx={515} cy={150} r={300} fill={'white'} mask={'url(#basic-border)'}/>
                </mask>
            </defs>
            <rect x={2.5} y={2.5} width={395} height={295} rx={20} ry={20} style={{
                "fill": style.base
            }}/>
            <g mask={'url(#basic-border)'}>
                <rect x={-10} y={34} width={155} height={20} rx={8} ry={8} style={{
                    "fill": style.fill,
                    "stroke-width": "2px",
                    "stroke": style.trim
                }} />
                <Field name={'class'} x={20} y={35.5} width={120} height={17} align={'start'} text={{
                    "font-size": "0.6em",
                    "font-family": "Helvetica, sans-serif"
                }} placeholder={'Class..'}/>
            </g>
            <g mask={'url(#basic-border)'}>
                <rect x={-10} y={4} width={200} height={30} rx={12} ry={12} style={{
                    "fill": style.fill,
                    "stroke-width": "2px",
                    "stroke": style.trim
                }} />
                <Field name={'name'} x={20} y={6} width={160} height={26} align={'start'} text={{
                    "font-size": "1.5em",
                    "font-weight": "bold",
                    "font-family": "Helvetica, sans-serif"
                }} placeholder={'Name..'}/>
            </g>
            <Ability name={'strength'} x={60} y={80} text={'STR'}/>
            <Ability name={'dexterity'} x={60} y={130} text={'DEX'}/>
            <Ability name={'constitution'} x={60} y={180} text={'CON'}/>
            <Ability name={'wisdom'} x={160} y={80} text={'WIS'}/>
            <Ability name={'intelligence'} x={160} y={130} text={'INT'}/>
            <Ability name={'charisma'} x={160} y={180} text={'CHA'}/>
            <g transform={'translate(51 235)'}>
                <text x={-15} y={22.5} style={{
                    "text-anchor": "middle",
                    "dominant-baseline": "central",
                    "fill": style.trim
                }}>HP</text>
                <path transform={'scale(2 2)'} d={"M16.1111 3C19.6333 3 22 6.3525 22 9.48C22 15.8138 12.1778 21 12 21C11.8222 21 2 15.8138 2 9.48C2 6.3525 4.36667 3 7.88889 3C9.91111 3 11.2333 4.02375 12 4.92375C12.7667 4.02375 14.0889 3 16.1111 3Z"} style={{
                    "fill": style.fill,
                    "stroke-width": "1px",
                    "stroke": style.trim
                }} />
                <Field name={'health'} x={13} y={11.5} width={22} height={22} align={'center'} text={{"font-family": "Helvetica, sans-serif"}}/>
            </g>
            <g transform={'translate(151 235)'}>
                <text x={-15} y={22.5} style={{
                    "text-anchor": "middle",
                    "dominant-baseline": "central",
                    "fill": style.trim
                }}>AC</text>
                <path transform={'scale(2 2)'} d={'M11.302 21.6147C11.5234 21.7439 11.6341 21.8085 11.7903 21.842C11.9116 21.868 12.0884 21.868 12.2097 21.842C12.3659 21.8085 12.4766 21.7439 12.698 21.6147C14.646 20.4783 20 16.9083 20 11.9999V7.21747C20 6.41796 20 6.0182 19.8692 5.67457C19.7537 5.37101 19.566 5.10015 19.3223 4.8854C19.0465 4.64231 18.6722 4.50195 17.9236 4.22122L12.5618 2.21054C12.3539 2.13258 12.25 2.0936 12.143 2.07815C12.0482 2.06444 11.9518 2.06444 11.857 2.07815C11.75 2.0936 11.6461 2.13258 11.4382 2.21054L6.0764 4.22122C5.3278 4.50195 4.9535 4.64231 4.67766 4.8854C4.43398 5.10015 4.24627 5.37101 4.13076 5.67457C4 6.0182 4 6.41796 4 7.21747V11.9999C4 16.9083 9.35396 20.4783 11.302 21.6147Z'} style={{
                    "fill": style.fill,
                    "stroke-width": "1px",
                    "stroke": style.trim
                }} />
                <Field name={'armor'} x={13} y={11.5} width={22} height={22} align={'center'} text={{"font-family": "Helvetica, sans-serif"}}/>
            </g>
            <g mask="url(#basic-image-mask)">
                <circle cx={515} cy={150} r={300} clipPath={'url(#basic-border)'} style={{
                    "fill": style.fill,
                    "stroke-width": "2px",
                    "stroke": style.trim
                }}/>
                <Image name={'image'} x={215} y={0} width={185} height={300} size={20} newPosition={{x: (185 - 20) / 2, y: (300 - 20) / 2}} deletePosition={{x: 185 - 20 - 15, y: 15}}>
                    <circle cx={300} cy={150} r={300} clipPath={'url(#basic-border)'}/>
                </Image>
                <circle cx={515} cy={150} r={300} clipPath={'url(#basic-border)'} style={{
                    "fill": "none",
                    "stroke-width": "4px",
                    "stroke": style.trim
                }}/>
            </g>
            <rect x={2.5} y={2.5} width={395} height={295} rx={20} ry={20} style={{
                "fill": "none",
                "stroke-width": "5px",
                "stroke": style.trim
            }}/>
        </svg>
    );
}

export default Basic;