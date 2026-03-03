import { Boxes, Layers } from 'lucide-react';
import CodeBlock from '../ui/CodeBlock';
import SlideContainer from '../ui/SlideContainer';
import { codeSnippets } from '../../data/constants';

const MobileNetSlide: React.FC = () => (
    <SlideContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl items-center">
            <div>
                <h2 className="text-4xl font-black text-white mb-6">Inverted Residuals</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                    Optimizing for the edge. MobileNetV2 uses depthwise separable convolutions
                    to maintain high-accuracy.
                </p>

                <div className="grid grid-cols-1 gap-4">
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex gap-4">
                        <Layers className="text-rose-400 shrink-0" />
                        <div>
                            <h4 className="font-bold text-white text-sm">Linear Bottlenecks</h4>
                            <p className="text-slate-500 text-xs">
                                Protects feature integrity by removing non-linearity in thin layers.
                            </p>
                        </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex gap-4">
                        <Boxes className="text-amber-400 shrink-0" />
                        <div>
                            <h4 className="font-bold text-white text-sm">Depthwise Convolutions</h4>
                            <p className="text-slate-500 text-xs">
                                Reduces compute by 9× through channel-wise filtering.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <CodeBlock
                title="mobilenet_v2.py :: LayerLogic"
                code={codeSnippets.mobilenet}
                color="amber"
            />
        </div>
    </SlideContainer>
);

export default MobileNetSlide;
