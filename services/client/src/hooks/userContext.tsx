import {
	createContext,
	useContext,
	useState,
} from "react";

import fetch from "@util/fetch";

import type { ReactNode } from 'react'

export interface UserData {
	_id: string;
	username: string;
	password: string;
	email: string;
	salt: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number
}

type UserContextType = {
	user?: UserData | null ;
	fetchUser: () => any
};

const UserContext = createContext<UserContextType>({ user: null, fetchUser: () => null });

interface Props {
	children: ReactNode
}

const UserProvider = ({ children }: Props) => {
	const [ user, setUser ] = useState<UserData>();

	const fetchUser = async () => {
		const response = await fetch('GET', '/auth/user');
		setUser(response.data.user);
	}
	return (
		<UserContext.Provider value={{ user, fetchUser }}>
			{ children }
		</UserContext.Provider>
	)
}

export default UserProvider;

const useUser = () => useContext(UserContext);
export { UserContext, useUser };
