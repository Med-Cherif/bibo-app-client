import { TextField } from "@mui/material"
import { Field, FieldProps } from "formik"

const isLeapYear = (year: number): boolean => {
    if (year % 4 !== 0) return false
    else if (year % 100 !== 0) return true;
    else if (year % 400 !== 0) return false
    return true;
}

const isValidDay = (month: number, day: number, isLeapYear: boolean) => {
    let months31 = [1, 3, 5, 7, 8, 10, 12]
    let months30 = [4, 6, 9, 11]
    
    if (months31.includes(month) && day > 31) return false
    if (months30.includes(month) && day > 30) return false
    if ((month === 2 && isLeapYear) && day > 29) return false
    if ((month === 2 && !isLeapYear) && day > 28) return false

    return true

}

const validationBirthday = (value: `${number}/${number}/${number}`) => {
    let error;
    if (!value) {
        return 'Required'
    }
    
    let splitedValue = value.split('/');
    const { month, day, year } = {
        day: parseInt(splitedValue[0]),
        month: parseInt(splitedValue[1]),
        year: parseInt(splitedValue[2]),
    }
    const currentDate = new Date()

    const leapYear = isLeapYear(parseInt(splitedValue[2]))

    if (!isValidDay(month, day, leapYear)) {
        error = 'Provide a valid day between 1 and 31 | 30 | 28 | 29 depending on the month and the year'
    }

    if (month > 12) {
        error = 'Months are less than 12'
    }

    if (year > currentDate.getFullYear()) {
        error = `We are not in ${currentDate.getFullYear()} yet ...!`
    }

    return error;
}

const Datepicker = ({name}: any) => {
    return (
        <div className="form-control">
            <Field name={name} validate={validationBirthday}>

                {
                    ({ meta, field }: FieldProps) => (
                        <TextField 
                            {...field}
                            label="Your birthday"
                            placeholder="dd/mm/yyyy"
                            error={meta.error && meta.touched ? true : false}
                            helperText={meta.error && meta.touched && meta.error}
                        />
                    )
                }
            </Field>
        </div>
    )
}

export default Datepicker
