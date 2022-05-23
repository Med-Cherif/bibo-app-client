import { styled } from '@mui/material';
import { useRef } from 'react';

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

    let isSliding = useRef(false);
    let xPos = useRef<number>();
    let yPos = useRef<number>();

    const startMoving = (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
        e.preventDefault()
        isSliding.current = true;
        xPos.current = e.clientX;
        yPos.current = e.clientY;
    }

    const move = (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
        e.preventDefault();
        if (isSliding) {
            
            const video = myVideoRef.current!;
            let xPos2 = xPos.current! - e.clientX;
            let yPos2 = yPos.current! - e.clientY;
            xPos.current = e.clientX;
            yPos.current = e.clientY;


            video.style.left = (video.offsetLeft - xPos2) + 'px';
            video.style.top = (video.offsetTop - yPos2) + 'px';

        }
    }

    const endMoving = () => {
        isSliding.current = false;
    }

    return (
        <MyVideo 
            onMouseDown={startMoving}
            onMouseMove={move}
            onMouseUp={endMoving}
            onMouseLeave={endMoving}
            muted 
            autoPlay 
            playsInline
            ref={myVideoRef} 
        />
    )
}

export default MyVideoCall