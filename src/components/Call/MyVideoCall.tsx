import { styled } from '@mui/material';
import React from 'react';

const MyVideo = styled('video')({
    position: 'absolute',
    top: '16px',
    right: '16px',
    height: '180px',
    width: '150px',
    cursor: 'pointer',
    objectFit: 'cover',
    zIndex: 3
})

interface IProps {
    myVideoRef: React.RefObject<HTMLVideoElement>;
}

const MyVideoCall = ({ myVideoRef }: IProps) => {

    let isSliding = false;
    let xPos: number;
    let yPos: number;

    const startMoving = (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
        e.preventDefault()
        isSliding = true;
        xPos = e.clientX;
        yPos = e.clientY;
    }

    const move = (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
        e.preventDefault();
        if (isSliding) {
            
            const video = myVideoRef.current!;
            let xPos2 = xPos - e.clientX;
            let yPos2 = yPos - e.clientY;
            xPos = e.clientX;
            yPos = e.clientY;


            video.style.left = (video.offsetLeft - xPos2) + 'px';
            video.style.top = (video.offsetTop - yPos2) + 'px';

        }
    }

    const endMoving = () => {
        isSliding = false;
    }

    return (
        <MyVideo 
            onMouseDown={startMoving}
            onMouseMove={move}
            onMouseUp={endMoving}
            onMouseLeave={endMoving}
            muted 
            autoPlay 
            ref={myVideoRef} 
        />
    )
}

export default MyVideoCall