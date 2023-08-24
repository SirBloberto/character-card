import { styled } from 'solid-styled-components';
import { createSignal, onMount, Show, batch, onCleanup } from 'solid-js';
import cross from '/cross.webp';
import plus from '/plus.webp';
import { useCard } from '../context/card';
import { getMousePosition, getSVGTransform, SVGMatrix } from '../helpers/image';
import { createStore, modifyMutable, produce } from 'solid-js/store';

const StyledSection = styled.g`
    cursor: grab;
    opacity: 0;
`;

const StyledIcon = styled.image`
    width: ${props => props.size}px;
    height: ${props => props.size}px;

    cursor: pointer;
`;

const Image = ({ name, x, y, width, height, size, newPosition, deletePosition, children }) => {
    const { state } = useCard();
    const [hover, setHover] = createSignal(false);
    const [mouseDown, setMouseDown] = createSignal(false);
    const [offset, setOffset] = createStore({x: 0, y: 0});

    let svgRef = <svg/>;
    let imageRef = <image/>;

    onMount(() => {
        if (!state[name])
            state[name] = null;
        if (!state[name + "-matrix"])
            state[name + "-matrix"] = [1, 0, 0, 1, 0, 0];

        let transformTranslate = svgRef.createSVGTransform();
        transformTranslate.setTranslate(state[name + "-matrix"][SVGMatrix.translation.x], state[name + "-matrix"][SVGMatrix.translation.y]);
        imageRef.transform.baseVal.insertItemBefore(transformTranslate, 0);
        
        let transformScale = svgRef.createSVGTransform();
        transformScale.setScale(state[name + "-matrix"][SVGMatrix.scale.x], state[name + "-matrix"][SVGMatrix.scale.y]);
        imageRef.transform.baseVal.appendItem(transformScale);

        document.addEventListener('mouseup', endDrag);
    });

    onCleanup(() => {
        document.removeEventListener('mouseup', endDrag);
    });

    function uploadImage() {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image';
        input.onchange = (event) => { 
            var reader = new FileReader();
            if (event.target.files[0])
                reader.readAsDataURL(event.target.files[0]);
            reader.onloadend = () => state[name]  = reader.result;
        }
        input.click();
    }

    function deleteImage() {
        state[name] = null;
        modifyMutable(state[name + "-matrix"], produce((matrix) => {
            matrix[SVGMatrix.translation.x] = 0;
            matrix[SVGMatrix.translation.y] = 0;
            matrix[SVGMatrix.scale.x] = 1;
            matrix[SVGMatrix.scale.y] = 1;
        }));
        let transformTranslate = getSVGTransform(imageRef, SVGTransform.SVG_TRANSFORM_TRANSLATE);
        transformTranslate.setTranslate(0, 0)
        let transformScale = getSVGTransform(imageRef, SVGTransform.SVG_TRANSFORM_SCALE);
        transformScale.setScale(1, 1);
    }

    function startDrag(event) {
        if (!state[name])
            return;
        setMouseDown(true);
        setOffset(getMousePosition(event, svgRef));
        let transformTranslate = getSVGTransform(imageRef, SVGTransform.SVG_TRANSFORM_TRANSLATE);
        if (!transformTranslate) {
            transformTranslate = svgRef.createSVGTransform();
            transformTranslate.setTranslate(0, 0);
            imageRef.transform.baseVal.insertItemBefore(transform, 0);
        }
        batch(() => {
            setOffset('x', offset.x - transformTranslate.matrix.e);
            setOffset('y', offset.y - transformTranslate.matrix.f);
        });
    }

    function drag(event) {
        if (!mouseDown())
            return;
        let mousePosition = getMousePosition(event, svgRef);
        let transformTranslate = getSVGTransform(imageRef, SVGTransform.SVG_TRANSFORM_TRANSLATE);
        transformTranslate.setTranslate(mousePosition.x - offset.x, mousePosition.y - offset.y);
        modifyMutable(state[name + "-matrix"], produce((matrix) => {
            matrix[SVGMatrix.translation.x] = transformTranslate.matrix.e;
            matrix[SVGMatrix.translation.y] = transformTranslate.matrix.f;
        }));
    }

    function endDrag() {
        setMouseDown(false);
    }

    function scroll(event) {
        if (!state[name])
            return;
        let mousePosition = getMousePosition(event, svgRef);
        let transformTranslate = getSVGTransform(imageRef, SVGTransform.SVG_TRANSFORM_TRANSLATE);
        let transformScale = getSVGTransform(imageRef, SVGTransform.SVG_TRANSFORM_SCALE);
        mousePosition.x -= transformTranslate.matrix.e;
        mousePosition.y -= transformTranslate.matrix.f;
        if (!transformScale) {
            transformScale = svg.createSVGTransform();
            transformScale.setScale(1, 1);
            target.transform.baseVal.appendItem(transformScale);
        }
        let scaleFactor = event.deltaY < 0 ? 1.1 : 0.9
        transformScale.setScale(transformScale.matrix.a * scaleFactor, transformScale.matrix.d * scaleFactor)
        transformTranslate.setTranslate(transformTranslate.matrix.e + mousePosition.x * (1 - scaleFactor), transformTranslate.matrix.f + mousePosition.y * (1 - scaleFactor));
        modifyMutable(state[name + "-matrix"], produce((matrix) => {
            matrix[SVGMatrix.translation.x] = transformTranslate.matrix.e;
            matrix[SVGMatrix.translation.y] = transformTranslate.matrix.f;
            matrix[SVGMatrix.scale.x] = transformScale.matrix.a;
            matrix[SVGMatrix.scale.y] = transformScale.matrix.d;
        }));
    }

    return (
        <svg ref={svgRef} class={'image'} x={x} y={y} width={width} height={height}>
            <image ref={imageRef} href={state[name]} height={height}/>
            <svg onmouseenter={() => setHover(true)} onmouseleave={() => setHover(false)}>
                <StyledSection  onmousedown={startDrag} onmousemove={drag} onwheel={scroll}>
                    {...children}
                </StyledSection>
                <Show when={!state[name]}>
                    <StyledIcon href={plus} onclick={uploadImage} x={newPosition.x} y={newPosition.y} size={size}/>
                </Show>
                <Show when={state[name] && hover()}>
                    <StyledIcon href={cross} onclick={deleteImage} x={deletePosition.x} y={deletePosition.y} size={size}/>
                </Show>
            </svg>
        </svg>
    )
}

export default Image;