import { TextField, Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updatePostAction } from '../../redux/actions/postAction';

interface IProps {
    _id: string;
    updatedContent: string;
    setUpdatedContent: React.Dispatch<React.SetStateAction<string>>;
    setIsPostEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const EditingPost = ({ _id, updatedContent, setUpdatedContent, setIsPostEditing }: IProps) => {

    const dispatch = useDispatch()

    const updatePost = () => {
        dispatch(updatePostAction(_id, updatedContent, handleAfterUpdating))
    }

    const handleAfterUpdating = () => {
        setIsPostEditing(false)
        setUpdatedContent("")
    }

    return <>
        <TextField 
            sx={{
                '& > .css-19kzu47-MuiInputBase-root-MuiFilledInput-root': {
                    padding: '8px 12px',
                },
                '& > .css-19kzu47-MuiInputBase-root-MuiFilledInput-root::before, .css-19kzu47-MuiInputBase-root-MuiFilledInput-root::after': {
                    display: 'none',
                }
            }}
            minRows={2}
            fullWidth={true}
            multiline={true}
            id="filled"
            variant="filled"
            onChange={(e) => setUpdatedContent(e.target.value)}
            value={updatedContent} />  
            <Button onClick={() => setIsPostEditing(false)} sx={{ margin: '6px 0', marginRight:'6px' }} color="secondary" variant="outlined">Cancel</Button>
            <Button onClick={updatePost} sx={{ margin: '6px 0' }} color="primary" variant="contained">Edit</Button>
  </>
};

export default EditingPost;
