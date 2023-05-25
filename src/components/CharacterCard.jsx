import React from 'react';
import styled from 'styled-components';

const Drag = styled.g`
  cursor: grab;
`;

let selectedElementDrag, offset, transformTranslate;
function startDrag(evt) {
    let svg = document.getElementById('character-card');
    if (evt.target.classList.contains('draggable')) {
        selectedElementDrag = evt.target;
        offset = getMousePosition(evt);
        var transforms = selectedElementDrag.transform.baseVal;
        for (let i = 0; i < transforms.length; i++) {
            if (transforms.getItem(i).type === SVGTransform.SVG_TRANSFORM_TRANSLATE){
                transformTranslate = transforms.getItem(i);
                break;
            }
        }
        if(!transformTranslate) {
            transformTranslate = svg.createSVGTransform();
            transformTranslate.setTranslate(0, 0);
            selectedElementDrag.transform.baseVal.insertItemBefore(transformTranslate, 0);
        }
        offset.x -= transformTranslate.matrix.e;
        offset.y -= transformTranslate.matrix.f;
    }
}

function drag(evt) {
    if (selectedElementDrag) {
        var coord = getMousePosition(evt);
        transformTranslate.setTranslate(coord.x - offset.x, coord.y - offset.y);
    }
}

function endDrag(evt) {
    selectedElementDrag = null;
}

function getMousePosition(evt) {
    let svg = document.getElementById("character-card");
    var CTM = svg.getScreenCTM();
    return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
    };
}

let transformScale;
function scroll(evt) {
    let svg = document.getElementById('character-card');
    if (evt.target.classList.contains('draggable')) {
        let target = evt.target
        var transforms = target.transform.baseVal;
        for (let i = 0; i < transforms.length; i++) {
            if (transforms.getItem(i).type === SVGTransform.SVG_TRANSFORM_SCALE){
                transformScale = transforms.getItem(i);
                break;
            }
        }
        let mousePosition = getMousePosition(evt);
        mousePosition.x -= transformTranslate.matrix.e;
        mousePosition.y -= transformTranslate.matrix.f;
        if(!transformScale) {
            transformScale = svg.createSVGTransform();
            transformScale.setScale(1, 1);
            target.transform.baseVal.appendItem(transformScale);
        }
        let scaleFactor = evt.deltaY < 0 ? 1.1 : 0.9
        transformScale.setScale(transformScale.matrix.a * scaleFactor, transformScale.matrix.d * scaleFactor)
        transformTranslate.setTranslate(transformTranslate.matrix.e + mousePosition.x * (1 - scaleFactor), transformTranslate.matrix.f + mousePosition.y * (1 - scaleFactor))
    }
}

const CharacterCard = ({ state, style }) => {
    const Background = {
        "fill": style.base
    }

    const CardBorder = {
        "fill": "none",
        "strokeWidth": "5px",
        "stroke": style.trim
    }

    const ImageBorder = {
        "fill": "none",
        "strokeWidth": "4px",
        "stroke": style.trim
    }

    const Stat = {
        "fill": style.fill,
        "strokeWidth": "2px",
        "stroke": style.trim
    }

    const SpecialStat = {
        "fill": style.fill,
        "strokeWidth": "1px",
        "stroke": style.trim
    }

    const StatText = {
        "textAnchor": "middle",
        "dominantBaseline": "central",
        "fill": style.trim
    }

    const ClassText = {
        "dominantBaseline": "central",
        "fontSize": "0.6em",
        "fill": style.trim
    }

    const NameText = {
        "dominantBaseline": "central",
        "fontSize": "1.5em",
        "fontWeight": "bold",
        "fill": style.trim
    }

    return (
        <svg viewBox={"0 0 400 300"} id='character-card' xmlns="http://www.w3.org/2000/svg" onMouseDown={startDrag} onMouseMove={drag} onMouseUp={endDrag} onMouseLeave={endDrag} onWheel={scroll}>
            <defs>
                <mask id={'border'}>
                    <rect x={2.5} y={2.5} width={395} height={295} rx={20} ry={20} fill={'white'}/>
                </mask>
                <mask id={"image-mask"}>
                    <circle cx={515} cy={150} r={300} fill={'white'} mask={'url(#border)'}/>
                </mask>
            </defs>
            <rect x={2.5} y={2.5} width={395} height={295} rx={20} ry={20} style={Background}/>
            <g className={'Class'} mask={'url(#border)'}>
                <rect x={-10} y={34} width={155} height={20} rx={8} ry={8} style={Stat} />
                <text x={20} y={44} style={ClassText}>{state.class}</text>
            </g>
            <g className={'Name'} mask={'url(#border)'}>
                <rect x={-10} y={4} width={200} height={30} rx={12} ry={12} style={Stat} />
                <text x={20} y={19} style={NameText}>{state.name}</text>
            </g>
            <g className={'Strength'} transform={'translate(60 80)'}>
                <text x={-30} y={15} style={StatText}>STR</text>
                <rect width={30} height={30} rx={10} ry={10} style={Stat} />
                <text x={15} y={15} style={StatText}>{state.strength}</text>
            </g>
            <g className={'Dexterity'} transform={'translate(60 130)'}>
                <text x={-30} y={15} style={StatText}>DEX</text>
                <rect width={30} height={30} rx={10} ry={10} style={Stat} />
                <text x={15} y={15} style={StatText}>{state.dexterity}</text>
            </g>
            <g className={'Constitution'} transform={'translate(60 180)'}>
                <text x={-30} y={15} style={StatText}>CON</text>
                <rect width={30} height={30} rx={10} ry={10} style={Stat} />
                <text x={15} y={15} style={StatText}>{state.constitution}</text>
            </g>
            <g className={'Intelligence'} transform={'translate(160 80)'}>
                <text x={-30} y={15} style={StatText}>INT</text>
                <rect width={30} height={30} rx={10} ry={10} style={Stat} />
                <text x={15} y={15} style={StatText}>{state.intelligence}</text>
            </g>
            <g className={'Wisdom'} transform={'translate(160 130)'}>
                <text x={-30} y={15} style={StatText}>WIS</text>
                <rect width={30} height={30} rx={10} ry={10} style={Stat} />
                <text x={15} y={15} style={StatText}>{state.wisdom}</text>
            </g>
            <g className={'Charisma'} transform={'translate(160 180)'}>
                <text x={-30} y={15} style={StatText}>CHA</text>
                <rect width={30} height={30} rx={10} ry={10} style={Stat} />
                <text x={15} y={15} style={StatText}>{state.charisma}</text>
            </g>
            <g className={'Health'} transform={'translate(51 235)'}>
                <text x={-15} y={22.5} style={StatText}>HP</text>
                <path transform={'scale(2 2)'} d={"M16.1111 3C19.6333 3 22 6.3525 22 9.48C22 15.8138 12.1778 21 12 21C11.8222 21 2 15.8138 2 9.48C2 6.3525 4.36667 3 7.88889 3C9.91111 3 11.2333 4.02375 12 4.92375C12.7667 4.02375 14.0889 3 16.1111 3Z"} style={SpecialStat} />
                <text x={24} y={22.5} style={StatText}>{state.health}</text>
            </g>
            <g className='Armor' transform={'translate(151 235)'}>
                <text x={-15} y={22.5} style={StatText}>AC</text>
                <path transform={'scale(2 2)'} d={'M11.302 21.6147C11.5234 21.7439 11.6341 21.8085 11.7903 21.842C11.9116 21.868 12.0884 21.868 12.2097 21.842C12.3659 21.8085 12.4766 21.7439 12.698 21.6147C14.646 20.4783 20 16.9083 20 11.9999V7.21747C20 6.41796 20 6.0182 19.8692 5.67457C19.7537 5.37101 19.566 5.10015 19.3223 4.8854C19.0465 4.64231 18.6722 4.50195 17.9236 4.22122L12.5618 2.21054C12.3539 2.13258 12.25 2.0936 12.143 2.07815C12.0482 2.06444 11.9518 2.06444 11.857 2.07815C11.75 2.0936 11.6461 2.13258 11.4382 2.21054L6.0764 4.22122C5.3278 4.50195 4.9535 4.64231 4.67766 4.8854C4.43398 5.10015 4.24627 5.37101 4.13076 5.67457C4 6.0182 4 6.41796 4 7.21747V11.9999C4 16.9083 9.35396 20.4783 11.302 21.6147Z'} style={SpecialStat} />
                <text x={24} y={22.5} style={StatText}>{state.armor}</text>
            </g>
            <Drag className='Image' mask="url(#image-mask)">
                <circle cx={515} cy={150} r={300} clipPath={'url(#border)'} style={Stat}/>
                <image x={200} height={300} href={state.image} className="draggable"/>
                <circle cx={515} cy={150} r={300} clipPath={'url(#border)'} style={ImageBorder}/>
            </Drag>
            <rect x={2.5} y={2.5} width={395} height={295} rx={20} ry={20} style={CardBorder}/>
        </svg>
    );
}

export default CharacterCard;