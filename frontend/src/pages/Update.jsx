import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UpdateForm from "../components/UpdateForm";

const Update = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const { id } = useParams();

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <section className="flex items-center justify-center h-full">
        <UpdateForm id={id} />
      </section>
    </>
  );
};

export default Update;
