import topBg from "../assets/TopBackground.png";

export default function Hero({ onNavigate }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Background image — fills the section at every screen size */}
      <div className="absolute inset-0">
        <img
          src={topBg}
          alt="hero background"
          className="w-full h-full object-cover scale-x-[-1]"
          style={{ objectPosition: "70% center" }}
        />
        {/* Gradient: strong on left for text legibility, fades right on desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        {/* Extra bottom fade so content never fights the image on short screens */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-32 sm:py-0">
        <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">

          {/* WELCOME label */}
          <p
            className="text-xs sm:text-sm lg:text-base tracking-[0.25em] uppercase mb-3 sm:mb-4 reveal-up text-yellow-400/60"
            style={{ animationDelay: "0.1s" }}
          >
            Welcome to Daily Dose
          </p>

          {/* Headline */}
          <h1
            className="font-lobster text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-4 sm:mb-6 reveal-up"
            style={{ animationDelay: "0.25s" }}
          >
            We serve the<br />richest coffee<br />in the city!
          </h1>

          {/* Subtitle */}
          <p
            className="text-gray-300 text-sm sm:text-base mb-7 sm:mb-10 max-w-[280px] sm:max-w-sm leading-relaxed reveal-up"
            style={{ animationDelay: "0.4s" }}
          >
            Freshly brewed every day using premium beans sourced from the finest farms. Come in and taste the difference.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 reveal-up" style={{ animationDelay: "0.55s" }}>
            <button
              onClick={() => onNavigate("menu")}
              className="bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:bg-yellow-400 transition-colors text-sm sm:text-base"
            >
              Order Now
            </button>
            <button
              onClick={() => onNavigate("about")}
              className="border border-white/40 text-white font-semibold px-8 py-3.5 rounded-full hover:border-white hover:bg-white/10 transition-colors text-sm sm:text-base"
            >
              Our Story
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 reveal-up"
        style={{ animationDelay: "0.9s" }}>
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
