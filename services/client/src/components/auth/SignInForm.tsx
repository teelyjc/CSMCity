import { useState } from "react"
import { useNavigate } from "react-router-dom";

import NavLink from "@component/navbar/NavLink"
import fetch from "@util/fetch";

import type { FormEvent } from 'react';

export const SignInForm = () => {
	const navigate = useNavigate();

	const [ loginUserData, setLoginUserData ] = useState({
		username: "",
		password: "",
	});

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setLoginUserData({ ...loginUserData, [name]: value });
	}

	const submitSignIn = async (e: FormEvent) => {
		e.preventDefault();
		const response = await fetch('POST', '/auth/signin', {
			username: loginUserData.username,
			password: loginUserData.password,
		});

		console.log(response);
		setTimeout(() => navigate('/dashboard'), 1000)
	}

	return (
		<form className='flex flex-col border rounded-md max-w-sm space-y-4 pb-5 shadow-md'>
				<h1 className='text-3xl border-l-4 border-b border-l-blue-500 px-2 py-1.5'>
					SignIn.
				</h1>
				<div className="flex flex-col mx-8">
					<label htmlFor='username' className='text-lg'>
						Username
					</label>
					<input
						className='border-b py-1 focus:outline-none'
						name='username'
						type='text'
						value={ loginUserData.username }
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
						value={ loginUserData.password }
						onChange={ handleChange }
					/>
				</div>
				<div className='flex flex-col px-4 space-y-1'>
					<button type='submit' onClick={ submitSignIn } className='btn-custom'>
						Sign In
					</button>
					<NavLink href='/auth/signup' title='not a member yet ?' className='text-link-custom' />
				</div>
			</form>
	)
}
