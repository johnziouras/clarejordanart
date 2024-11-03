import { useState } from "react";
import { Helmet } from "react-helmet";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <section className="flex items-center justify-center h-screen">
        <form className="flex flex-col gap-4">
          <input
            className="border p-2"
            placeholder="Enter your email"
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
          ></input>
          <input
            className="border p-2"
            placeholder="Enter your password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
          ></input>
        </form>
      </section>
    </main>
  );
}

export default Login;
