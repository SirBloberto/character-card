import Field from '../components/field';
import Image from '../components/image';
import { useCard } from '../context/card';

const Nordic = () => {
    const { style } = useCard();
    return (
        <svg card-type='nordic' viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" class="character-card">
            <rect width={420} height={300} fill={style.base}/>

            {/* Top name banner */}
            <rect x={0} y={0} width={420} height={46} fill={style.fill}/>
            <line x1={0} y1={46} x2={420} y2={46} stroke={style.trim} stroke-width="3"/>
            <line x1={0} y1={50} x2={420} y2={50} stroke={style.trim} stroke-width="0.75"/>

            {/* Knotwork corner — top-left (overlapping rects) */}
            <rect x={4}  y={4}  width={30} height={6}  fill={style.trim}/>
            <rect x={4}  y={4}  width={6}  height={30} fill={style.trim}/>
            <rect x={8}  y={8}  width={22} height={4}  fill={style.base}/>
            <rect x={8}  y={8}  width={4}  height={22} fill={style.base}/>
            <rect x={10} y={10} width={14} height={3}  fill={style.trim}/>
            <rect x={10} y={10} width={3}  height={14} fill={style.trim}/>

            {/* Knotwork corner — top-right */}
            <rect x={386} y={4}  width={30} height={6}  fill={style.trim}/>
            <rect x={410} y={4}  width={6}  height={30} fill={style.trim}/>
            <rect x={390} y={8}  width={22} height={4}  fill={style.base}/>
            <rect x={408} y={8}  width={4}  height={22} fill={style.base}/>
            <rect x={396} y={10} width={14} height={3}  fill={style.trim}/>
            <rect x={407} y={10} width={3}  height={14} fill={style.trim}/>

            {/* Knotwork corner — bottom-left */}
            <rect x={4}  y={290} width={30} height={6}  fill={style.trim}/>
            <rect x={4}  y={266} width={6}  height={30} fill={style.trim}/>
            <rect x={8}  y={288} width={22} height={4}  fill={style.base}/>
            <rect x={8}  y={270} width={4}  height={22} fill={style.base}/>
            <rect x={10} y={287} width={14} height={3}  fill={style.trim}/>
            <rect x={10} y={276} width={3}  height={14} fill={style.trim}/>

            {/* Knotwork corner — bottom-right */}
            <rect x={386} y={290} width={30} height={6}  fill={style.trim}/>
            <rect x={410} y={266} width={6}  height={30} fill={style.trim}/>
            <rect x={390} y={288} width={22} height={4}  fill={style.base}/>
            <rect x={408} y={270} width={4}  height={22} fill={style.base}/>
            <rect x={396} y={287} width={14} height={3}  fill={style.trim}/>
            <rect x={407} y={276} width={3}  height={14} fill={style.trim}/>

            {/* Name in banner */}
            <Field name={'name'} x={50} y={10} width={260} height={28} align={'center'} text={{
                "font-family": "Cinzel, serif", "font-size": "1.3em", "font-weight": "bold"
            }} placeholder={'Name..'}/>

            {/* Class */}
            <Field name={'class'} x={50} y={55} width={160} height={16} align={'start'} text={{
                "font-family": "Cinzel, serif", "font-size": "0.6em"
            }} placeholder={'Class & Race'}/>
            <line x1={6} y1={75} x2={414} y2={75} stroke={style.trim} stroke-width="0.5" opacity="0.4"/>

            {/* Portrait — left */}
            <rect x={10} y={80} width={185} height={200} fill={style.fill}/>
            <Image name={'image'} x={10} y={80} width={185} height={200} size={20}
                newPosition={{x: 82.5, y: 90}} deletePosition={{x: 150, y: 14}}>
                <rect width={185} height={200}/>
            </Image>
            <rect x={10}  y={80} width={185} height={200} fill="none" stroke={style.trim} stroke-width="2"/>
            {/* Heavy corner brackets on portrait */}
            <rect x={10}  y={80}  width={16} height={4}  fill={style.trim}/>
            <rect x={10}  y={80}  width={4}  height={16} fill={style.trim}/>
            <rect x={179} y={80}  width={16} height={4}  fill={style.trim}/>
            <rect x={191} y={80}  width={4}  height={16} fill={style.trim}/>
            <rect x={10}  y={276} width={16} height={4}  fill={style.trim}/>
            <rect x={10}  y={264} width={4}  height={16} fill={style.trim}/>
            <rect x={179} y={276} width={16} height={4}  fill={style.trim}/>
            <rect x={191} y={264} width={4}  height={16} fill={style.trim}/>

            {/* Stats — right side, 2 col */}
            <text x={232} y={92}  font-family="Cinzel, serif" font-size="6.5" fill={style.trim}>STR</text>
            <rect x={260} y={82}  width={34} height={20} fill={style.fill} stroke={style.trim} stroke-width="1.5"/>
            <Field name={'strength'}     x={261} y={83}  width={32} height={18} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.85em"}} placeholder={"0"} max_length={3}/>

            <text x={315} y={92}  font-family="Cinzel, serif" font-size="6.5" fill={style.trim}>DEX</text>
            <rect x={343} y={82}  width={34} height={20} fill={style.fill} stroke={style.trim} stroke-width="1.5"/>
            <Field name={'dexterity'}    x={344} y={83}  width={32} height={18} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.85em"}} placeholder={"0"} max_length={3}/>

            <text x={232} y={122} font-family="Cinzel, serif" font-size="6.5" fill={style.trim}>CON</text>
            <rect x={260} y={112} width={34} height={20} fill={style.fill} stroke={style.trim} stroke-width="1.5"/>
            <Field name={'constitution'} x={261} y={113} width={32} height={18} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.85em"}} placeholder={"0"} max_length={3}/>

            <text x={315} y={122} font-family="Cinzel, serif" font-size="6.5" fill={style.trim}>WIS</text>
            <rect x={343} y={112} width={34} height={20} fill={style.fill} stroke={style.trim} stroke-width="1.5"/>
            <Field name={'wisdom'}       x={344} y={113} width={32} height={18} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.85em"}} placeholder={"0"} max_length={3}/>

            <text x={232} y={152} font-family="Cinzel, serif" font-size="6.5" fill={style.trim}>INT</text>
            <rect x={260} y={142} width={34} height={20} fill={style.fill} stroke={style.trim} stroke-width="1.5"/>
            <Field name={'intelligence'} x={261} y={143} width={32} height={18} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.85em"}} placeholder={"0"} max_length={3}/>

            <text x={315} y={152} font-family="Cinzel, serif" font-size="6.5" fill={style.trim}>CHA</text>
            <rect x={343} y={142} width={34} height={20} fill={style.fill} stroke={style.trim} stroke-width="1.5"/>
            <Field name={'charisma'}     x={344} y={143} width={32} height={18} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.85em"}} placeholder={"0"} max_length={3}/>

            {/* Rune divider */}
            <line x1={210} y1={170} x2={414} y2={170} stroke={style.trim} stroke-width="2"/>
            <text x={312} y={166} text-anchor="middle" font-family="Cinzel, serif" font-size="5.5" fill={style.trim} letter-spacing="2">ᚠᚢᚦᚨᚱᚲ</text>

            {/* HP & AC */}
            <text x={250} y={190} text-anchor="middle" font-family="Cinzel, serif" font-size="6.5" fill={style.trim}>HIT POINTS</text>
            <rect x={216} y={194} width={66} height={40} fill={style.fill} stroke={style.trim} stroke-width="2"/>
            <Field name={'health'} x={217} y={196} width={64} height={36} align={'center'} text={{
                "font-family":"Cinzel, serif","font-size":"1.6em","font-weight":"bold"
            }} placeholder={"0"} max_length={3}/>

            <text x={360} y={190} text-anchor="middle" font-family="Cinzel, serif" font-size="6.5" fill={style.trim}>ARMOR CLASS</text>
            <rect x={326} y={194} width={66} height={40} fill={style.fill} stroke={style.trim} stroke-width="2"/>
            <Field name={'armor'} x={327} y={196} width={64} height={36} align={'center'} text={{
                "font-family":"Cinzel, serif","font-size":"1.6em","font-weight":"bold"
            }} placeholder={"0"} max_length={3}/>

            {/* Bottom divider */}
            <line x1={6} y1={280} x2={414} y2={280} stroke={style.trim} stroke-width="0.5" opacity="0.4"/>
            <text x={312} y={291} text-anchor="middle" font-family="Cinzel, serif" font-size="5.5" fill={style.trim} opacity="0.4" letter-spacing="1">CharacterForge</text>
        </svg>
    );
};

export default Nordic;
