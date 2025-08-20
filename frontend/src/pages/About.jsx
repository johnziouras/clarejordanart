const About = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-3xl font-bold mb-8">ABOUT THE ARTIST</h1>
      <div className="flex flex-col space-y-4 w-1/2 items-center">
        <img
          src="artist.jpg"
          className="max-w-xs md:max-w-md object-contain"
          alt="Portrait of the artist."
        ></img>
        <p className="mb-8 p-0 font-serif font-thin text-xs md:text-sm text-center">
          Clare is a 23 year-old artist from Los Angeles, California. She has
          been studying art her whole life and most recently earned a minor in
          Communication Design from Roski School of Art and Design. She enjoys
          experimenting with different techniques and subject matter to
          constantly develop her skills.
        </p>
      </div>
    </div>
  );
};

export default About;
