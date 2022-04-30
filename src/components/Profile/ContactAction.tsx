import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Button } from "@mui/material";
import { followUser, unfollowUser } from "../../redux/actions/userAction";
import { useGlobalState } from "../../context/AppContext";

interface IProps {
  _id: string;
}

const ContactAction = ({ _id }: IProps) => {
    const { userData } = useSelector((state: RootState) => state.auth);
    const { myFollowings } = useSelector((state: RootState) => state.user);
    const { socket } = useGlobalState();
    const dispatch = useDispatch();
    const myID = userData!._id;

    const follow = () => {
      followUser(socket, dispatch).emitting({followerId: myID, userId: _id});
    }

    const unfollow = () => {
      unfollowUser(socket, dispatch).emitting({ unfollowerId: myID, userId: _id});
    }
    
    return myID === _id ? 
      null : 
      myFollowings.includes(_id)
        ? <Button onClick={unfollow} variant="contained" color="primary">UnFollow</Button> 
        : <Button onClick={follow} variant="contained" color="primary">Follow</Button>

}

export default ContactAction