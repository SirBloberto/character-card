import { Transition } from "solid-transition-group";
import "./fade.css";

const FadeTransition = (props) => {
    return (
        <Transition name="fade">
            {props.children}
        </Transition>
    )
}

export default FadeTransition;