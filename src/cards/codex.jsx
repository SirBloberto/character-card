import Field from '../components/field';
import Image from '../components/image';
import { useCard } from '../context/card';

const Codex = () => {
    const { style } = useCard();
    return (
        <svg card-type='codex' viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" class="character-card">
            <rect width={420} height={300} fill={style.base}/>

            {/* Header band */}
            <rect x={0} y={0} width={420} height={52} fill={style.fill}/>
            <rect x={0} y={50} width={420} height={3} fill={style.trim}/>

            {/* Trim accent bar on left */}
            <rect x={0} y={0} width={5} height={300} fill={style.trim}/>

            {/* Name in header */}
            <Field name={'name'} x={16} y={10} width={240} height={32} align={'start'} text={{
                "font-family": "Cinzel, serif", "font-size": "1.3em", "font-weight": "bold"
            }} placeholder={'Character Name'}/>

            {/* Class — right of header */}
            <Field name={'class'} x={16} y={57} width={240} height={16} align={'start'} text={{
                "font-family": "Cinzel, serif", "font-size": "0.6em"
            }} placeholder={'Class & Background'}/>
            <line x1={5} y1={77} x2={278} y2={77} stroke={style.trim} stroke-width="0.5" opacity="0.5"/>

            {/* Portrait — right column */}
            <rect x={280} y={0} width={140} height={300} fill={style.fill}/>
            <line x1={280} y1={0} x2={280} y2={300} stroke={style.trim} stroke-width="2"/>
            <Image name={'image'} x={280} y={0} width={140} height={300} size={20}
                newPosition={{x: 60, y: 140}} deletePosition={{x: 105, y: 14}}>
                <rect width={140} height={300}/>
            </Image>

            {/* Stat rows — tabular */}
            <rect x={5}   y={86} width={270} height={24} fill="rgba(255,255,255,0.03)"/>
            <rect x={5}   y={86} width={270} height={24} fill="none" stroke={style.trim} stroke-width="0.4" opacity="0.3"/>
            <text x={14}  y={102} font-family="Cinzel, serif" font-size="7.5" fill={style.trim} letter-spacing="1">STRENGTH</text>
            <rect x={210} y={89} width={36} height={18} rx={2} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'strength'}     x={211} y={90} width={34} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.85em","font-weight":"bold"}} placeholder={"0"} max_length={3}/>

            <rect x={5}   y={114} width={270} height={24} fill="rgba(255,255,255,0.02)"/>
            <text x={14}  y={130} font-family="Cinzel, serif" font-size="7.5" fill={style.trim} letter-spacing="1">DEXTERITY</text>
            <rect x={210} y={117} width={36} height={18} rx={2} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'dexterity'}    x={211} y={118} width={34} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.85em","font-weight":"bold"}} placeholder={"0"} max_length={3}/>

            <rect x={5}   y={142} width={270} height={24} fill="rgba(255,255,255,0.03)"/>
            <text x={14}  y={158} font-family="Cinzel, serif" font-size="7.5" fill={style.trim} letter-spacing="1">CONSTITUTION</text>
            <rect x={210} y={145} width={36} height={18} rx={2} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'constitution'} x={211} y={146} width={34} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.85em","font-weight":"bold"}} placeholder={"0"} max_length={3}/>

            <rect x={5}   y={170} width={270} height={24} fill="rgba(255,255,255,0.02)"/>
            <text x={14}  y={186} font-family="Cinzel, serif" font-size="7.5" fill={style.trim} letter-spacing="1">WISDOM</text>
            <rect x={210} y={173} width={36} height={18} rx={2} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'wisdom'}       x={211} y={174} width={34} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.85em","font-weight":"bold"}} placeholder={"0"} max_length={3}/>

            <rect x={5}   y={198} width={270} height={24} fill="rgba(255,255,255,0.03)"/>
            <text x={14}  y={214} font-family="Cinzel, serif" font-size="7.5" fill={style.trim} letter-spacing="1">INTELLIGENCE</text>
            <rect x={210} y={201} width={36} height={18} rx={2} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'intelligence'} x={211} y={202} width={34} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.85em","font-weight":"bold"}} placeholder={"0"} max_length={3}/>

            <rect x={5}   y={226} width={270} height={24} fill="rgba(255,255,255,0.02)"/>
            <text x={14}  y={242} font-family="Cinzel, serif" font-size="7.5" fill={style.trim} letter-spacing="1">CHARISMA</text>
            <rect x={210} y={229} width={36} height={18} rx={2} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'charisma'}     x={211} y={230} width={34} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.85em","font-weight":"bold"}} placeholder={"0"} max_length={3}/>

            {/* Footer band */}
            <rect x={5} y={258} width={270} height={2} fill={style.trim} opacity="0.5"/>

            {/* HP & AC */}
            <text x={40}  y={272} text-anchor="middle" font-family="Cinzel, serif" font-size="6.5" fill={style.trim}>HP</text>
            <rect x={10}  y={275} width={58} height={22} rx={2} fill={style.fill} stroke={style.trim} stroke-width="1"/>
            <Field name={'health'} x={11}  y={277} width={56} height={18} align={'center'} text={{
                "font-family":"Cinzel, serif","font-size":"0.95em","font-weight":"bold"
            }} placeholder={"0"} max_length={3}/>

            <text x={118} y={272} text-anchor="middle" font-family="Cinzel, serif" font-size="6.5" fill={style.trim}>AC</text>
            <rect x={88}  y={275} width={58} height={22} rx={2} fill={style.fill} stroke={style.trim} stroke-width="1"/>
            <Field name={'armor'} x={89}  y={277} width={56} height={18} align={'center'} text={{
                "font-family":"Cinzel, serif","font-size":"0.95em","font-weight":"bold"
            }} placeholder={"0"} max_length={3}/>

            <text x={200} y={290} text-anchor="middle" font-family="Cinzel, serif" font-size="5.5" fill={style.trim} opacity="0.35" letter-spacing="1">CharacterForge</text>
        </svg>
    );
};

export default Codex;
