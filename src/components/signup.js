import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function SignUp(params) {
    let navigate = useNavigate();
    let [loading, setLoading] = useState(false);

    const validateCredentials = (values) => {
        let errors = {};

        let r = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
        let er = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

        if (!values.username) {
            errors.username = 'required';
        } else if (!r.test(values.username)) {
            errors.username = 'username must have min 8 and max 16 chars with at least one letter and one number';
        }

        if (!values.password) {
            errors.password = 'required';
        } else if (!r.test(values.password)) {
            errors.password = 'password must have min 8 and max 16 chars with at least one letter and one number';
        }

        if (!values.confirm_password) {
            errors.confirm_password = 'required';
        } else if (values.confirm_password != values.password) {
            errors.confirm_password = 'Confirm password does not match to password';
        }

        if (!values.email) {
            errors.email = 'required';
        } else if (!er.test(values.email)) {
            errors.email = 'Invlid email address';
        }

        return errors;

    }
    const formik = useFormik({
        validateOnBlur: true,
        validateOnChange: true,

        initialValues: {
            username: '',
            password: '',
            confirm_password: '',
            email: ''
        },
        validate: validateCredentials,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                let { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, values);
                if (data.userCreated) {
                    // user created
                    navigate('/')
                } else if (data.alreadyAUser) {
                    alert('user already exists !')
                }
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        },
    });
    const goToLogin = () => {

        navigate('/')
    }

    return (

        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">

                    <form onSubmit={formik.handleSubmit} className="login100-form validate-form p-l-55 p-r-55 p-t-178">
                        <span className="login100-form-title">
                            Sign Up
                        </span>

                        <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username} className="input100" type="text" name="username" placeholder="Username" />
                            <span className="focus-input100"></span>
                        </div>
                        {formik.errors.username && formik.touched.username ? <div className='error-message'>
                            {formik.errors.username}
                        </div> : ""}


                        <div className="wrap-input100 validate-input">
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className="input100" type="password" name="password" placeholder="Password" />
                            <span className="focus-input100"></span>
                        </div>
                        {formik.errors.password && formik.touched.password ? <div className='error-message'>
                            {formik.errors.password}
                        </div> : ""}


                        <div className="wrap-input100 validate-input mrgn">
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.confirm_password} className="input100" type="password" name="confirm_password" placeholder="Confirm Password" />
                            <span className="focus-input100"></span>
                        </div>
                        {formik.errors.confirm_password && formik.touched.confirm_password ? <div className='error-message'>
                            {formik.errors.confirm_password}
                        </div> : ""}


                        <div className="wrap-input100 validate-input mrgn">
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className="input100" type="email" name="email" placeholder="Email" />
                            <span className="focus-input100"></span>
                        </div>
                        {formik.errors.email && formik.touched.email ? <div className='error-message'>
                            {formik.errors.email}
                        </div> : ""}


                        <div className="container-login100-form-btn c-p-sp-b">
                            {loading ? <button className="login100-form-btn" type='submit'>
                                Registering
                                <i style={{marginLeft:'10px'}}className="fa fa-circle-o-notch fa-spin"></i>
                            </button> :
                                <button className="login100-form-btn" type='submit'>
                                    Sign Up
                                </button>
                            }

                        </div>

                        <div className="flex-col-c p-t-170 p-b-40 c-p">
                            <span className="txt1 p-b-9">
                                Already have an account
                            </span>

                            <a href="#" className="txt3" onClick={goToLogin}>
                                Login now
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}