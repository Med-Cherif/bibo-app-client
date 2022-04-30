import { styled, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { acceptChatAction } from "../../redux/actions/chatAction";

const Container = styled('div')({
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '500px',
    width: '100%',
    padding: '6px 16px',
    gap: '20px'
})

const UnAcceptedChatFooter = () => {

    const dispatch = useDispatch();

    const accept = () => {
        dispatch(acceptChatAction())
    }
    const refuse = () => {

    }

    return <Container>
        <Button onClick={accept} color="primary" variant="outlined">Accept</Button>
        <Button color="secondary" variant="outlined">Refuse</Button>
    </Container>;
};

export default UnAcceptedChatFooter;
