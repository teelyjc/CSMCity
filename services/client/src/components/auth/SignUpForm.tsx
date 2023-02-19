import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavLink from '@component/navbar/NavLink';
import fetch from '@util/fetch'

import type { FormEvent } from 'react';

export const SignUpForm = () => {
	const navigate = useNavigate();

	const [ registerUserData, setRegisterUserData ] = useState({
		username: "",
		password: "",
		confirm_password: "",
		email: "",
	});

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setRegisterUserData({ ...registerUserData, [name]: value });
	}

	const submitSignUp = async (e: FormEvent) => {
		e.preventDefault();
		const response = await fetch('POST', '/auth/signup', {
			username: registerUserData.username,
			password: registerUserData.password,
			email: registerUserData.email
		})

		console.log(response.data);
		setTimeout(() => navigate('/auth/signin'), 1000)
	}
	return (
		<form className='flex flex-col border rounded-md max-w-sm space-y-4 pb-5 shadow-md'>
				<h1 className='text-3xl border-l-4 border-b border-l-blue-500 px-2 py-1.5'>
					SignUp.
				</h1>
				<div className="flex flex-col mx-8">
					<label htmlFor='username' className='text-lg'>
						Username
					</label>
					<input
						className='border-b py-1 focus:outline-none'
						name='username'
						type='text'
						value={ registerUserData.username }
						onChange={ handleChange }
					/>
				</div>
				<div className="flex flex-col mx-8">
					<label htmlFor="password">
						Password
					</label>
					<input
						className='border-b py-1 focus:outline-none'
						name='password'
						type='password'
						value={ registerUserData.password }
						onChange={ handleChange }
					/>
				</div>
				<div className="flex flex-col mx-8">
					<label htmlFor="confirm_password">
						Confirm Password
					</label>
					<input
						className='border-b py-1 focus:outline-none'
						name='confirm_password'
						type='password'
						value={ registerUserData.confirm_password }
						onChange={ handleChange }
					/>
				</div>
				<div className="flex flex-col mx-8">
					<label htmlFor="email">
						E-mail
					</label>
					<input
						className='border-b py-1 focus:outline-none'
						name='email'
						type='email'
						value={ registerUserData.email }
						onChange={ handleChange }
					/>
				</div>
				<div className='flex flex-col px-4 space-y-1'>
					<button type='submit' onClick={ submitSignUp } className='btn-custom'>
						Sign Up
					</button>
					<NavLink href='/auth/signin' title='already a member ?' className='text-link-custom' />
				</div>
			</form>
	)
}
