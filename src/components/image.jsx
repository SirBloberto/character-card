import { styled } from 'solid-styled-components';
import { createSignal, onMount, Show, batch } from 'solid-js';
import cross from '/cross.png';
import plus from '/plus.png';
import { useCard } from '../context/card';
import { getMousePosition, getSVGTransform, SVGMatrix } from '../helpers/image';
import { createStore, modifyMutable, produce } from 'solid-js/store';

const StyledNew = styled.img`
    width: 20px;
    height: 20px;
    display: flex;
    margin: auto;
    margin-top: 75%;
    align-items: center;

    &:hover {
        cursor: pointer;
    }
`;

const StyledDelete = styled.img`
    width: 15px;
    height: 15px;
    display: flex;
    margin: auto;
    margin-top: 10%;
    margin-right: 10%;

    &:hover {
        cursor: pointer;
    }
`;

const Image = ({ name, x, y, width, height }) => {
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
        transformScale.setScale(state[name + "-matrix"][SVGMatrix.scale.x], state[name + "-matrix"][SVGMatrix.scale.y])
        imageRef.transform.baseVal.appendItem(transformScale);
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
        //Cursor grab
    }

    function deleteImage() {
        state[name] = null;
        //cursor normal
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
        <svg ref={svgRef} class={'image'} x={x} y={y} width={width} height={height} hasImage={true} on:mouseenter={() => setHover(true)} on:mouseleave={() => setHover(false)}>
            <image ref={imageRef} href={state[name]} height={height}/>
            <foreignObject x={0} y={0} width={width} height={height} on:mousedown={startDrag} on:mouseup={endDrag} on:mouseleave={endDrag} on:mousemove={drag} on:wheel={scroll}>
                <Show when={!state[name]}>
                    <StyledNew src={plus} onClick={uploadImage}/>
                </Show>
                <Show when={state[name] && hover()}>
                    <StyledDelete src={cross} onClick={deleteImage}/>
                </Show>
            </foreignObject>
        </svg>
    )
}

export default Image;