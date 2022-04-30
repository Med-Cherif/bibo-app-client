import { useRef, useState } from "react";
import { styled } from "@mui/material";
import API_URL from "../../config";
import VideoController from "./VideoController";
import { useNavigate } from "react-router-dom";


interface IProps {
    src: string;
    type: string;
    postId?: string;
}

const VideoContainer = styled('div')({
    position: 'relative',
    fontSize: 0,
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
})

const VideoPost = ({ src, type, postId }: IProps) => {

    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const [videoControllerVisible, setVideoControllerVisible] = useState(false);
    const [newCurrentTime, setNewCurrentTime] = useState(0);
    const [isFullScreen, setIfFullScreen] = useState(false);

    const videoLoaded = () => {
      setVideoControllerVisible(true);
    }

    const onTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
      const video = videoRef.current!
      setNewCurrentTime(Math.floor(video.currentTime));
    }

    const toggleFullScreen = () => {
      const videoContainer = videoContainerRef.current!;

      if (isFullScreen) {
        document.exitFullscreen();
        setIfFullScreen(false)
      } else {
        if (videoContainer.requestFullscreen) {
          videoContainer.requestFullscreen()
          setIfFullScreen(true)
        }
      }

      
    }

    return <VideoContainer
      ref={videoContainerRef}
    >
      <video
          onDoubleClick={toggleFullScreen}
          ref={videoRef}
          onLoadedMetadata={videoLoaded}
          style={{ width: "100%" }}
          onTimeUpdate={onTimeUpdate}
      >
          <source src={`${API_URL}/${src}`} type={type} />
      </video>
      {
        videoControllerVisible && (
          <VideoController
              videoRef={videoRef}
              newCurrentTime={newCurrentTime}
              setNewCurrentTime={setNewCurrentTime}
              toggleFullScreen={toggleFullScreen}
              isFullScreen={isFullScreen}
          />
        )
      }
    </VideoContainer>
};

export default VideoPost;
