import { useState } from "react";

const Mouse = (props) => {

    const [state, setState] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        setState({ x: event.clientX, y: event.clientY });
    };

    return (
        <div style={{ height: '100vh' }} onMouseMove={handleMouseMove}>
            {props.render(state)}
        </div>);
}

const Cat = (props) => {
    const mouse = props.mouse;
    return (
        <img src="./cat.jpg" alt="" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
}

export const MouseTracker = () => {
    return (
        <div>
            <h1>Move the mouse around!</h1>
            <Mouse render={mouse => (
                <Cat mouse={mouse} />
            )} />
        </div>
    );
}