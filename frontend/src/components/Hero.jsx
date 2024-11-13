const Hero = () => {
  return (
    <section>
      <div className="relative lg:h-[400px]  h-[300px] mt-16">
        <img
          className="w-full h-full object-contain"
          src="/hero_image.jpeg"
          alt="Hero"
        />
      </div>
      <div className="w-2/3 mt-4 16 shrink text-center mx-auto">
        <h1 className="md:text-2xl text-xl font-thin font-serif">
          Thank you for visiting Clare's virtual gallery.
        </h1>
        <h1 className="md:text-2xl text-xl font-thin font-serif">
          Contact the artist with any questions or commission requests.
        </h1>
        <h1 className="md:text-2xl text-xl text-xlitalic font-thin font-serif">
          Enjoy!
        </h1>
      </div>
    </section>
  );
};

export default Hero;
