import ChatInput from "./ChatInput";
import UnAcceptedChatFooter from "./UnAcceptedChatFooter";



interface IProps {
    hasPowers: boolean;
}

const ChatCardFooter = ({ hasPowers }: IProps) => {
    
    return hasPowers ? <ChatInput /> : <UnAcceptedChatFooter />
}

export default ChatCardFooter