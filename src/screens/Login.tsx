import { Button, Container, Grid, Typography } from '@mui/material';
import Input from "../components/public/Input"
import { Link } from "react-router-dom";
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signinAction } from '../redux/actions/authAction';
import TopError from '../components/public/AuthError';

const initialValues = {
    perferredSocial: '',
    password: '',
}

const validationSchema = Yup.object().shape({
    perferredSocial: Yup.string().required('Required'),
    password: Yup.string().required('Required')
})

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (values: typeof initialValues, { setSubmitting }: FormikHelpers<typeof initialValues>) => {
        dispatch(signinAction(values, navigate, setSubmitting))
    }

    return (
        <div className="auth-screen login pd fh">
             <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {
                    (formik) => (
                        <Container maxWidth="md">
                            <Form className="form">
                                <Typography variant="h2" gutterBottom>Sign in</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Input
                                            name="perferredSocial"
                                            label="Username or E-mail"
                                            /> 
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Input
                                            name="password"
                                            label="Password"
                                        />
                                    </Grid>
                                </Grid>
                                <Button sx={{ display: 'block', margin: '10px auto 0' }}>
                                    <Link to="/register">New here? Sign up</Link>
                                </Button>

                                <Button sx={{ display: 'block', margin: '0 auto 10px' }}>
                                    <a href="/forgot-password">Forgot Password?</a>
                                </Button>

                                <Button variant="contained" type="submit" disabled={formik.isSubmitting}>
                                    {formik.isSubmitting ? "loading" : "Sign in"}
                                </Button>
                            </Form>
                        </Container>
                    )
                }
            </Formik>
        </div>
    )
}

export default Login