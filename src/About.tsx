import React from 'react';
import Container from '@material-ui/core/Container';
import './camerastyle.css'
import { Box } from '@material-ui/core';
import MeasureCamera from './MeasureCamera';



type CameraProps={};
type CameraState={front:boolean,recording:boolean,heartRate:number};

class About extends React.Component<CameraProps,CameraState>{
    private videoTag=React.createRef<HTMLVideoElement>()
    private canvasTag=React.createRef<HTMLCanvasElement>()
    constructor(props:CameraProps){
      super(props)
      this.state = {
        front:false,
        recording:false,
        heartRate:0
      }
     
    }

    render() {
      return (
        <Container maxWidth="sm"className="cameraPageContainer">
        <Box className="videoContainer">
        {this.state.recording ? (
          <MeasureCamera/>
        ) : (
          <button onClick={() => this.setState({recording:true})}></button>
        )}
        </Box>
        </Container>
      );
    }
  }
export default About