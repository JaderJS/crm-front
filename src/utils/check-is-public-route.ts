
import { APP_ROUTES } from "./app-routes";

export const checkIsPublicRoute = (pathname: string) => {
	const isPublicRoute = Object.values(APP_ROUTES.public).some(
		(route) => route.path === pathname
	);
    
	return isPublicRoute;
};
