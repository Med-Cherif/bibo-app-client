import { useState } from "react";
import { styled, Stack, Slider, Typography, Box } from "@mui/material"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUp from '@mui/icons-material/VolumeUp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

const PlayStopIconWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
        cursor: 'pointer',
        fontSize: '32px'
    }
})

const TimeWrapper = styled('div')({
    position: 'absolute',
    bottom: '2.5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 16px)',
})

const VideoControllerWrapper = styled('div')({
    color: '#fff', 
    position: 'absolute',
    bottom: '0', 
    left: '50%',
    padding: '10px', 
    width: 'calc(100% - 8px)',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center'
})

const Text = styled(Typography)({
    fontSize: '14px',
    fontWeight: 500,
    opacity: .6,
    color: '#f9f9f9',
    letterSpacing: 0.2,
})

const ScreenIconWrapper = styled('div')({
    marginLeft: 'auto',
    cursor: 'pointer',
    '& > svg': {
        fontSize: '32px'
    }
})

interface IProps {
    newCurrentTime: number;
    isFullScreen: boolean;
    videoRef: React.RefObject<HTMLVideoElement>;
    setNewCurrentTime: React.Dispatch<React.SetStateAction<number>>;
    toggleFullScreen: () => void;
}

const VideoController = ({ videoRef, newCurrentTime, setNewCurrentTime, toggleFullScreen, isFullScreen }: IProps) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const video = videoRef.current!
    const [volume, setVolume] = useState(video.volume * 100);

    function formatDuration(value: number) {
        // 3950

        const hours = Math.floor(value / 3600); // 1 - 350
        const minute = Math.floor((value - hours * 3600) / 60); // 5 - 50
        const secondLeft = Math.floor(value - (minute * 60 + hours * 3600)); // 50

        return `${minute}:${secondLeft <= 9 ? `0${secondLeft}` : secondLeft}`;
      }

    const onVolumeChagne = (e: any, value: number | number[], _: any) => {

        if (typeof value === "number") {
            video.volume = value / 100
            setVolume(value);
        }
    }


    const toggleVideo = () => {
        if (video.paused) {
            setIsPlaying(true)
            video.play()
        } else {
            setIsPlaying(false)
            video.pause()
        }
    }

    return (
        <VideoControllerWrapper>
            <TimeWrapper>
                    <Slider 
                        color="secondary" 
                        aria-label="Time"
                        step={0.2}
                        value={newCurrentTime}
                        max={video.duration}
                        onChange={(x: any, value: number | number[], y: any) => {
                            if (typeof value === "number") {
                                video.currentTime = value;
                                setNewCurrentTime(Math.floor(value));
                            }
                        }}
                    />
                    
            </TimeWrapper>
            <PlayStopIconWrapper
                onClick={toggleVideo}
            >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </PlayStopIconWrapper>
            <Stack 
                spacing={2}
                direction="row" 
                alignItems="center"
                sx={{ width: '140px', margin: '0 12px' }}
            >
                <Slider 
                    aria-label="Volume" 
                    value={volume}
                    sx={{
                        width: '100%',
                        color: '#999',
                        '& .MuiSlider-thumb': {
                            width: 16,
                            height: 16,
                        }
                    }}
                    max={100}
                    min={0}
                    onChange={onVolumeChagne} 
                />
                <VolumeUp />

            </Stack>

            <Text>{formatDuration(newCurrentTime)}</Text>
                <Box sx={{ margin: '0 2px', color: '#fff', fontSize: '22px' }}>-</Box>
            <Text>{formatDuration(video.duration)}</Text>

            <ScreenIconWrapper onClick={toggleFullScreen}>
                {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </ScreenIconWrapper>

        </VideoControllerWrapper>
    )
}

export default VideoController