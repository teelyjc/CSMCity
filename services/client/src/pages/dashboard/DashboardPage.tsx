import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LayoutComponent } from "@component/LayoutComponent";
import { useUser } from "@hook/userContext";

export default function DashboardPage() {
	const { user, fetchUser } = useUser();

	useEffect(() => {
		const main = async () => {
			await fetchUser();
		}
		main();
	}, [])

	return (
		<LayoutComponent>
			<div className="flex justify-center">
				<h1>Welcome back { user?.username }</h1>
			</div>
		</LayoutComponent>
	)
}
