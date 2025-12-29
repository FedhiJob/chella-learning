import { ArrowRight } from 'lucide-react';
 
import { Link } from 'react-router-dom';
export default function Hero() {
    return (
         <section className="px-8 py-20 text-center max-w-4xl mx-auto fade-in">
        <h1 className="text-6xl font-bold font-montserrat mb-6 leading-tight">
          Turn Every Action Into <span className="text-[#FFD700]">Reward</span>
        </h1>
        <p className="text-xl text-gray-400 mb-12 font-poppins">
          Earn bonuses, complete tasks, and grow your network with Chella. The exclusive financial membership for the
          rewards generation.
        </p>

        <div className="flex gap-4 justify-center mb-16">
          <Link to="/register">
            <button className="btn-gold flex items-center gap-2">
              Get Started <ArrowRight size={20} />
            </button>
          </Link>
          <Link to="/login">
            <button className="btn-dark">Login to Account</button>
          </Link>
        </div>
      </section>
    );
}
