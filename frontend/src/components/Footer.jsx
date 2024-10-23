const Footer = () => {
  return (
    <footer className="mt-16 w-full">
      <div className="container mx-auto py-4 flex justify-center items-end">
        <div className="flex justify-center items-center space-x-4">
          <div className="h-16 w-16 relative">
            <a
              href="https://www.instagram.com/clareejordanart/"
              target="_blank"
              rel="noreferrer"
            >
              <image
                src="../../public/icons/instagram.svg"
                alt="Instagram logo"
                fill
              />
            </a>
          </div>
          <div className="h-16 w-16 relative">
            <a
              href="https://www.linkedin.com/in/clareejordan"
              target="_blank"
              rel="noreferrer"
            >
              <image
                src="../../public/icons/linkedin.svg"
                alt="LinkedIn logo"
                fill
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
