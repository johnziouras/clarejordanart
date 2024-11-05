import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginForm from "../components/LoginForm";
import Spinner from "../components/Spinner";
import { login, reset } from "../features/auth/authSlice";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <LoginForm
        email={email}
        password={password}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </main>
  );
}

export default Login;
