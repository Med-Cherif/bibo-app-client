import { Field, FieldProps, ErrorMessage } from 'formik';
import { Checkbox, Typography, FormHelperText, FormControlLabel } from "@mui/material"

const CheckboxInput = ({name}: any) => {
    return (
        <div className="form-control">
            <Field name={name}>
                {
                    ({ meta, field }: FieldProps) => (
                        <>
                            <FormControlLabel
                                control={
                                    <Checkbox {...field} />
                                }
                                label="By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use."
                            />
                        </>
                    )
                } 
            </Field>
            <ErrorMessage name={name}>
                {
                    (msg) => <FormHelperText sx={{ color: 'error.main' }}>{msg}</FormHelperText>
                }
            </ErrorMessage>
        </div>
    )
}

export default CheckboxInput
