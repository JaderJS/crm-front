import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { ReactNode, useEffect, useState } from "react";
import { APP_ROUTES } from "./app-routes";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const { push } = useRouter();
	const { "fwo.token": token } = parseCookies();
	const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

	useEffect(() => {
		if (token) {
			setUserIsAuthenticated(true);
		} else {
			setUserIsAuthenticated(false);
			push(APP_ROUTES.public.Login.path);
		}
	}, [token, push,]);

	return (
		<>
			{userIsAuthenticated && children}
			{!userIsAuthenticated && null}
		</>
	);
};
