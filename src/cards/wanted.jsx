import Field from '../components/field';
import Image from '../components/image';
import { useCard } from '../context/card';

const Wanted = () => {
    const { style } = useCard();
    return (
        <svg card-type='wanted' viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" class="character-card">
            <rect width={420} height={300} fill={style.fill}/>

            {/* Outer rough border — double line */}
            <rect x={4}  y={4}  width={412} height={292} fill="none" stroke={style.trim} stroke-width="2"/>
            <rect x={9}  y={9}  width={402} height={282} fill="none" stroke={style.trim} stroke-width="0.75"/>

            {/* Top banner */}
            <rect x={4} y={4} width={412} height={48} fill={style.trim}/>
            <text x={210} y={35} text-anchor="middle" dominant-baseline="central"
                font-family="Cinzel, serif" font-size="28" font-weight="bold"
                letter-spacing="8" fill={style.fill}>WANTED</text>

            {/* Stars flanking WANTED */}
            <text x={30}  y={28} text-anchor="middle" font-family="serif" font-size="14" fill={style.fill} opacity="0.7">★</text>
            <text x={390} y={28} text-anchor="middle" font-family="serif" font-size="14" fill={style.fill} opacity="0.7">★</text>

            {/* Portrait box */}
            <rect x={13} y={58} width={170} height={200} fill={style.base}/>
            <Image name={'image'} x={13} y={58} width={170} height={200} size={20}
                newPosition={{x: 75, y: 90}} deletePosition={{x: 135, y: 14}}>
                <rect width={170} height={200}/>
            </Image>
            <rect x={13} y={58} width={170} height={200} fill="none" stroke={style.trim} stroke-width="1.5"/>

            {/* Reward banner */}
            <rect x={13} y={262} width={170} height={26} fill={style.trim}/>
            <text x={98} y={275} text-anchor="middle" dominant-baseline="central"
                font-family="Cinzel, serif" font-size="8" letter-spacing="2" fill={style.fill}>DEAD OR ALIVE</text>

            {/* Name */}
            <Field name={'name'} x={192} y={60} width={218} height={34} align={'start'} text={{
                "font-family": "Cinzel, serif", "font-size": "1.35em", "font-weight": "bold"
            }} placeholder={'Name..'}/>
            <line x1={192} y1={98} x2={408} y2={98} stroke={style.trim} stroke-width="1"/>

            {/* Class */}
            <Field name={'class'} x={192} y={102} width={218} height={16} align={'start'} text={{
                "font-family": "Cinzel, serif", "font-size": "0.6em"
            }} placeholder={'Class & Race'}/>
            <line x1={192} y1={122} x2={408} y2={122} stroke={style.trim} stroke-width="0.5"/>

            {/* Stats — 2 columns of 3 */}
            <text x={220} y={134} font-family="Cinzel, serif" font-size="6.5" fill={style.trim} letter-spacing="1">STR</text>
            <rect x={246} y={127} width={28} height={18} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'strength'}     x={247} y={128} width={26} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.8em"}} placeholder={"0"} max_length={3}/>

            <text x={220} y={155} font-family="Cinzel, serif" font-size="6.5" fill={style.trim} letter-spacing="1">DEX</text>
            <rect x={246} y={148} width={28} height={18} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'dexterity'}    x={247} y={149} width={26} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.8em"}} placeholder={"0"} max_length={3}/>

            <text x={220} y={176} font-family="Cinzel, serif" font-size="6.5" fill={style.trim} letter-spacing="1">CON</text>
            <rect x={246} y={169} width={28} height={18} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'constitution'} x={247} y={170} width={26} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.8em"}} placeholder={"0"} max_length={3}/>

            <text x={295} y={134} font-family="Cinzel, serif" font-size="6.5" fill={style.trim} letter-spacing="1">WIS</text>
            <rect x={321} y={127} width={28} height={18} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'wisdom'}       x={322} y={128} width={26} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.8em"}} placeholder={"0"} max_length={3}/>

            <text x={295} y={155} font-family="Cinzel, serif" font-size="6.5" fill={style.trim} letter-spacing="1">INT</text>
            <rect x={321} y={148} width={28} height={18} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'intelligence'} x={322} y={149} width={26} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.8em"}} placeholder={"0"} max_length={3}/>

            <text x={295} y={176} font-family="Cinzel, serif" font-size="6.5" fill={style.trim} letter-spacing="1">CHA</text>
            <rect x={321} y={169} width={28} height={18} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'charisma'}     x={322} y={170} width={26} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.8em"}} placeholder={"0"} max_length={3}/>

            <line x1={192} y1={196} x2={408} y2={196} stroke={style.trim} stroke-width="0.5"/>

            {/* HP & AC */}
            <text x={220} y={210} font-family="Cinzel, serif" font-size="6.5" fill={style.trim}>HP</text>
            <rect x={236} y={202} width={38} height={26} rx={3} fill={style.base} stroke={style.trim} stroke-width="1"/>
            <Field name={'health'} x={237} y={204} width={36} height={22} align={'center'} text={{
                "font-family":"Cinzel, serif","font-size":"1.1em","font-weight":"bold"
            }} placeholder={"0"} max_length={3}/>

            <text x={295} y={210} font-family="Cinzel, serif" font-size="6.5" fill={style.trim}>AC</text>
            <rect x={311} y={202} width={38} height={26} rx={3} fill={style.base} stroke={style.trim} stroke-width="1"/>
            <Field name={'armor'} x={312} y={204} width={36} height={22} align={'center'} text={{
                "font-family":"Cinzel, serif","font-size":"1.1em","font-weight":"bold"
            }} placeholder={"0"} max_length={3}/>

            {/* Bottom strip */}
            <rect x={4} y={248} width={412} height={48} fill="none" stroke={style.trim} stroke-width="0.5"/>
            <text x={300} y={262} text-anchor="middle" font-family="Cinzel, serif" font-size="6" fill={style.trim} opacity="0.5">★ ★ ★</text>
            <text x={300} y={278} text-anchor="middle" font-family="Cinzel, serif" font-size="6" fill={style.trim} opacity="0.5">CharacterForge</text>
        </svg>
    );
};

export default Wanted;
