import { motion } from 'framer-motion';
import CodeBlock from '../ui/CodeBlock';
import SlideContainer from '../ui/SlideContainer';
import { codeSnippets } from '../../data/constants';

/**
 * Storage comparison: H5 original (3.4 MB) vs TFLite quantized (1.8 MB).
 * The bar fills left-to-right representing the TFLite portion (53% of original),
 * clearly showing the 47% savings achieved by quantization.
 *
 * Fixed: previous version animated to 53% but labelled that direction "Original (H5)",
 * which was semantically inverted — the filled portion IS the TFLite model size.
 */
const TFLITE_RATIO = 53; // 1.8 / 3.4 ≈ 53% — TFLite is 53% the size of H5

const OptimizationSlide: React.FC = () => (
    <SlideContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl items-center">
            <div>
                <h2 className="text-4xl font-black text-white mb-6">TFLite Quantization</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                    Shrinking memory footprint from 3.4 MB to 1.8 MB for edge deployment.
                </p>

                <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
                    <div className="flex justify-between items-center mb-6 font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                        <span>Storage Comparison</span>
                        <span className="text-emerald-400">47% Savings</span>
                    </div>

                    {/* H5 baseline bar (full width, dimmed) */}
                    <div className="mb-3">
                        <div className="flex justify-between text-[9px] text-slate-500 font-mono uppercase mb-1">
                            <span>Original · H5</span>
                            <span>3.4 MB</span>
                        </div>
                        <div className="h-5 w-full bg-slate-700/60 rounded-full" />
                    </div>

                    {/* TFLite animated bar */}
                    <div>
                        <div className="flex justify-between text-[9px] text-cyan-400 font-mono uppercase mb-1">
                            <span>Quantized · TFLite FP16</span>
                            <span>1.8 MB</span>
                        </div>
                        <div className="h-5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${TFLITE_RATIO}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className="h-full bg-cyan-500 rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <CodeBlock
                title="setup_env.py :: Quantize"
                code={codeSnippets.optimization}
                color="cyan"
            />
        </div>
    </SlideContainer>
);

export default OptimizationSlide;
