import Field from '../components/field';
import Image from '../components/image';
import { useCard } from '../context/card';

const Elven = () => {
    const { style } = useCard();
    return (
        <svg card-type='elven' viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" class="character-card">
            <defs>
                <clipPath id="elven-portrait">
                    <ellipse cx={112} cy={152} rx={94} ry={118}/>
                </clipPath>
            </defs>

            <rect width={420} height={300} fill={style.base}/>

            {/* Flowing organic border — outer */}
            <path d="M 30 4 Q 210 0 390 4 Q 418 4 416 30 Q 420 150 416 270 Q 418 296 390 296 Q 210 300 30 296 Q 2 296 4 270 Q 0 150 4 30 Q 2 4 30 4 Z"
                fill={style.fill} stroke={style.trim} stroke-width="1.5"/>

            {/* Inner flowing border */}
            <path d="M 38 12 Q 210 8 382 12 Q 408 12 406 36 Q 410 150 406 264 Q 408 288 382 288 Q 210 292 38 288 Q 12 288 14 264 Q 10 150 14 36 Q 12 12 38 12 Z"
                fill="none" stroke={style.trim} stroke-width="0.5" opacity="0.5"/>

            {/* Vine corner decorations — top-left */}
            <path d="M 14 20 Q 18 14 26 16 Q 20 20 18 28" fill="none" stroke={style.trim} stroke-width="1.5"/>
            <circle cx={22} cy={14} r={3} fill={style.trim}/>
            <circle cx={14} cy={22} r={2} fill={style.trim} opacity="0.6"/>
            <circle cx={28} cy={18} r={2} fill={style.trim} opacity="0.6"/>

            {/* Vine corner — top-right */}
            <path d="M 406 20 Q 402 14 394 16 Q 400 20 402 28" fill="none" stroke={style.trim} stroke-width="1.5"/>
            <circle cx={398} cy={14} r={3} fill={style.trim}/>
            <circle cx={406} cy={22} r={2} fill={style.trim} opacity="0.6"/>
            <circle cx={392} cy={18} r={2} fill={style.trim} opacity="0.6"/>

            {/* Vine corner — bottom-left */}
            <path d="M 14 280 Q 18 286 26 284 Q 20 280 18 272" fill="none" stroke={style.trim} stroke-width="1.5"/>
            <circle cx={22} cy={286} r={3} fill={style.trim}/>
            <circle cx={14} cy={278} r={2} fill={style.trim} opacity="0.6"/>
            <circle cx={28} cy={282} r={2} fill={style.trim} opacity="0.6"/>

            {/* Vine corner — bottom-right */}
            <path d="M 406 280 Q 402 286 394 284 Q 400 280 402 272" fill="none" stroke={style.trim} stroke-width="1.5"/>
            <circle cx={398} cy={286} r={3} fill={style.trim}/>
            <circle cx={406} cy={278} r={2} fill={style.trim} opacity="0.6"/>
            <circle cx={392} cy={282} r={2} fill={style.trim} opacity="0.6"/>

            {/* Portrait — oval */}
            <ellipse cx={112} cy={152} rx={94} ry={118} fill={style.base}/>
            <g clip-path="url(#elven-portrait)">
                <Image name={'image'} x={18} y={34} width={188} height={236} size={20}
                    newPosition={{x: 84, y: 108}} deletePosition={{x: 153, y: 14}}>
                    <ellipse cx={94} cy={118} rx={94} ry={118}/>
                </Image>
            </g>
            <ellipse cx={112} cy={152} rx={94} ry={118} fill="none" stroke={style.trim} stroke-width="1.5"/>

            {/* Leaf on top of portrait oval */}
            <path d="M 112 32 Q 118 22 112 16 Q 106 22 112 32 Z" fill={style.trim}/>
            <path d="M 112 272 Q 118 282 112 288 Q 106 282 112 272 Z" fill={style.trim}/>

            {/* Vine divider between portrait and stats */}
            <path d="M 218 30 Q 222 150 218 270" fill="none" stroke={style.trim} stroke-width="0.75" opacity="0.4" stroke-dasharray="2,4"/>
            <circle cx={218} cy={150} r={3} fill={style.trim} opacity="0.5"/>
            <circle cx={218} cy={90}  r={2} fill={style.trim} opacity="0.4"/>
            <circle cx={218} cy={210} r={2} fill={style.trim} opacity="0.4"/>

            {/* Name */}
            <Field name={'name'} x={228} y={20} width={178} height={26} align={'start'} text={{
                "font-family": "Cinzel, serif", "font-size": "1.05em", "font-weight": "bold"
            }} placeholder={'Name..'}/>
            <path d="M 226 50 Q 317 46 408 50" fill="none" stroke={style.trim} stroke-width="0.75"/>

            {/* Class */}
            <Field name={'class'} x={228} y={54} width={178} height={16} align={'start'} text={{
                "font-family": "Cinzel, serif", "font-size": "0.6em"
            }} placeholder={'Class & Background'}/>
            <path d="M 226 74 Q 317 78 408 74" fill="none" stroke={style.trim} stroke-width="0.4" opacity="0.6"/>

            {/* Stats */}
            <text x={248} y={92}  font-family="Cinzel, serif" font-size="7" fill={style.trim}>STR</text>
            <rect x={282} y={83}  width={28} height={18} rx={9} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'strength'}     x={283} y={84}  width={26} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.8em"}} placeholder={"0"} max_length={3}/>

            <text x={330} y={92}  font-family="Cinzel, serif" font-size="7" fill={style.trim}>DEX</text>
            <rect x={364} y={83}  width={28} height={18} rx={9} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'dexterity'}    x={365} y={84}  width={26} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.8em"}} placeholder={"0"} max_length={3}/>

            <text x={248} y={120} font-family="Cinzel, serif" font-size="7" fill={style.trim}>CON</text>
            <rect x={282} y={111} width={28} height={18} rx={9} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'constitution'} x={283} y={112} width={26} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.8em"}} placeholder={"0"} max_length={3}/>

            <text x={330} y={120} font-family="Cinzel, serif" font-size="7" fill={style.trim}>WIS</text>
            <rect x={364} y={111} width={28} height={18} rx={9} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'wisdom'}       x={365} y={112} width={26} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.8em"}} placeholder={"0"} max_length={3}/>

            <text x={248} y={148} font-family="Cinzel, serif" font-size="7" fill={style.trim}>INT</text>
            <rect x={282} y={139} width={28} height={18} rx={9} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'intelligence'} x={283} y={140} width={26} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.8em"}} placeholder={"0"} max_length={3}/>

            <text x={330} y={148} font-family="Cinzel, serif" font-size="7" fill={style.trim}>CHA</text>
            <rect x={364} y={139} width={28} height={18} rx={9} fill={style.base} stroke={style.trim} stroke-width="0.75"/>
            <Field name={'charisma'}     x={365} y={140} width={26} height={16} align={'center'} text={{"font-family":"Cinzel, serif","font-size":"0.8em"}} placeholder={"0"} max_length={3}/>

            {/* HP & AC */}
            <path d="M 226 166 Q 317 162 408 166" fill="none" stroke={style.trim} stroke-width="0.75"/>

            <text x={258} y={180} text-anchor="middle" font-family="Cinzel, serif" font-size="6.5" fill={style.trim}>HIT POINTS</text>
            <rect x={228} y={184} width={60} height={34} rx={17} fill={style.base} stroke={style.trim} stroke-width="1"/>
            <Field name={'health'} x={229} y={186} width={58} height={30} align={'center'} text={{
                "font-family":"Cinzel, serif","font-size":"1.3em","font-weight":"bold"
            }} placeholder={"0"} max_length={3}/>

            <text x={358} y={180} text-anchor="middle" font-family="Cinzel, serif" font-size="6.5" fill={style.trim}>ARMOR CLASS</text>
            <rect x={328} y={184} width={60} height={34} rx={17} fill={style.base} stroke={style.trim} stroke-width="1"/>
            <Field name={'armor'} x={329} y={186} width={58} height={30} align={'center'} text={{
                "font-family":"Cinzel, serif","font-size":"1.3em","font-weight":"bold"
            }} placeholder={"0"} max_length={3}/>

            <text x={317} y={280} text-anchor="middle" font-family="Cinzel, serif" font-size="5.5" fill={style.trim} opacity="0.4" letter-spacing="1">✦ CharacterForge ✦</text>
        </svg>
    );
};

export default Elven;
