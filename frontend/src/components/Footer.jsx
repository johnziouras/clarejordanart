const Footer = () => {
  return (
    <footer className="w-full">
      <div className="flex flex-col items-center">
        <div className="container mx-auto py-4 flex justify-center items-end">
          <div className="flex justify-center items-center space-x-4">
            <div className="h-8 w-8 relative">
              <a
                href="https://www.instagram.com/clareejordanart/"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/icons/instagram.svg" alt="Instagram logo" />
              </a>
            </div>
            <div className="h-8 w-8 relative">
              <a
                href="https://www.linkedin.com/in/clareejordan"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/icons/linkedin.svg" alt="LinkedIn logo" />
              </a>
            </div>
          </div>
        </div>
        <p className="italic text-[0.5rem] text-slate-400">
          Disclaimer: All original works are protected by US Copyright © and All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
