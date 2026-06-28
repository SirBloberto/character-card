import Field from '../components/field';
import Image from '../components/image';
import { useCard } from '../context/card';

const Arcane = () => {
    const { style } = useCard();
    const cx = 118, cy = 150, r = 100;
    return (
        <svg card-type='arcane' viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" class="character-card">
            <defs>
                <clipPath id="arcane-circle">
                    <circle cx={cx} cy={cy} r={r - 3}/>
                </clipPath>
            </defs>

            <rect width={420} height={300} fill={style.base}/>

            {/* Outer ring decoration */}
            <circle cx={cx} cy={cy} r={r + 18} fill="none" stroke={style.trim} stroke-width="0.5" opacity="0.3"/>
            <circle cx={cx} cy={cy} r={r + 12} fill="none" stroke={style.trim} stroke-width="0.5" opacity="0.5"/>
            <circle cx={cx} cy={cy} r={r + 6}  fill="none" stroke={style.trim} stroke-width="1"/>
            <circle cx={cx} cy={cy} r={r}       fill={style.fill} stroke={style.trim} stroke-width="2"/>

            {/* Cardinal tick marks */}
            <line x1={cx}       y1={cy-r-6}  x2={cx}       y2={cy-r-18} stroke={style.trim} stroke-width="1.5"/>
            <line x1={cx}       y1={cy+r+6}  x2={cx}       y2={cy+r+18} stroke={style.trim} stroke-width="1.5"/>
            <line x1={cx-r-6}   y1={cy}      x2={cx-r-18}  y2={cy}      stroke={style.trim} stroke-width="1.5"/>
            <line x1={cx+r+6}   y1={cy}      x2={cx+r+18}  y2={cy}      stroke={style.trim} stroke-width="1.5"/>
            <line x1={cx-72}    y1={cy-72}   x2={cx-80}    y2={cy-80}   stroke={style.trim} stroke-width="1" opacity="0.5"/>
            <line x1={cx+72}    y1={cy-72}   x2={cx+80}    y2={cy-80}   stroke={style.trim} stroke-width="1" opacity="0.5"/>
            <line x1={cx-72}    y1={cy+72}   x2={cx-80}    y2={cy+80}   stroke={style.trim} stroke-width="1" opacity="0.5"/>
            <line x1={cx+72}    y1={cy+72}   x2={cx+80}    y2={cy+80}   stroke={style.trim} stroke-width="1" opacity="0.5"/>

            {/* Portrait in circle */}
            <g clip-path="url(#arcane-circle)">
                <circle cx={cx} cy={cy} r={r-3} fill={style.fill}/>
                <Image name={'image'} x={cx-(r-3)} y={cy-(r-3)} width={(r-3)*2} height={(r-3)*2} size={20}
                    newPosition={{x: r-13, y: r-13}} deletePosition={{x: (r-3)*2-30, y: 6}}>
                    <circle cx={r-3} cy={r-3} r={r-3}/>
                </Image>
            </g>
            <circle cx={cx} cy={cy} r={r-3} fill="none" stroke={style.trim} stroke-width="2"/>

            {/* Divider */}
            <line x1={240} y1={10} x2={240} y2={290} stroke={style.trim} stroke-width="0.75" opacity="0.35"/>

            {/* Name */}
            <Field name={'name'} x={250} y={14} width={160} height={28} align={'start'} text={{
                "font-family": "Cinzel, serif", "font-size": "1.1em", "font-weight": "bold"
            }} placeholder={'Name..'}/>
            <line x1={248} y1={46} x2={414} y2={46} stroke={style.trim} stroke-width="0.75"/>

            {/* Class */}
            <Field name={'class'} x={250} y={50} width={160} height={16} align={'start'} text={{
                "font-family": "Cinzel, serif", "font-size": "0.6em"
            }} placeholder={'Class & Background'}/>
            <line x1={248} y1={70} x2={414} y2={70} stroke={style.trim} stroke-width="0.4" stroke-dasharray="2,3"/>

            {/* Stats — pill rows */}
            <text x={262} y={94}  font-family="Cinzel, serif" font-size="7" fill={style.trim}>STR</text>
            <rect x={292} y={82}  width={116} height={20} rx={10} fill={style.fill} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'strength'}     x={293} y={83}  width={40} height={18} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.85em"}} placeholder={"0"} max_length={3}/>

            <text x={262} y={118} font-family="Cinzel, serif" font-size="7" fill={style.trim}>DEX</text>
            <rect x={292} y={106} width={116} height={20} rx={10} fill={style.fill} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'dexterity'}    x={293} y={107} width={40} height={18} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.85em"}} placeholder={"0"} max_length={3}/>

            <text x={262} y={142} font-family="Cinzel, serif" font-size="7" fill={style.trim}>CON</text>
            <rect x={292} y={130} width={116} height={20} rx={10} fill={style.fill} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'constitution'} x={293} y={131} width={40} height={18} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.85em"}} placeholder={"0"} max_length={3}/>

            <text x={262} y={166} font-family="Cinzel, serif" font-size="7" fill={style.trim}>WIS</text>
            <rect x={292} y={154} width={116} height={20} rx={10} fill={style.fill} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'wisdom'}       x={293} y={155} width={40} height={18} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.85em"}} placeholder={"0"} max_length={3}/>

            <text x={262} y={190} font-family="Cinzel, serif" font-size="7" fill={style.trim}>INT</text>
            <rect x={292} y={178} width={116} height={20} rx={10} fill={style.fill} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'intelligence'} x={293} y={179} width={40} height={18} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.85em"}} placeholder={"0"} max_length={3}/>

            <text x={262} y={214} font-family="Cinzel, serif" font-size="7" fill={style.trim}>CHA</text>
            <rect x={292} y={202} width={116} height={20} rx={10} fill={style.fill} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'charisma'}     x={293} y={203} width={40} height={18} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.85em"}} placeholder={"0"} max_length={3}/>

            {/* HP & AC */}
            <line x1={248} y1={230} x2={414} y2={230} stroke={style.trim} stroke-width="0.75"/>
            <text x={274} y={245} text-anchor="middle" font-family="Cinzel, serif" font-size="6.5" fill={style.trim}>HP</text>
            <rect x={252} y={249} width={44} height={28} rx={4} fill={style.fill} stroke={style.trim} stroke-width="1"/>
            <Field name={'health'} x={253} y={251} width={42} height={24} align={'center'} text={{
                "font-family":"Cinzel, serif","font-size":"1.2em","font-weight":"bold"
            }} placeholder={"0"} max_length={3}/>

            <text x={368} y={245} text-anchor="middle" font-family="Cinzel, serif" font-size="6.5" fill={style.trim}>AC</text>
            <rect x={346} y={249} width={44} height={28} rx={4} fill={style.fill} stroke={style.trim} stroke-width="1"/>
            <Field name={'armor'} x={347} y={251} width={42} height={24} align={'center'} text={{
                "font-family":"Cinzel, serif","font-size":"1.2em","font-weight":"bold"
            }} placeholder={"0"} max_length={3}/>

            {/* Corner marks */}
            <text x={12}  y={18}  font-family="serif" font-size="12" fill={style.trim} opacity="0.3">᛭</text>
            <text x={408} y={18}  text-anchor="end" font-family="serif" font-size="12" fill={style.trim} opacity="0.3">᛭</text>
            <text x={12}  y={296} font-family="serif" font-size="12" fill={style.trim} opacity="0.3">᛭</text>
            <text x={408} y={296} text-anchor="end" font-family="serif" font-size="12" fill={style.trim} opacity="0.3">᛭</text>

            <rect x={2} y={2} width={416} height={296} fill="none" stroke={style.trim} stroke-width="1.5"/>
        </svg>
    );
};

export default Arcane;
