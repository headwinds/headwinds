const PortholePreview = () => {
  return (
    <div className="bg-[#C4CFDE] rounded-2xl px-6 md:px-12 py-8 md:py-10 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-5">
      <div className="w-full flex justify-center md:justify-start">
        <img
          src="/porthole/porthole_preview_1.png"
          alt="Porthole Preview"
          className="rounded-xl w-full max-w-[200px] h-[160px] object-cover"
        />
      </div>
      <div className="w-full flex justify-center md:justify-start">
        <img
          src="/porthole/porthole_preview_2.png"
          alt="Porthole Preview"
          className="rounded-xl w-full max-w-[200px] h-[160px] object-cover "
        />
      </div>
      <div className="w-full flex justify-center md:justify-start">
        <img
          src="/porthole/porthole_preview_3.png"
          alt="Porthole Preview"
          className="rounded-xl w-full max-w-[200px] h-[160px] object-cover"
        />
      </div>
    </div>
  );
};

export default PortholePreview;
