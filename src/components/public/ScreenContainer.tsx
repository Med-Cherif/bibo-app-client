import { Box, Container } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Plus from "../Post/Plus"; 
import Sidebar from "../Sidebar/Sidebar";
import ModelCreatorPost from "../Post/ModelCreatorPost";

interface IProps {
    children: React.ReactNode;
    hidePostCreator?: boolean;
    hideNotificationBar?: boolean;
    hideSearchbar?: boolean;
}

const ScreenContainer = ({ children, hidePostCreator, hideNotificationBar, hideSearchbar }: IProps) => {
    return (
        <>
            { hidePostCreator ? null : <Plus /> }
            <Navbar hideSearchbar={hideSearchbar ? true : false} hideNotificationBar={hideNotificationBar ? true : false} />
            <Sidebar />
            <Box sx={{
                marginTop: '64px',
            }}>
                {children}
            </Box>
            { hidePostCreator ? null : <ModelCreatorPost /> }
        </>
    )
}

export default ScreenContainer
