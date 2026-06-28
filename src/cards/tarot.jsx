import Field from '../components/field';
import Image from '../components/image';
import { useCard } from '../context/card';

const Tarot = () => {
    const { style } = useCard();
    return (
        <svg card-type='tarot' viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" class="character-card">
            <rect width={420} height={300} fill={style.base}/>

            {/* Ornate outer border */}
            <rect x={3}  y={3}  width={414} height={294} fill="none" stroke={style.trim} stroke-width="2"/>
            <rect x={8}  y={8}  width={404} height={284} fill="none" stroke={style.trim} stroke-width="0.5"/>
            <rect x={12} y={12} width={396} height={276} fill="none" stroke={style.trim} stroke-width="1"/>

            {/* Corner diamond ornaments */}
            <polygon points="3,14  14,3  25,14  14,25"  fill={style.trim}/>
            <polygon points="395,14 406,3 417,14 406,25" fill={style.trim}/>
            <polygon points="3,286 14,275 25,286 14,297" fill={style.trim}/>
            <polygon points="395,286 406,275 417,286 406,297" fill={style.trim}/>

            {/* Inner diamond fillings */}
            <polygon points="3,14  14,3  25,14  14,25"  fill={style.fill} transform="scale(0.5) translate(14,14)"/>

            {/* Portrait — left 2/3 minus stats */}
            <rect x={16} y={16} width={246} height={232} fill={style.fill}/>
            <Image name={'image'} x={16} y={16} width={246} height={232} size={22}
                newPosition={{x: 113, y: 106}} deletePosition={{x: 209, y: 14}}>
                <rect width={246} height={232}/>
            </Image>
            <rect x={16} y={16} width={246} height={232} fill="none" stroke={style.trim} stroke-width="1"/>

            {/* Stats column — right */}
            <rect x={270} y={16} width={140} height={232} fill={style.fill} opacity="0.4"/>
            <line x1={270} y1={16} x2={270} y2={248} stroke={style.trim} stroke-width="1"/>

            {/* Name in banner — bottom */}
            <rect x={16} y={252} width={388} height={40} fill={style.fill}/>
            <line x1={16} y1={252} x2={404} y2={252} stroke={style.trim} stroke-width="1.5"/>
            <Field name={'name'} x={20} y={255} width={280} height={34} align={'start'} text={{
                "font-family": "Cinzel, serif", "font-size": "1.2em", "font-weight": "bold"
            }} placeholder={'Character Name'}/>

            {/* HP & AC flanking name in footer */}
            <line x1={304} y1={252} x2={304} y2={292} stroke={style.trim} stroke-width="0.75"/>
            <text x={318} y={265} text-anchor="middle" font-family="Cinzel, serif" font-size="6" fill={style.trim}>HP</text>
            <Field name={'health'} x={308} y={268} width={20} height={20} align={'center'} text={{
                "font-family":"Cinzel, serif","font-size":"0.95em","font-weight":"bold"
            }} placeholder={"0"} max_length={3}/>

            <line x1={346} y1={252} x2={346} y2={292} stroke={style.trim} stroke-width="0.75"/>
            <text x={362} y={265} text-anchor="middle" font-family="Cinzel, serif" font-size="6" fill={style.trim}>AC</text>
            <Field name={'armor'} x={352} y={268} width={20} height={20} align={'center'} text={{
                "font-family":"Cinzel, serif","font-size":"0.95em","font-weight":"bold"
            }} placeholder={"0"} max_length={3}/>

            {/* Class in footer */}
            <line x1={16} y1={274} x2={302} y2={274} stroke={style.trim} stroke-width="0.4" opacity="0.5"/>
            <Field name={'class'} x={20} y={277} width={280} height={14} align={'start'} text={{
                "font-family": "Cinzel, serif", "font-size": "0.55em"
            }} placeholder={'Class & Race'}/>

            {/* Stats in right column */}
            <text x={340} y={32} text-anchor="middle" font-family="Cinzel, serif" font-size="6" letter-spacing="1.5" fill={style.trim}>ATTRIBUTES</text>
            <line x1={274} y1={36} x2={406} y2={36} stroke={style.trim} stroke-width="0.5"/>

            <text x={284} y={55}  font-family="Cinzel, serif" font-size="7" fill={style.trim}>STR</text>
            <rect x={312} y={45}  width={82} height={18} rx={2} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'strength'}     x={313} y={46}  width={80} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.8em"}} placeholder={"0"} max_length={3}/>

            <text x={284} y={82}  font-family="Cinzel, serif" font-size="7" fill={style.trim}>DEX</text>
            <rect x={312} y={72}  width={82} height={18} rx={2} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'dexterity'}    x={313} y={73}  width={80} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.8em"}} placeholder={"0"} max_length={3}/>

            <text x={284} y={109} font-family="Cinzel, serif" font-size="7" fill={style.trim}>CON</text>
            <rect x={312} y={99}  width={82} height={18} rx={2} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'constitution'} x={313} y={100} width={80} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.8em"}} placeholder={"0"} max_length={3}/>

            <text x={284} y={136} font-family="Cinzel, serif" font-size="7" fill={style.trim}>WIS</text>
            <rect x={312} y={126} width={82} height={18} rx={2} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'wisdom'}       x={313} y={127} width={80} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.8em"}} placeholder={"0"} max_length={3}/>

            <text x={284} y={163} font-family="Cinzel, serif" font-size="7" fill={style.trim}>INT</text>
            <rect x={312} y={153} width={82} height={18} rx={2} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'intelligence'} x={313} y={154} width={80} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.8em"}} placeholder={"0"} max_length={3}/>

            <text x={284} y={190} font-family="Cinzel, serif" font-size="7" fill={style.trim}>CHA</text>
            <rect x={312} y={180} width={82} height={18} rx={2} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'charisma'}     x={313} y={181} width={80} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.8em"}} placeholder={"0"} max_length={3}/>

            {/* Roman numeral / number in top band decoration */}
            <text x={393} y={292} text-anchor="middle" font-family="Cinzel, serif" font-size="5.5" fill={style.trim} opacity="0.4">✦</text>
        </svg>
    );
};

export default Tarot;
