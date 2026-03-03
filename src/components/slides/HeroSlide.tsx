import { motion } from 'framer-motion';
import { Database } from 'lucide-react';
import SlideContainer from '../ui/SlideContainer';
import type { StatItem } from '../../types';

const stats: StatItem[] = [
    { label: 'Precision', value: '98.2%', colorClass: 'text-emerald-400' },
    { label: 'Recall', value: '97.5%', colorClass: 'text-cyan-400' },
    { label: 'Latency', value: '22ms', colorClass: 'text-amber-400' },
    { label: 'Architecture', value: 'SOTA', colorClass: 'text-rose-400' },
];

const HeroSlide: React.FC = () => (
    <SlideContainer>
        <div className="text-center max-w-5xl">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-12"
            >
                <Database size={14} /> Neural Inference Engine v4.0
            </motion.div>

            <h1 className="text-6xl md:text-9xl font-black text-white mb-10 tracking-tighter leading-none">
                Safety <br />
                <span className="text-emerald-500">Vision</span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
                Industrial real-time face mask detection using{' '}
                <span className="text-white">YuNet</span> face tracking and{' '}
                <span className="text-white">MobileNetV2</span> classification.
            </p>

            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white/5 border border-white/5 rounded-3xl p-6 text-center shadow-xl"
                    >
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                            {stat.label}
                        </p>
                        <p className={`text-3xl font-black ${stat.colorClass}`}>{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    </SlideContainer>
);

export default HeroSlide;
