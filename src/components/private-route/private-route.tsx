import { Navigate } from "react-router-dom"
import { AppPaths } from "../../App"

type PrivateProps = {
    isAuthenticated: boolean
    children: JSX.Element
}

const PrivateRoute = (props: PrivateProps) => {

    if (props.isAuthenticated) {
        return props.children

    } else {
        return <Navigate to={AppPaths.Login} />
    }
}

export default PrivateRoute