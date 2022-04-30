import React from 'react'
import { IconWrapper } from './Call'

interface IProps {
    toggleStream: () => void;
    isEnabled: boolean;
    OffIcon: React.ReactNode;
    OnIcon: React.ReactNode
}

const ToggleStreamButton = ({ toggleStream, isEnabled, OffIcon, OnIcon }: IProps) => {
    return (
        <IconWrapper
            sx={{
                background: '#333',
                border: '1px solid #A8A8A8',
            }}
            onClick={toggleStream}
        >
            {
                isEnabled ? OffIcon : OnIcon
            }
        </IconWrapper>
    )
}

export default ToggleStreamButton