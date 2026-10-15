import { Link } from "react-router-dom";
import './not-found.css'
import { AppPaths } from "../../App";

const NotFound = () => {

    return (
            <div className="page__notfound container">
                <h1>Страница не найдена...</h1>
                <Link to={AppPaths.Main}>
                    <b>Вернуться на главную</b>
                </Link>
            </div>
    )
}

export default NotFound