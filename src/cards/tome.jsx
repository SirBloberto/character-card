import Field from '../components/field';
import Image from '../components/image';
import { useCard } from '../context/card';

const Tome = () => {
    const { style } = useCard();
    return (
        <svg card-type='tome' viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" class="character-card">
            <rect width={420} height={300} fill={style.base}/>

            {/* Left page */}
            <rect x={4} y={4} width={200} height={292} fill={style.fill}/>

            {/* Spine */}
            <rect x={204} y={0} width={14} height={300} fill={style.trim}/>
            <line x1={206} y1={0} x2={206} y2={300} stroke="rgba(0,0,0,0.18)" stroke-width="1"/>
            <line x1={216} y1={0} x2={216} y2={300} stroke="rgba(0,0,0,0.18)" stroke-width="1"/>
            <rect x={206} y={40}  width={9} height={1} fill="rgba(0,0,0,0.2)"/>
            <rect x={206} y={80}  width={9} height={1} fill="rgba(0,0,0,0.2)"/>
            <rect x={206} y={120} width={9} height={1} fill="rgba(0,0,0,0.2)"/>
            <rect x={206} y={160} width={9} height={1} fill="rgba(0,0,0,0.2)"/>
            <rect x={206} y={200} width={9} height={1} fill="rgba(0,0,0,0.2)"/>
            <rect x={206} y={240} width={9} height={1} fill="rgba(0,0,0,0.2)"/>
            <rect x={206} y={260} width={9} height={1} fill="rgba(0,0,0,0.2)"/>

            {/* Right page */}
            <rect x={218} y={4} width={198} height={292} fill={style.fill}/>

            {/* Portrait — left page */}
            <rect x={14} y={14} width={180} height={272} fill={style.base}/>
            <Image name={'image'} x={14} y={14} width={180} height={272} size={20}
                newPosition={{x: 80, y: 126}} deletePosition={{x: 145, y: 14}}>
                <rect width={180} height={272}/>
            </Image>
            <rect x={14} y={14} width={180} height={272} fill="none" stroke={style.trim} stroke-width="1.5"/>
            <text x={104} y={298} text-anchor="middle" font-family="Cinzel, serif" font-size="5.5" fill={style.trim} opacity="0.45" letter-spacing="1">CHARACTER PORTRAIT</text>

            {/* Right page — name */}
            <Field name={'name'} x={224} y={14} width={186} height={26} align={'start'} text={{
                "font-family": "Cinzel, serif", "font-size": "1.1em", "font-weight": "bold"
            }} placeholder={'Character Name'}/>
            <line x1={222} y1={43} x2={412} y2={43} stroke={style.trim} stroke-width="1"/>

            {/* Class */}
            <Field name={'class'} x={224} y={47} width={186} height={16} align={'start'} text={{
                "font-family": "Cinzel, serif", "font-size": "0.6em"
            }} placeholder={'Class & Background'}/>
            <line x1={222} y1={67} x2={412} y2={67} stroke={style.trim} stroke-width="0.5"/>

            {/* Attributes label */}
            <text x={317} y={78} text-anchor="middle" font-family="Cinzel, serif" font-size="6" letter-spacing="2" fill={style.trim}>ATTRIBUTES</text>

            {/* Stats row 1 */}
            <text x={244} y={95}  text-anchor="middle" font-family="Cinzel, serif" font-size="7" fill={style.trim}>STR</text>
            <rect x={228} y={98}  width={32} height={22} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'strength'}     x={229} y={99}  width={30} height={20} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.9em"}} placeholder={"0"} max_length={3}/>

            <text x={317} y={95}  text-anchor="middle" font-family="Cinzel, serif" font-size="7" fill={style.trim}>DEX</text>
            <rect x={301} y={98}  width={32} height={22} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'dexterity'}    x={302} y={99}  width={30} height={20} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.9em"}} placeholder={"0"} max_length={3}/>

            <text x={390} y={95}  text-anchor="middle" font-family="Cinzel, serif" font-size="7" fill={style.trim}>CON</text>
            <rect x={374} y={98}  width={32} height={22} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'constitution'} x={375} y={99}  width={30} height={20} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.9em"}} placeholder={"0"} max_length={3}/>

            {/* Stats row 2 */}
            <text x={244} y={135} text-anchor="middle" font-family="Cinzel, serif" font-size="7" fill={style.trim}>WIS</text>
            <rect x={228} y={138} width={32} height={22} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'wisdom'}       x={229} y={139} width={30} height={20} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.9em"}} placeholder={"0"} max_length={3}/>

            <text x={317} y={135} text-anchor="middle" font-family="Cinzel, serif" font-size="7" fill={style.trim}>INT</text>
            <rect x={301} y={138} width={32} height={22} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'intelligence'} x={302} y={139} width={30} height={20} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.9em"}} placeholder={"0"} max_length={3}/>

            <text x={390} y={135} text-anchor="middle" font-family="Cinzel, serif" font-size="7" fill={style.trim}>CHA</text>
            <rect x={374} y={138} width={32} height={22} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'charisma'}     x={375} y={139} width={30} height={20} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.9em"}} placeholder={"0"} max_length={3}/>

            <line x1={222} y1={170} x2={412} y2={170} stroke={style.trim} stroke-width="0.5"/>

            {/* HP */}
            <text x={258} y={181} text-anchor="middle" font-family="Cinzel, serif" font-size="6.5" fill={style.trim}>HIT POINTS</text>
            <rect x={228} y={184} width={60} height={36} rx={3} fill={style.base} stroke={style.trim} stroke-width="1"/>
            <Field name={'health'} x={229} y={186} width={58} height={32} align={'center'} text={{
                "font-family":"Cinzel, serif","font-size":"1.5em","font-weight":"bold"
            }} placeholder={"0"} max_length={3}/>

            {/* AC */}
            <text x={358} y={181} text-anchor="middle" font-family="Cinzel, serif" font-size="6.5" fill={style.trim}>ARMOR CLASS</text>
            <rect x={328} y={184} width={60} height={36} rx={3} fill={style.base} stroke={style.trim} stroke-width="1"/>
            <Field name={'armor'} x={329} y={186} width={58} height={32} align={'center'} text={{
                "font-family":"Cinzel, serif","font-size":"1.5em","font-weight":"bold"
            }} placeholder={"0"} max_length={3}/>

            <line x1={222} y1={234} x2={412} y2={234} stroke={style.trim} stroke-width="0.5" stroke-dasharray="3,3"/>
            <text x={317} y={270} text-anchor="middle" font-family="Cinzel, serif" font-size="6" fill={style.trim} opacity="0.45">✦ CharacterForge ✦</text>

            {/* Outer border */}
            <rect x={2} y={2} width={416} height={296} fill="none" stroke={style.trim} stroke-width="2.5"/>
        </svg>
    );
};

export default Tome;
