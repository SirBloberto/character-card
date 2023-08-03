import Field from '../components/field';
import { useCard } from '../context/card';

const Basic = () => {
    const { style } = useCard();

    const Background = {
        "fill": style.base
    }

    const CardBorder = {
        "fill": "none",
        "stroke-width": "5px",
        "stroke": style.trim
    }

    const ImageBorder = {
        "fill": "none",
        "stroke-width": "4px",
        "stroke": style.trim
    }

    const Stat = {
        "fill": style.fill,
        "stroke-width": "2px",
        "stroke": style.trim
    }

    const SpecialStat = {
        "fill": style.fill,
        "stroke-width": "1px",
        "stroke": style.trim
    }

    const StatText = {
        "text-anchor": "middle",
        "dominant-baseline": "central",
        "fill": style.trim
    }

    const NameText = {
        "font-size": "1.5em",
        "font-weight": "bold",
    }

    const ClassText = {
        "font-size": "0.6em",
    }

    return (
        <svg card-type='basic' viewBox={"0 0 400 300"} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <mask id={'border'}>
                    <rect x={2.5} y={2.5} width={395} height={295} rx={20} ry={20} fill={'white'}/>
                </mask>
                <mask id={"image-mask"}>
                    <circle cx={515} cy={150} r={300} fill={'white'} mask={'url(#border)'}/>
                </mask>
            </defs>
            <rect x={2.5} y={2.5} width={395} height={295} rx={20} ry={20} style={Background}/>
            <g mask={'url(#border)'}>
                <rect x={-10} y={34} width={155} height={20} rx={8} ry={8} style={Stat} />
                <Field name={'class'} x={20} y={34} width={120} height={18} align={'start'} text={ClassText} placeholder={'Class..'}/>
            </g>
            <g mask={'url(#border)'}>
                <rect x={-10} y={4} width={200} height={30} rx={12} ry={12} style={Stat} />
                <Field name={'name'} x={20} y={6} width={160} height={26} align={'start'} text={NameText} placeholder={'Name..'}/>
            </g>
            <g transform={'translate(60 80)'}>
                <text x={-30} y={15} style={StatText}>STR</text>
                <rect width={30} height={30} rx={10} ry={10} style={Stat} />
                <Field name={'strength'} x={4} y={4} width={22} height={22} align={'center'} text={StatText}/>
            </g>
            <g transform={'translate(60 130)'}>
                <text x={-30} y={15} style={StatText}>DEX</text>
                <rect width={30} height={30} rx={10} ry={10} style={Stat} />
                <Field name={'dexterity'} x={4} y={4} width={22} height={22} align={'center'} text={StatText}/>
            </g>
            <g transform={'translate(60 180)'}>
                <text x={-30} y={15} style={StatText}>CON</text>
                <rect width={30} height={30} rx={10} ry={10} style={Stat} />
                <Field name={'constitution'} x={4} y={4} width={22} height={22} align={'center'} text={StatText}/>
            </g>
            <g transform={'translate(160 80)'}>
                <text x={-30} y={15} style={StatText}>INT</text>
                <rect width={30} height={30} rx={10} ry={10} style={Stat} />
                <Field name={'intelligence'} x={4} y={4} width={22} height={22} align={'center'} text={StatText}/>
            </g>
            <g transform={'translate(160 130)'}>
                <text x={-30} y={15} style={StatText}>WIS</text>
                <rect width={30} height={30} rx={10} ry={10} style={Stat} />
                <Field name={'wisdom'} x={4} y={4} width={22} height={22} align={'center'} text={StatText}/>
            </g>
            <g transform={'translate(160 180)'}>
                <text x={-30} y={15} style={StatText}>CHA</text>
                <rect width={30} height={30} rx={10} ry={10} style={Stat} />
                <Field name={'charisma'} x={4} y={4} width={22} height={22} align={'center'} text={StatText}/>
            </g>
            <g transform={'translate(51 235)'}>
                <text x={-15} y={22.5} style={StatText}>HP</text>
                <path transform={'scale(2 2)'} d={"M16.1111 3C19.6333 3 22 6.3525 22 9.48C22 15.8138 12.1778 21 12 21C11.8222 21 2 15.8138 2 9.48C2 6.3525 4.36667 3 7.88889 3C9.91111 3 11.2333 4.02375 12 4.92375C12.7667 4.02375 14.0889 3 16.1111 3Z"} style={SpecialStat} />
                <Field name={'health'} x={13} y={11.5} width={22} height={22} align={'center'} text={StatText}/>
            </g>
            <g transform={'translate(151 235)'}>
                <text x={-15} y={22.5} style={StatText}>AC</text>
                <path transform={'scale(2 2)'} d={'M11.302 21.6147C11.5234 21.7439 11.6341 21.8085 11.7903 21.842C11.9116 21.868 12.0884 21.868 12.2097 21.842C12.3659 21.8085 12.4766 21.7439 12.698 21.6147C14.646 20.4783 20 16.9083 20 11.9999V7.21747C20 6.41796 20 6.0182 19.8692 5.67457C19.7537 5.37101 19.566 5.10015 19.3223 4.8854C19.0465 4.64231 18.6722 4.50195 17.9236 4.22122L12.5618 2.21054C12.3539 2.13258 12.25 2.0936 12.143 2.07815C12.0482 2.06444 11.9518 2.06444 11.857 2.07815C11.75 2.0936 11.6461 2.13258 11.4382 2.21054L6.0764 4.22122C5.3278 4.50195 4.9535 4.64231 4.67766 4.8854C4.43398 5.10015 4.24627 5.37101 4.13076 5.67457C4 6.0182 4 6.41796 4 7.21747V11.9999C4 16.9083 9.35396 20.4783 11.302 21.6147Z'} style={SpecialStat} />
                <Field name={'armor'} x={13} y={11.5} width={22} height={22} align={'center'} text={StatText}/>
            </g>
            <g className='image' mask="url(#image-mask)">
                <circle cx={515} cy={150} r={300} clipPath={'url(#border)'} style={Stat}/>
                <circle cx={515} cy={150} r={300} clipPath={'url(#border)'} style={ImageBorder}/>
            </g>
            <rect x={2.5} y={2.5} width={395} height={295} rx={20} ry={20} style={CardBorder}/>
        </svg>
    );
}

export default Basic;