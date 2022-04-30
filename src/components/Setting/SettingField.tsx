import { useEffect, useState } from "react";
import { Typography, Paper, styled, Grid, Button, InputBase, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateUserDataAction } from "../../redux/actions/userAction";

const FieldContainer  = styled(Paper)(() => ({
    boxShadow: 'none',
    border: '1px solid #777',
    borderRadius: '6px',
    padding: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#f9f9f9',
    gap: '25px',
}))

const InputBaseStyled = styled(InputBase)(() => ({
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '350px',
    width: '100%',
    padding: '4px 8px',
}))

const TextAreaStyled = styled(TextField)({
    border: '1px solid #ccc',
    resize: 'none',
    borderRadius: '8px',
    width: '100%',
    padding: '8px 6px',
    '& .MuiOutlinedInput-root.MuiInputBase-root fieldset': {
        outline: 'none !important',
        border: 'none !important',
    },
    '& .MuiOutlinedInput-root.MuiInputBase-root': {
        padding: 0
    }
})

interface IProps {
    label: string;
    value: string;
    name: "email" | "username" | "name" | "newPassword" | "currentPassword" | "newConfirmingPassword" | "description";
    isPasswordField?: boolean;
    isPasswordEditing?: boolean;
    handleChangePassword?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    textArea?: boolean;
}

const SettingField = ({ label, value, name, isPasswordField, isPasswordEditing, handleChangePassword, textArea }: IProps) => {

    const [isEditing, setIsEditing] = useState(false)
    const [newValue, setNewValue] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        setNewValue(value)
    }, [isEditing])

    const startEditing = () => {
        setIsEditing(true)
    }

    const endEditing = () => {
        setIsEditing(false)
    }

    return (
        <FieldContainer>
            <div style={{ flex: 1 }}>
                <Typography variant="body2">{label}:</Typography>
                {
                    isEditing || isPasswordEditing ? isPasswordField ? 
                        <InputBaseStyled name={name} type="password" onChange={handleChangePassword} /> 
                        : textArea ? 
                        <TextAreaStyled name={name} minRows={2} fullWidth={true} value={newValue} multiline={true} onChange={(e) => setNewValue(e.target.value)} /> 
                        : 
                        <InputBaseStyled name={name} type="text" value={newValue} onChange={(e) => setNewValue(e.target.value)} /> 
                    :
                    <Typography variant="subtitle1">{value}</Typography>
                }
            </div>
            {
                isPasswordField ? null : isEditing ? <Button onClick={() => {
                    if (name === "email" || name === "username" || name === "name" || name === "description") {
                        dispatch(updateUserDataAction(name, newValue, endEditing))
                    }
                }} color="secondary" variant="outlined">Save</Button> : <Button onClick={startEditing} variant="outlined">Edit</Button>
            }
        </FieldContainer>
    )
}

export default SettingField
