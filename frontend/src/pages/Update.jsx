import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = () => {};
  const onChange = () => {};

  return (
    <main>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <section className="flex items-center justify-center h-screen">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <button className="border bg-slate-100" type="submit">
            SUBMIT
          </button>
        </form>
      </section>
    </main>
  );
};

export default Upload;
