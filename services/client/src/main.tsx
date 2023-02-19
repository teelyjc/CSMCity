import { createRoot } from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import { IndexPage } from '@page/IndexPage';
import Page404 from '@page/404';
import { SignUpPage } from '@page/auth/SignUpPage';
import { SignInPage } from '@page/auth/SignInPage';
import DashboardPage from '@page/dashboard/DashboardPage';

import UserProvider from '@hook/userContext';

import '@style/tailwind.css';

const main = document.getElementById('main') as HTMLElement;

const router = createBrowserRouter([
  { path: '/', element: <IndexPage /> },
  { path: '*', element: <Page404 /> },
	{
		path: '/auth',
		children: [
			{ path: 'signup', element: <SignUpPage /> },
			{ path: 'signin', element: <SignInPage /> },
		],
	},
	{
		path: '/dashboard',
		element: <DashboardPage />,
		children: [
			// Children of dashboard.
		],
	}
]);

createRoot(main).render(
	<UserProvider>
		<RouterProvider router={ router } />
	</UserProvider>
);
