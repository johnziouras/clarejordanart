import { createRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadArtwork } from "../features/artwork/artworkSlice";

const Upload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isSuccess, isError, message } = useSelector((state) => state.artwork);

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
    imageFile: null,
    title: "",
    altText: "",
    height: "",
    width: "",
    medium: "",
    year: "",
    description: "",
  };

  const fileInputRef = createRef();

  const [form, setForm] = useState(emptyForm);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imageFile", form.imageFile);
    formData.append("title", form.title);
    formData.append("altText", form.altText);
    formData.append("height", form.height);
    formData.append("width", form.width);
    formData.append("medium", form.medium);
    formData.append("year", form.year);
    formData.append("description", form.description);

    dispatch(uploadArtwork(formData));
    setForm(emptyForm);
    fileInputRef.current.value = "";
  };

  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onFileChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      imageFile: e.target.files[0],
    }));
  };

  return (
    <main>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <section className="flex items-center justify-center h-screen">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <input
            required
            type="file"
            name="imageFile"
            ref={fileInputRef}
            onChange={onFileChange}
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={onChange}
          />
          <input
            type="text"
            name="altText"
            placeholder="Alt Text"
            value={form.altText}
            onChange={onChange}
          />
          <input
            required
            type="number"
            name="width"
            placeholder="Width"
            value={form.width}
            onChange={onChange}
          />
          <input
            required
            type="number"
            name="height"
            placeholder="Height"
            value={form.height}
            onChange={onChange}
          />
          <input
            required
            type="text"
            name="medium"
            placeholder="Medium"
            value={form.medium}
            onChange={onChange}
          />
          <input
            required
            type="number"
            name="year"
            placeholder="Year"
            value={form.year}
            onChange={onChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={onChange}
          ></textarea>
          <button className="border bg-slate-100" type="submit">
            SUBMIT
          </button>
        </form>
      </section>
    </main>
  );
};

export default Upload;
