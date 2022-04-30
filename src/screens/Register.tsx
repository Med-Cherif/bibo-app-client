import * as Yup from "yup";
import { Link } from "react-router-dom"
import { Button, Container, Grid, Typography } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import Datepicker from "../components/public/Datepicker";
import Input from "../components/public/Input";
import CheckboxInput from "../components/public/Checkbox";
import Select from "../components/public/Select";
import { useNavigate } from "react-router-dom"
import "./styles/Register.css";
import { getCountries, getListCoutries } from "../data/countries";
import { useDispatch } from "react-redux";
import { signupAction } from "../redux/actions/authAction";

const genderOptions = [
    { label: 'Choose your gender', value: '' },
    { label: 'Prefer not to say', value: 'prefer not to say' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
]

const countriesOptions = getListCoutries()

const initialValues = {
    name: '',
    username: '',
    birthday: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
    gender: '',
    country: ''
}
const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    username: Yup.string().required('Required').min(3, 'Username must be at least 3 characters'),
    email: Yup.string().required('Required').email('Please provide a valid email'),
    password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), ''], 'Passwords must match'),
    acceptedTerms: Yup.boolean().oneOf([true], 'You did not accept our terms'),
    gender: Yup.string().required('Required').oneOf(['male', 'female', 'prefer not to say', ''], 'invalid gender'),
    country: Yup.string().oneOf([...getCountries(), ''], 'Please provide a valid country or leave it empty')
})

const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signup = (values: typeof initialValues, { setSubmitting }: FormikHelpers<typeof initialValues>) => {
        dispatch(signupAction(values, navigate, setSubmitting))
    }

    return (
        <div className="auth-screen register fh pd">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={signup}
            >
                {
                    (formik) => (
                        <Container maxWidth="md">
                            <Form className="form">
                                <Typography variant="h2" gutterBottom>Sign up</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Input
                                            name="username"
                                            label="Username"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Input
                                            name="email"
                                            label="E-mail"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Input
                                            name="name"
                                            label="Your name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Input
                                            name="password"
                                            label="Password"
                                            
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Input
                                            name="confirmPassword"
                                            label="Confirm Password"
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <Datepicker name="birthday" />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Select name="gender" label="Your gender" options={genderOptions} />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Select name="country" label="Your country" options={countriesOptions} />
                                    </Grid>


                                    <Grid item xs={12}>
                                        <CheckboxInput name="acceptedTerms" />
                                    </Grid>
                                </Grid>
                                <Button sx={{ display: 'block', margin: '10px auto' }}>
                                    <Link to="/login">Already have an account? Sign in</Link>
                                </Button>
                                <Button variant="contained" type="submit" disabled={formik.isSubmitting}>
                                    {formik.isSubmitting ? "loading" : "Sign up"}
                                </Button>
                            </Form>
                        </Container>
                    )
                }
            </Formik>
        </div>
    )
}

export default Register
