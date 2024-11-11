import { createRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import UploadForm from "../components/UploadForm";
import { uploadArtwork } from "../features/artwork/artworkSlice";

const Upload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.artwork
  );

  const fileInputRef = createRef();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isSuccess) {
      alert("Image uploaded successfully!");
    }
    if (isError) {
      alert(`Error: ${message}`);
    }
  }, [isSuccess, isError, message, dispatch]);

  const emptyForm = {
    primaryFile: null,
    alternativeFiles: [],
    title: "",
    altText: "",
    height: "",
    width: "",
    medium: "",
    year: "",
    description: "",
    available: false,
    type: "",
  };

  const [form, setForm] = useState(emptyForm);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("primaryFile", form.primaryFile);
    form.alternativeFiles.forEach((file) => {
      formData.append("alternativeFiles", file);
    });
    formData.append("title", form.title);
    formData.append("altText", form.altText);
    formData.append("height", form.height);
    formData.append("width", form.width);
    formData.append("medium", form.medium);
    formData.append("year", form.year);
    formData.append("description", form.description);
    formData.append("available", form.available);
    formData.append("type", form.type);

    dispatch(uploadArtwork(formData));
    setForm(emptyForm);
    fileInputRef.current.value = "";
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <section className="flex items-center justify-center h-screen">
        {isLoading ? (
          <Spinner />
        ) : (
          <UploadForm
            onSubmit={onSubmit}
            form={form}
            setForm={setForm}
            fileInputRef={fileInputRef}
          />
        )}
      </section>
    </>
  );
};

export default Upload;
