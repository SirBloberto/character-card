import { styled } from 'solid-styled-components';
import { createSignal, onMount, Show, batch, onCleanup } from 'solid-js';
import cross from '../images/cross.webp';
import plus from '../images/plus.webp';
import { useCard } from '../context/card';
import { getMousePosition, getSVGTransform } from '../helpers/image';
import { createStore, modifyMutable, produce } from 'solid-js/store';
import {Transition} from 'solid-transition-group';
import FadeTransition from '../styles/fade';

const StyledSection = styled.g`
    opacity: 0;

    ${({ active }) => active && `
        cursor: grab;
    `}
`;

const StyledIcon = styled.image`
    width: ${props => props.size}px;
    height: ${props => props.size}px;

    cursor: pointer;
    &:hover {
        filter: brightness(90%);
    }
`;

const Image = ({ name, x, y, width, height, size, newPosition, deletePosition, children }) => {
    const { state } = useCard();
    const [hover, setHover] = createSignal(false);
    const [mouseDown, setMouseDown] = createSignal(false);
    const [offset, setOffset] = createStore({x: 0, y: 0});

    let svgRef = <svg/>;
    let imageRef = <image/>;

    onMount(() => {
        if (!state[name]) {
            state[name] = {};
            modifyMutable(state, produce((state) => {
                state[name]['data'] = null;
                state[name]['translation'] = {x: 0, y: 0};
                state[name]['scale'] = 1;
            }));
        }

        if(state[name].data) {
            insertTranslationTransform();
            insertScaleTransform();
        }

        document.addEventListener('mouseup', endDrag);
    });

    onCleanup(() => {
        document.removeEventListener('mouseup', endDrag);
    });

    function uploadImage() {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
            var reader = new FileReader();
            let image = event.target.files[0];
            if (image)
                reader.readAsDataURL(image);
            reader.onloadend = () => {
                modifyMutable(state[name], produce((state) => {
                    state.data  = reader.result;
                }));
                
                if(!getSVGTransform(imageRef, SVGTransform.SVG_TRANSFORM_TRANSLATE))
                    insertTranslationTransform();
                
                if(!getSVGTransform(imageRef, SVGTransform.SVG_TRANSFORM_SCALE))
                    insertScaleTransform();
            };
        }
        input.click();
    }

    function deleteImage() {
        modifyMutable(state[name], produce((state) => {
            state.data = null;
            state.translation.x = 0;
            state.translation.y = 0;
            state.scale = 1;
        }));
    }

    function startDrag(event) {
        if (!state[name].data || mouseDown())
            return;
        setMouseDown(true);
        setOffset(getMousePosition(event, svgRef));
        let transformTranslate = getSVGTransform(imageRef, SVGTransform.SVG_TRANSFORM_TRANSLATE);
        batch(() => {
            setOffset('x', offset.x - transformTranslate.matrix.e);
            setOffset('y', offset.y - transformTranslate.matrix.f);
        });
    }

    function drag(event) {
        if (!state[name].data || !mouseDown())
            return;
        let mousePosition = getMousePosition(event, svgRef);
        getSVGTransform(imageRef, SVGTransform.SVG_TRANSFORM_TRANSLATE).setTranslate(mousePosition.x - offset.x, mousePosition.y - offset.y);
    }

    function endDrag() {
        if(!state[name].data || !mouseDown())
            return;
        setMouseDown(false);
        let transformTranslate = getSVGTransform(imageRef, SVGTransform.SVG_TRANSFORM_TRANSLATE);
        modifyMutable(state[name].translation, produce((translation) => {
            translation.x = transformTranslate.matrix.e;
            translation.y = transformTranslate.matrix.f;
        }));
    }

    function scroll(event) {
        if (!state[name].data)
            return;
        let mousePosition = getMousePosition(event, svgRef);
        let transformTranslate = getSVGTransform(imageRef, SVGTransform.SVG_TRANSFORM_TRANSLATE);
        let transformScale = getSVGTransform(imageRef, SVGTransform.SVG_TRANSFORM_SCALE);
        mousePosition.x -= transformTranslate.matrix.e;
        mousePosition.y -= transformTranslate.matrix.f;
        let scaleFactor = event.deltaY < 0 ? 1.1 : 0.9
        transformScale.setScale(transformScale.matrix.a * scaleFactor, transformScale.matrix.d * scaleFactor)
        transformTranslate.setTranslate(transformTranslate.matrix.e + mousePosition.x * (1 - scaleFactor), transformTranslate.matrix.f + mousePosition.y * (1 - scaleFactor));
        modifyMutable(state[name], produce((state) => {
            state.translation.x = transformTranslate.matrix.e;
            state.translation.y = transformTranslate.matrix.f;
            state.scale = transformScale.matrix.a;
        }));
    }

    function insertTranslationTransform() {
        let transformTranslate = svgRef.createSVGTransform();
        transformTranslate.setTranslate(state[name].translation.x, state[name].translation.y);
        imageRef.transform.baseVal.insertItemBefore(transformTranslate, 0);
        return transformTranslate;
    }

    function insertScaleTransform() {
        let transformScale = svgRef.createSVGTransform();
        transformScale.setScale(state[name].scale, state[name].scale);
        imageRef.transform.baseVal.appendItem(transformScale);
        return transformScale;
    }

    return (
        <svg ref={svgRef} class={'image'} name={name} x={x} y={y} width={width} height={height}>
            <image ref={imageRef} href={state[name] ? state[name].data : null} height={height} alt="image"/>
            <svg onmouseenter={() => setHover(true)} onmouseleave={() => setHover(false)}>
                <StyledSection active={state[name] && state[name].data} onmousedown={startDrag} onmousemove={drag} onwheel={scroll}>
                    {...children}
                </StyledSection>
                <Show when={state[name] && !state[name].data}>
                    <StyledIcon href={plus} onclick={uploadImage} x={newPosition.x} y={newPosition.y} size={size}/>
                </Show>
                <FadeTransition>
                    <Show when={state[name] && state[name].data && hover() && !mouseDown()}>
                        <StyledIcon href={cross} onclick={deleteImage} x={deletePosition.x} y={deletePosition.y} size={size}/>
                    </Show>
                </FadeTransition>
            </svg>
        </svg>
    )
}

export default Image;