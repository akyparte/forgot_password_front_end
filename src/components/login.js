import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Login(params) {
	let navigate = useNavigate();
	let [loading, setLoading] = useState(false);

	const validateCredentials = (values) => {
		let errors = {};

		if (!values.username) {
			errors.username = 'required';
		}
		if (!values.password) {
			errors.password = 'required';
		}
		return errors;

	}
	const formik = useFormik({
		initialValues: {
			username: '',
			password: ''
		},
		validate: validateCredentials,
		onSubmit: async (values) => {
			try {
				setLoading(true);
				let { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, values);
				if (data.incorrectCredentials) {
					// user created
					alert('Incorrect credentials !')
				} else if (data.validUser) {
					localStorage.setItem('sid',data.token)
					navigate('/secret-data')
				}
			} catch (error) {
				console.log(error)
			}
		},
	});

	const goToforgotPassword = () => {

		navigate('/forgot-password')
	}
	const goToSignup = () => {

		navigate('/signup')
	}


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
							Sign In
						</span>

						<div className='wrap-input100 m-b-16' >
							<input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username} className="input100" type="text" name="username" placeholder="Username" />
							<span className="focus-input100"></span>
						</div>
						{formik.errors.username && formik.touched.username ? <div className='error-message'>
                            {formik.errors.username}
                        </div> : ""}

						<div className="wrap-input100 validate-input" >
							<input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className="input100" type="password" name="password" placeholder="Password" />
							<span className="focus-input100"></span>
						</div>
						{formik.errors.password && formik.touched.password ? <div className='error-message'>
                            {formik.errors.password}
                        </div> : ""}

						<div className="text-right p-t-13 p-b-23">
							<a href="#" className="txt2" onClick={goToforgotPassword}>
								Forgot / Password?
							</a>
						</div>

						<div className="container-login100-form-btn">
							{loading ? <button className="login100-form-btn" type='submit'>
							    signing in
								<i  style={{marginLeft:'10px'}}className="fa fa-circle-o-notch fa-spin"></i>
							</button> :
								<button className="login100-form-btn" type='submit'>
									sign in
								</button>
							}

						</div>

						<div className="flex-col-c p-t-170 p-b-40">
							<span className="txt1 p-b-9">
								Don’t have an account?
							</span>

							<a href="#" className="txt3" onClick={goToSignup}>
								Sign up now
							</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}