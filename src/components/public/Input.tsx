import { useState } from "react"
import { Field, FieldProps } from 'formik'
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordInput = ({name, label, ...rest}: any) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    return <Field name={name}>
        {
            ({ meta, field }: FieldProps) => (
                <TextField 
                    className="input-fluid"
                    error={(meta.touched && meta.error) ? true : false}
                    helperText={meta.touched && meta.error && meta.error}
                    type={isPasswordVisible ? "text" : "password"}
                    label={label}
                    variant="outlined" 
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                                type="button"
                                onClick={() => setIsPasswordVisible(prev => !prev)}
                            >
                                {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }}
                    {...field} 
                    {...rest}
                />
            )
        }
    </Field>
}

const RegularInput = ({ label, name, ...rest }: any) => {
    return <Field name={name}>
        {
            ({ meta, field }: FieldProps) => (
                <TextField 
                    className="input-fluid"
                    error={(meta.touched && meta.error) ? true : false}
                    helperText={meta.touched && meta.error && meta.error}
                    type="text"
                    label={label}
                    variant="outlined" 
                    {...field}
                    {...rest}
                />
            )
        }
    </Field>
}

const Input = ({ name, label, ...rest }: any) => {
    return (
        <div className="form-control">
            {
                (name === "password" || name === "confirmPassword") ? 
                <PasswordInput 
                    name={name} 
                    label={label}
                    {...rest}
                /> : 

                <RegularInput 
                    name={name} 
                    label={label}
                    {...rest}
                />
            }
        </div>
    )
}

export default Input
