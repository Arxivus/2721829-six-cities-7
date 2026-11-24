import { Navigate } from "react-router-dom"
import { AppPaths } from "../../App"
import { useSelector } from "react-redux"
import { AuthorizationStatus,  } from "../../const"
import { RootState } from "../../store"

type PrivateProps = {
    children: JSX.Element
}

const PrivateRoute = (props: PrivateProps) => {

    const authStatus = useSelector((state: RootState) => state.authorizationStatus)

    if (authStatus === AuthorizationStatus.Auth) {
        return props.children

    } else {
        return <Navigate to={AppPaths.Login} />
    }
}

export default PrivateRoute