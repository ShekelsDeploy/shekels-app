import { FC } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

interface Props {
    allowedRoles?: any
}
export const RequireAuth: FC<Props> = ({ allowedRoles }) => {
    const auth = useSelector((state: any) => state.accountData.value)
    const location = useLocation();

    return (
        auth?.roles?.find((role: any) => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/" state={{ from: location }} replace />
    );
}