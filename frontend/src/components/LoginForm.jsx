const LoginForm = ({ email, password, onChange, onSubmit }) => {
  return (
    <section className="flex items-center justify-center h-screen">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
        <button className="border bg-slate-100" type="submit">
          SUBMIT
        </button>
      </form>
    </section>
  );
};
export default LoginForm;
