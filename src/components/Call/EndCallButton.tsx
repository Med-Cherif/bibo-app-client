import { IconWrapper } from './Call'
import CallEndIcon from '@mui/icons-material/CallEnd';

interface IProps {
  onClick?: () => void;
}

const EndCallButton = ({ onClick }: IProps) => {
    return (
      <IconWrapper
        onClick={onClick}
        sx={{
            background: 'red'
        }}>
          <CallEndIcon />
      </IconWrapper>
    )
}

export default EndCallButton