import { Field, FieldProps } from "formik";
import { TextField, MenuItem } from "@mui/material";

const Select = ({name, label, options, ...rest}: any) => {
    return (
        <div className="form-control">
            <Field name={name}>
                {
                    ({ meta, field }: FieldProps) => (
                        <TextField
                            className="input-fluid"
                            select
                            label={label}
                            error={meta.touched && meta.error ? true : false}
                            helperText={meta.touched && meta.error && meta.error}
                            {...field}
                            {...rest}
                        >
                            {options.map((option: { value: string, label: string }) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem> 
                            ))}
                        </TextField>
                    )
                }
            </Field>
        </div>
    )
}

export default Select
