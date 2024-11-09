import { forwardRef } from "react";

const UploadForm = forwardRef(
  ({ onSubmit, form, setForm, fileInputRef }, ref) => {
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
    const onCheckChange = (e) => {
      setForm((prevState) => ({
        ...prevState,
        available: e.target.checked,
      }));
    };
    return (
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
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="available"
            value="available"
            checked={form.available}
            onChange={onCheckChange}
          />
          AVAILABLE
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            value="painting"
            checked={form.type === "painting"}
            onChange={onChange}
            required
          />
          PAINTING
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            value="photograph"
            checked={form.type === "photograph"}
            onChange={onChange}
            required
          />
          PHOTOGRAPH
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            value="watercolor"
            checked={form.type === "watercolor"}
            onChange={onChange}
            required
          />
          WATERCOLOR
        </label>
        <button className="border bg-slate-100" type="submit">
          SUBMIT
        </button>
      </form>
    );
  }
);

export default UploadForm;
