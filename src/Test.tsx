import React, { forwardRef, RefForwardingComponent } from 'react';
import './camerastyle.css'
type IMyComponentProps = {}
const Test: RefForwardingComponent<HTMLCanvasElement, IMyComponentProps> = (props, ref) => {
    return(
        <div>
        <canvas className="cameraCanvas"ref={ref} />
        </div>
    );
}

export default forwardRef(Test);
