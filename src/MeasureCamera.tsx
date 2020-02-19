import React from 'react';
import './camerastyle.css'
import { Box } from '@material-ui/core';

class MeasureCamera extends React.Component{
    private videoTag=React.createRef<HTMLVideoElement>()
    private canvasTag=React.createRef<HTMLCanvasElement>()
    
    async componentWillUnmount(){
        const video = this.videoTag.current as HTMLVideoElement;
        const stream = video.srcObject as MediaStream;
        const track = stream.getTracks()[0] as MediaStreamTrack;
        track.stop();
        video.srcObject = null;
    }
    async componentDidMount(){
        const video = this.videoTag.current as HTMLVideoElement;
        const canvas=this.canvasTag.current as HTMLCanvasElement;
        const wasm_measure= await import("rust_test");
        let validatedFingerpos=false;
        const constraints = { video:{facingMode: { exact: "environment" },width: 360, height: 240}}
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
          let counter:number=0;
          let finger_counter:number=0;
          let red_sum:number=0;
          let threshold_sum:number=0;
          let red_threshold:number=0;
          //canvasにカメラ映像を移してwasmにパスして処理
          setInterval(function(e) {
              ctx.drawImage(video,0,0,canvas.width,canvas.height);
              const frame:ImageData = ctx.getImageData(0, 0, 360, 240);
              if(validatedFingerpos){
                let red_mean:number =wasm_measure.measure(frame.data,frame.height,frame.width);
                red_sum+=red_mean;
                counter++;
                if(counter==30){
                  let tmp=red_sum/30.0;
                  counter=0;
                  red_sum=0;
                  console.log(tmp);
                }
              }else{
                  let calibrationResult=wasm_measure.calibrate(frame.data,frame.height,frame.width);
                  if(calibrationResult.valid_fingerpositon){
                    finger_counter++;
                    threshold_sum+=calibrationResult.red_thereshold;
                    if(finger_counter==90){
                      validatedFingerpos=true;
                      red_threshold=threshold_sum/90;
                    }
                  }else{
                    finger_counter=0;
                    threshold_sum=0;
                  }
              }
          },33);      
      });
      }
    render() {
        return (
            <Box>
            <video className="video" ref={this.videoTag} autoPlay playsinline></video>
            <canvas className="cameraCanvas"ref={this.canvasTag}></canvas>
            </Box>
        );
      }

}
export default MeasureCamera