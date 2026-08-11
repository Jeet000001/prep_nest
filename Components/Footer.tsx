const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0B0907]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 px-5 py-8 text-center sm:px-6 lg:px-8">
        <p className="font-mono text-xs text-neutral-500 sm:text-sm">
          Built with{" "}
          <span className="text-[#F6DAA0]">♥</span>{" "}
          and a lot of curiosity by{" "}
          <span className="text-neutral-300">Jeet</span>.
        </p>

        <p className="font-mono text-[10px] text-neutral-700 sm:text-xs">
          PrepNest · Learn. Practice. Prepare.
        </p>
      </div>
    </footer>
  );
};

export default Footer;