import { Link, useNavigate } from "react-router-dom";
import { AppPaths } from "../../App";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { logInAction } from "../../store/api-actions";
import { AuthData } from "../../types/types";
import { FormEvent, ChangeEvent } from "react";

const Login = () => {

  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState<AuthData>({ email: '', password: '' })
  const navigate = useNavigate()


  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(data => ({ ...data, [name]: value }))
  }

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).+$/
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const email = formData?.email
    const password = formData?.password

    if (emailPattern.test(email) && passwordPattern.test(password)) {
      const result = await dispatch(logInAction({ email, password }))
      console.log(email, password);

      if (logInAction.fulfilled.match(result)) {
        navigate(AppPaths.Main)

      }
    } else {
      console.log('Неверный логин или пароль');
    }
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppPaths.Main} className="header__logo-link">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleFieldChange}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleFieldChange}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                onClick={handleFormSubmit}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
};

export default Login;
