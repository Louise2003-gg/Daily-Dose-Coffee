import useReveal from "../hooks/useReveal";
import coffee from "../assets/coffee.png";
import coffee2 from "../assets/coffee2.png";

export default function BeansBanner({ onNavigate }) {
  const [ref, visible] = useReveal(0.2);

  return (
    <section ref={ref} className="relative bg-[#b8860b] py-10 sm:py-12 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 md:w-48 opacity-80">
        <img src={coffee} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 md:w-48 opacity-80">
        <img src={coffee2} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10 text-center px-4">
        <h2
          className={`font-playfair text-white text-3xl sm:text-4xl md:text-5xl mb-4 ${visible ? "reveal-up" : "opacity-0"}`}
          style={{ animationDelay: "0.1s" }}
        >
          Check Out Our Best<br />Coffee Beans
        </h2>
        <div className={visible ? "reveal-up" : "opacity-0"} style={{ animationDelay: "0.25s" }}>
          <button
            onClick={() => onNavigate("menu")}
            className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors"
          >
            Explore Our Products »
          </button>
        </div>
      </div>
    </section>
  );
}
