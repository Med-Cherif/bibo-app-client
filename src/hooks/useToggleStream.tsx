import { useEffect } from 'react'

const useToggleStream = (
    myStream: React.MutableRefObject<MediaStream | undefined>,
    isTrackEnable: boolean,
    kind: 'audio' | 'video'
    ) => {
    useEffect(() => {
        if (myStream.current) {
            if (isTrackEnable) {
                const track = myStream.current.getTracks().find((track) => track.kind === kind);
                if (track) {
                    track.enabled = true
                }
            } else {
                const track = myStream.current.getTracks().find((track) => track.kind === kind);
                if (track) {
                    track.enabled = false
                }
            }
        }
    }, [isTrackEnable])
}

export default useToggleStream