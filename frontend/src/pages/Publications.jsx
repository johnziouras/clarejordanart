import Publication from "../components/Publication";

const Publications = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex space-x-4 w-2/3 h-2/3 justify-center">
        <Publication
          artworkTitle={'"Felix"'}
          publicationTitle={"Roski Mag"}
          url={"https://www.roskimag.com/#/issue_17"}
          linkText={"Issue XVII Page 57"}
          year={2024}
        />
      </div>
    </div>
  );
};
export default Publications;
