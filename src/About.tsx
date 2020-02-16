import React from 'react';
import Test from './Test';
import Container from '@material-ui/core/Container';
import './camerastyle.css'
import { Box } from '@material-ui/core';

type CameraProps={};
type CameraState={wasm:any,front:boolean,loading:boolean,recording:boolean,heartRate:number};


class About extends React.Component<CameraProps,CameraState>{
    private videoTag=React.createRef<HTMLVideoElement>()
    private canvasTag=React.createRef<HTMLCanvasElement>()
    constructor(props:CameraProps){
      super(props)
      this.state = {
        wasm:null,
        front:false,
        loading:false,
        recording:false,
        heartRate:0
      }
      this.loadWasm();
    }
    async loadWasm (){
      try {
        this.setState({loading:true})
        const wasm = await import('rust_test');
        this.setState({wasm:wasm})
      } finally {
        this.setState({loading:false})
      }
    }

    async componentDidMount() {
      const video = this.videoTag.current as HTMLVideoElement;
      const canvas=this.canvasTag.current as HTMLCanvasElement;
      const wasm= await import('rust_test');
      const constraints = { video:{width: 360, height: 240}}
      navigator.mediaDevices.getUserMedia(constraints).then(
      (stream:MediaStream) => { video!.srcObject = stream }).catch(
        (error)=>{console.error(error)}
      )
      video.addEventListener("loadedmetadata",function(e) {
        //canvasにカメラの映像のサイズを設定
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        console.log(e)
        //getContextで描画先を取得
        var ctx = canvas.getContext("2d") as any;
        //毎フレームの実行処理
        setInterval(function(e) {
            //videoタグの描画をコンテキストに描画
            ctx.drawImage(video,0,0,canvas.width,canvas.height);
            const frame:ImageData = ctx.getImageData(0, 0, 360, 240);
            let red_mean:number =wasm.measure(frame.data,frame.height,frame.width)
            console.log(red_mean)
        },33);      
    });
    }
    async componentWillUnmount(){
      const video = this.videoTag.current as HTMLVideoElement;
      const stream = video.srcObject as MediaStream;
      const track = stream.getTracks()[0] as MediaStreamTrack;
      track.stop();
      video.srcObject = null;
    }
    
    MeasureHeartRate(){
      const video = this.videoTag.current as HTMLVideoElement;
      const canvas=this.canvasTag.current as HTMLCanvasElement;
      const wasm=this.state.wasm as any;
      const constraints = { video:{width: 360, height: 240}}
      navigator.mediaDevices.getUserMedia(constraints).then(
      (stream:MediaStream) => { video!.srcObject = stream }).catch(
        (error)=>{console.error(error)}
      )
      video.addEventListener("loadedmetadata",function(e) {
        //canvasにカメラの映像のサイズを設定
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        console.log(e)
        //getContextで描画先を取得
        var ctx = canvas.getContext("2d") as any;
        //毎フレームの実行処理

        setInterval(function(e) {
            //videoタグの描画をコンテキストに描画
            ctx.drawImage(video,0,0,canvas.width,canvas.height);
            const frame:ImageData = ctx.getImageData(0, 0, 360, 240);
            let red_mean:number =wasm.measure(frame.data,frame.height,frame.width)
            console.log(red_mean)
            console.log(e)
        },33);      
    });
    }

    render() {
      return (
        <Container maxWidth="sm"className="cameraPageContainer">
        <Box className="videoContainer">
        <video className="video" ref={this.videoTag} autoPlay playsinline></video>
        <Test ref={this.canvasTag}/>
        </Box>
        </Container>
      );
    }
  }
export default About