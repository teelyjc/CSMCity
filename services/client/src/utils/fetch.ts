import axios from 'axios';

type Method = "GET" | "POST" | "DELETE" | "PATCH";

const BASE_URL = `http://localhost:3000/api`;

export default async function fetch(method: Method, url: string, data?: any) {
	const reponse = await axios({
		method: method,
		withCredentials: true,
		data: data,
		url: BASE_URL + url,
	}).catch(e => {
		return e.response
	})

	return reponse;
}
