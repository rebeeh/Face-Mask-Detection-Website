import { motion } from 'framer-motion';
import { Github, Shield } from 'lucide-react';
import SlideContainer from '../ui/SlideContainer';

/** Python detection code — the repo this presentation showcases. */
const REPO_URL = 'https://github.com/rebeeh/Face-Mask-Detection-Python';

/** This presentation site's own repository. */
const OVERVIEW_URL = 'https://github.com/rebeeh/Face-Mask-Detection-Overview';

const ConclusionSlide: React.FC = () => (
    <SlideContainer>
        <motion.div
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className="mb-12"
        >
            <div className="w-32 h-32 rounded-[3rem] bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-emerald-500/20 border-4 border-white/20">
                <Shield className="text-white" size={64} />
            </div>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 text-center tracking-tighter leading-none">
            Vision <br /> Secured.
        </h1>

        <p className="text-slate-400 text-center max-w-xl mb-16 text-lg font-medium leading-relaxed">
            Industrial face mask detection system. Ready for deployment.
        </p>

        <div className="flex flex-col sm:flex-row gap-5">
            <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-12 py-5 bg-emerald-500 text-slate-950 font-black rounded-2xl hover:bg-emerald-400 transition-all shadow-2xl active:scale-95"
            >
                <Github size={20} /> CODE REPO
            </a>
            <a
                href={OVERVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-12 py-5 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all active:scale-95 shadow-xl"
            >
                THIS PRESENTATION
            </a>
        </div>
    </SlideContainer>
);

export default ConclusionSlide;
