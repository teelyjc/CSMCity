import { useEffect, FormEvent } from 'react';
import { useNavigate } from "react-router-dom"

import NavLink from '@component/navbar/NavLink';
import { useUser } from "@hook/userContext"
import fetch from '@util/fetch';

export default function NavbarNav() {
	const { user, fetchUser } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		fetchUser()
	}, []);

	const SignoutHandler = async (e: FormEvent) => {
		e.preventDefault();

		await fetch('DELETE', '/auth/signout');
		fetchUser();
		navigate('/')
	}

	return (
		<div className="flex flex-row justify-between border rounded-md shadow-md my-2 py-2 mx-4">
			<ul className="flex flex-row space-x-4 ml-2">
				<li>
					<NavLink href='/' title='Home' />
				</li>
			</ul>
				{
					!user
					? (
						<ul className="flex flex-row space-x-4 mr-2">
							<li>
								<NavLink href='/auth/signin' title='SignIn' />
							</li>
							<li>
								<NavLink href='/auth/signup' title='SignUp' />
							</li>
						</ul>
					)
					: (
						<ul className="flex flex-row space-x-4 mr-2">
							<li>{ user.username }</li>
							<li>
								<button onClick={ SignoutHandler }>SignOut</button>
							</li>
						</ul>
					)
				}
		</div>
	)
}
