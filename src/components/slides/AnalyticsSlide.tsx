import {
    AreaChart, Area, LineChart, Line, CartesianGrid,
    XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import SlideContainer from '../ui/SlideContainer';
import { trainingHistory } from '../../data/constants';
import type { MetricItem } from '../../types';

const qualityMetrics: MetricItem[] = [
    { label: 'F1 Score', value: '0.978', bgClass: 'bg-emerald-500' },
    { label: 'mAP@.5', value: '0.962', bgClass: 'bg-cyan-500' },
];

/**
 * Unique gradient ID avoids conflicts during AnimatePresence transitions
 * where two instances of this component briefly coexist in the DOM.
 */
const GRADIENT_ID = 'analytics-acc-gradient';

const AnalyticsSlide: React.FC = () => (
    <SlideContainer>
        <div className="w-full max-w-7xl">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-black text-white">Model Training Analytics</h2>
                    <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-bold">
                        Binary Crossentropy • Adam • Epochs: 8
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500" />
                        <span className="text-[10px] font-black text-emerald-400 uppercase">Training</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
                        <span className="text-[10px] font-black text-cyan-400 uppercase">Validation</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Accuracy area chart */}
                <GlassCard title="Accuracy Convergence" className="lg:col-span-8 min-h-[350px]" icon={TrendingUp}>
                    <div className="h-[280px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trainingHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    {/*
                   * Unique ID prevents gradient conflicts during AnimatePresence
                   * transitions when two slide instances exist simultaneously.
                   */}
                                    <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="epoch" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                                <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} domain={[0.6, 1]} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#0f172a',
                                        border: '1px solid #1e293b',
                                        borderRadius: '12px',
                                        fontSize: '10px',
                                    }}
                                />
                                <Area type="monotone" dataKey="acc" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill={`url(#${GRADIENT_ID})`} />
                                <Area type="monotone" dataKey="val_acc" stroke="#06b6d4" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Side panel */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Loss line chart */}
                    <GlassCard title="Loss Descent" icon={TrendingDown}>
                        <div className="h-24 w-full mt-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trainingHistory}>
                                    <Line type="monotone" dataKey="loss" stroke="#f43f5e" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="val_loss" stroke="#fb7185" strokeWidth={1} strokeDasharray="3 3" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </GlassCard>

                    {/* Quality metrics with progress bars */}
                    <GlassCard title="Quality Metrics">
                        <div className="space-y-4 pt-2">
                            {qualityMetrics.map((metric) => (
                                <div key={metric.label} className="flex flex-col">
                                    <div className="flex justify-between text-[10px] text-slate-500 uppercase font-bold mb-1">
                                        <span>{metric.label}</span>
                                        <span>{metric.value}</span>
                                    </div>
                                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className={`h-full ${metric.bgClass} rounded-full`}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${parseFloat(metric.value) * 100}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, ease: 'easeOut' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    </SlideContainer>
);

export default AnalyticsSlide;
