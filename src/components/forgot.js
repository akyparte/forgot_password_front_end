import axios from 'axios';
import { useFormik } from 'formik';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword(params) {
    let navigate = useNavigate();
    let [status, setStatus] = useState('send otp');
    let [inProcess, setInProcess] = useState(false);
    const validateCredentials = (values) => {
        let errors = {};

        let r = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
        let er = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

        if (status === 'send otp') {
            if (!values.email) {
                errors.email = 'Required';
            } else if (!er.test(values.email)) {
                errors.email = 'Invalid email address';
            }
        }

        if (status === 'otp sent') {
            if (!values.otp) {
                errors.otp = 'Required';
            }
        }


        if (status === 'change password') {
            if (!values.password) {
                errors.password = 'required';
            } else if (!r.test(values.password)) {
                errors.password = 'password must have min 8 and max 16 chars with at least one letter and one number';
            }

            if (!values.confirm_password) {
                errors.confirm_password = 'required';
            } else if (values.password != values.confirm_password) {
                errors.confirm_password = 'does not match with password';
            }
        }

        return errors;

    }

    const GenerateButton = (content, processLoading) => {
        return (<button className="login100-form-btn ch-pass-btn" type='submit'>
            {content}
            {processLoading ? <i style={{marginLeft:'10px'}}className="fa fa-circle-o-notch fa-spin"></i> : ""}
        </button>)
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            otp: '',
            password: '',
            confirm_password: ''
        },
        validateOnBlur: true,
        validateOnChange: true,
        validate: validateCredentials,
        onSubmit: async (values) => {
            if (status == 'send otp') {
                let payload = { email: values.email };
                setInProcess(true);
                let { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/send-otp`, payload);

                if (data.registeredId && data.otpSent) {
                    setStatus('otp sent')
                } else {
                    alert('Email address not registered')
                    setStatus('send otp')
                }
                setInProcess(false)
                formik.setTouched({}, false);
            } else if (status == 'otp sent') {
                setInProcess(true);
                let payload = { email: values.email, otp: values.otp }
                let { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/validate-otp`, payload);
                if (data.validOtp) {
                    setStatus('change password')
                } else {
                    alert('Invalid otp')
                }
                setInProcess(false);
            } else if (status == 'change password') {
                setInProcess(true);
                let payload = { email: values.email, password: values.password }
                let { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/change-password`, payload);
                if (data.passwordUpdated) {
                    navigate('/pass-ch-tem', {
                        state: {
                            allow: true
                        }
                    })
                }
            }
        },
    });

    useEffect(() => {
        if(localStorage.getItem('sid')){
			navigate('/secret-data')
		}
	},[])

    return (

        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">

                    <form onSubmit={formik.handleSubmit} className="login100-form validate-form p-l-55 p-r-55 p-t-178">
                        <span className="login100-form-title">
                            Change Password
                        </span>


                        {status == 'send otp' || status == 'otp sent' ?
                            <>
                                <div className="wrap-input100 validate-input m-b-16">
                                    <input onBlur={formik.handleBlur} onChange={formik.handleChange}
                                        value={formik.values.email} className="input100"
                                        type="email"
                                        name="email"
                                        disabled={status == 'otp sent' ? true : false}
                                        placeholder="email" />
                                    <span className="focus-input100"></span>
                                </div>
                                {formik.errors.email && formik.touched.email ? <div className='error-message'>
                                    {formik.errors.email}
                                </div> : ""}
                            </>
                            : ""

                        }

                        {status == 'otp sent' ?
                            <>
                                <div className="wrap-input100 validate-input m-b-16">
                                    <input onBlur={formik.handleBlur} onChange={formik.handleChange}
                                        value={formik.values.otp} className="input100"
                                        type="text"
                                        name="otp"
                                        placeholder="otp" />
                                    <span className="focus-input100"></span>
                                </div>
                                {formik.errors.otp && formik.touched.otp ? <div className='error-message'>
                                    {formik.errors.otp}
                                </div> : ""}
                            </> : ""
                            }



                        {status == 'change password' ?
                            <>
                                <div className="wrap-input100 validate-input m-b-16">
                                    <input onBlur={formik.handleBlur} onChange={formik.handleChange}
                                        value={formik.values.password} className="input100"
                                        type="text"
                                        name="password"
                                        placeholder="password" />
                                    <span className="focus-input100"></span>
                                </div>
                                {formik.errors.password && formik.touched.password ? <div className='error-message'>
                                    {formik.errors.password}
                                </div> : ""}

                                <div className="wrap-input100 validate-input m-b-16">
                                    <input onBlur={formik.handleBlur} onChange={formik.handleChange}
                                        value={formik.values.confirm_password} className="input100"
                                        type="text"
                                        name="confirm_password"
                                        placeholder="confirm password" />
                                    <span className="focus-input100"></span>
                                </div>
                                {formik.errors.confirm_password && formik.touched.confirm_password ? <div className='error-message'>
                                    {/* {alert(formik.touched.confirm_password)} */}
                                    {formik.errors.confirm_password}
                                </div> : ""}
                            </>
                            : ""

                        }






                        <div className="container-login100-form-btn c-p-sp-b">
                            {/* <button className="login100-form-btn ch-pass-btn" type='submit'> */}
                            {status === 'send otp' && !inProcess ? GenerateButton('send otp') : ""}
                            {status === 'send otp' && inProcess ? GenerateButton('sending otp', true) : ""}
                            {status === 'otp sent' && !inProcess ? GenerateButton('validate otp') : ""}
                            {status === 'otp sent' && inProcess ? GenerateButton('validating otp', true) : ""}
                            {status === 'change password' && !inProcess ? GenerateButton('change password') : ""}
                            {status === 'otp sent' && inProcess ? GenerateButton('changing password', true) : ""}

                            {/* </button> */}
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}