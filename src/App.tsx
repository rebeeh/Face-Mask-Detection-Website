import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Shield, AlertTriangle, Cpu, Activity, Layout, Terminal, 
  Github, ChevronRight, ChevronLeft, CheckCircle, Boxes, Layers, Zap, 
  Maximize, Smartphone, Monitor, Database, TrendingUp, Gauge, 
  Share2, TrendingDown
} from 'lucide-react';

/**
 * --- DATA CONSTANTS ---
 */
const trainingHistory = [
  { epoch: 1, acc: 0.72, val_acc: 0.68, loss: 0.55, val_loss: 0.60 },
  { epoch: 2, acc: 0.84, val_acc: 0.81, loss: 0.38, val_loss: 0.42 },
  { epoch: 3, acc: 0.89, val_acc: 0.87, loss: 0.25, val_loss: 0.29 },
  { epoch: 4, acc: 0.93, val_acc: 0.91, loss: 0.18, val_loss: 0.22 },
  { epoch: 5, acc: 0.95, val_acc: 0.93, loss: 0.12, val_loss: 0.15 },
  { epoch: 6, acc: 0.97, val_acc: 0.95, loss: 0.08, val_loss: 0.11 },
  { epoch: 7, acc: 0.98, val_acc: 0.97, loss: 0.05, val_loss: 0.08 },
  { epoch: 8, acc: 0.982, val_acc: 0.978, loss: 0.04, val_loss: 0.07 },
];

const augmentationData = [
  { name: 'Original', val: 100 },
  { name: 'Rotation', val: 85 },
  { name: 'Brightness', val: 92 },
  { name: 'Blur', val: 78 },
  { name: 'Zoom', val: 88 },
];

const classDistribution = [
  { name: 'With Mask', value: 1916, fill: '#10b981' },
  { name: 'No Mask', value: 1917, fill: '#f43f5e' },
];

const codeSnippets = {
  preprocessing: `def preprocess_face(self, face_image):
    # 1. Color Space Parity (BGR to RGB)
    face = cv2.cvtColor(face_image, cv2.COLOR_BGR2RGB)
    
    # 2. Aspect-Ratio Preserving Padding
    h, w = face.shape[:2]
    max_dim = max(h, w)
    square_img = np.zeros((max_dim, max_dim, 3), dtype="uint8")
    square_img[dy:dy+h, dx:dx+w] = face
    
    # 3. Model Normalization [-1, 1]
    face = cv2.resize(square_img, (224, 224))
    return preprocess_input(img_to_array(face))`,
  threading: `class ThreadedCamera:
    def __init__(self, src=0):
        self.cap = cv2.VideoCapture(src)
        self.read_lock = threading.Lock()
        self.started = True
        
    def update(self):
        while self.started:
            grabbed, frame = self.cap.read()
            with self.read_lock:
                self.frame = frame # Atomic Update
                self.grabbed = grabbed
            time.sleep(0.005) # Prevent CPU spikes`,
  optimization: `# FP16 Quantization via TFLite
converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.target_spec.supported_types = [tf.float16]
tflite_model = converter.convert()`,
  yunet: `self.detector = cv2.FaceDetectorYN.create(
    model=config.FACE_MODEL_YUNET, 
    input_size=(w, h),
    score_threshold=0.6,
    nms_threshold=0.3,
    backend_id=cv2.dnn.DNN_BACKEND_DEFAULT
)`
};

const GlassCard = ({ children, title, icon: Icon, className = "", delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`backdrop-blur-2xl bg-slate-900/60 border border-white/10 rounded-[2rem] p-5 shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all flex flex-col ${className}`}
  >
    {title && (
      <div className="flex items-center gap-3 mb-4 relative z-10 shrink-0">
        <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
          {Icon && <Icon size={16} />}
        </div>
        <h3 className="text-slate-100 font-bold text-[10px] uppercase tracking-[0.2em]">{title}</h3>
      </div>
    )}
    <div className="relative z-10 flex-grow h-full">
      {children}
    </div>
  </motion.div>
);

const CodeBlock = ({ code, title, color = "emerald" }) => (
  <div className="w-full flex flex-col shadow-2xl">
    <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-x border-t border-white/5 rounded-t-3xl">
      <div className="flex items-center gap-3">
        <Terminal size={14} className={`text-${color}-400`} />
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{title}</span>
      </div>
      <div className="flex gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
        <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
      </div>
    </div>
    <div className="bg-slate-950 p-6 rounded-b-3xl border border-white/5 overflow-x-auto font-mono text-xs md:text-sm leading-relaxed">
      <pre className={`text-${color}-300/80`}>{code}</pre>
    </div>
  </div>
);

const SlideContainer = ({ children }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="w-full h-full flex flex-col items-center justify-center p-4 md:p-12 lg:p-20 overflow-y-auto"
  >
    {children}
  </motion.div>
);

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'hero',
      content: (
        <SlideContainer>
          <div className="text-center max-w-5xl">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-12">
              <Database size={14} /> Neural Inference Engine v4.0
            </motion.div>
            <h1 className="text-6xl md:text-9xl font-black text-white mb-10 tracking-tighter leading-none">
              Safety <br/><span className="text-emerald-500">Vision</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
              Industrial real-time face mask detection using <span className="text-white">YuNet</span> face tracking and <span className="text-white">MobileNetV2</span> classification.
            </p>
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { l: 'Precision', v: '98.2%', c: 'text-emerald-400' },
                { l: 'Recall', v: '97.5%', c: 'text-cyan-400' },
                { l: 'Latency', v: '22ms', c: 'text-amber-400' },
                { l: 'Architecture', v: 'SOTA', c: 'text-rose-400' }
              ].map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/5 rounded-3xl p-6 text-center shadow-xl">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{s.l}</p>
                  <p className={`text-3xl font-black ${s.c}`}>{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </SlideContainer>
      )
    },
    {
      id: 'data',
      content: (
        <SlideContainer>
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Dataset Foundations</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Balanced dataset of 3,833 base images, expanded via geometric and photometric augmentation.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
            <GlassCard title="Augmentation Impact" icon={Share2}>
              <div className="h-[250px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={augmentationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                    <Bar dataKey="val" fill="#10b981" radius={[8, 8, 0, 0]}>
                      {augmentationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#059669'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
            <GlassCard title="Class Balance" icon={CheckCircle}>
               <div className="h-[250px] w-full flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={classDistribution} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {classDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-black text-white">3,833</span>
                  <span className="text-[8px] text-slate-500 uppercase font-bold">Base Samples</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </SlideContainer>
      )
    },
    {
      id: 'stack',
      content: (
        <SlideContainer>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Architecture Deep-Dive</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Decoupled detection and classification pipeline for high-throughput edge inference.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
            <GlassCard title="Face Detector" icon={Maximize}>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">YuNet ONNX implementation. Detects faces at varying poses with extremely low overhead.</p>
              <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-lg w-fit">YuNet v2023</div>
            </GlassCard>
            <GlassCard title="Classifier" icon={Layers}>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">MobileNetV2 Transfer Learning. Fine-tuned for binary classification in complex environments.</p>
              <div className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold rounded-lg w-fit">MobileNetV2</div>
            </GlassCard>
            <GlassCard title="UI Engine" icon={Monitor}>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">Clean Glass Rendering. Dynamic font-scaling for resolution-independent dashboards.</p>
              <div className="px-3 py-1 bg-amber-500/10 text-amber-400 text-[10px] font-bold rounded-lg w-fit">OpenCV Graphics</div>
            </GlassCard>
          </div>
        </SlideContainer>
      )
    },
    {
      id: 'pre',
      content: (
        <SlideContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl items-center">
            <CodeBlock title="detector.py :: Preprocessing" code={codeSnippets.preprocessing} />
            <div>
              <h2 className="text-4xl font-black text-white mb-6 tracking-tight">Inference Preprocessing</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">Consistency is key. Our pipeline ensures pixel-perfect inputs for the neural network through 3 atomic steps.</p>
              <div className="space-y-4">
                {[
                  { t: 'Color Mapping', d: 'Conversion from OpenCV BGR to MobileNet RGB.' },
                  { t: 'Geometric Square', d: 'Aspect-ratio preserving padding to avoid distortion.' },
                  { t: 'Normalization', d: 'Zero-mean normalization to scale pixel range to [-1, 1].' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">0{i+1}</div>
                    <div>
                      <h4 className="text-white text-sm font-bold">{item.t}</h4>
                      <p className="text-slate-500 text-xs">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SlideContainer>
      )
    },
    {
      id: 'yunet',
      content: (
        <SlideContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl items-center">
            <div>
              <h2 className="text-4xl font-black text-white mb-6">YuNet Tracking</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">A high-performance face detector that balances precision and speed, outperforming MTCNN.</p>
              <div className="grid grid-cols-2 gap-4">
                <GlassCard title="Confidence" icon={Shield}>
                  <p className="text-2xl font-black text-white">0.60</p>
                  <p className="text-[9px] text-slate-500 uppercase font-bold">Inference Floor</p>
                </GlassCard>
                <GlassCard title="Latency" icon={Activity}>
                  <p className="text-2xl font-black text-white">~5ms</p>
                  <p className="text-[9px] text-slate-500 uppercase font-bold">Face Detection</p>
                </GlassCard>
              </div>
            </div>
            <CodeBlock title="src/detector.py :: YuNet_Setup" code={codeSnippets.yunet} color="cyan" />
          </div>
        </SlideContainer>
      )
    },
    {
      id: 'analytics',
      content: (
        <SlideContainer>
          <div className="w-full max-w-7xl">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-4xl font-black text-white">Model Training Analytics</h2>
                <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-bold">Binary Crossentropy • Adam • Epochs: 8</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500"/><span className="text-[10px] font-black text-emerald-400 uppercase">Training</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400"/><span className="text-[10px] font-black text-cyan-400 uppercase">Validation</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <GlassCard title="Accuracy Convergence" className="lg:col-span-8 min-h-[350px]" icon={TrendingUp}>
                <div className="h-[280px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trainingHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="accG" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="epoch" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                      <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} domain={[0.6, 1]} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }} />
                      <Area type="monotone" dataKey="acc" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#accG)" />
                      <Area type="monotone" dataKey="val_acc" stroke="#06b6d4" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
              <div className="lg:col-span-4 flex flex-col gap-6">
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
                <GlassCard title="Quality Metrics">
                  <div className="space-y-4 pt-2">
                    {[ { l: 'F1 Score', v: '0.978', c: 'bg-emerald-500' }, { l: 'mAP@.5', v: '0.962', c: 'bg-cyan-500' } ].map((item, i) => (
                      <div key={i} className="flex flex-col">
                        <div className="flex justify-between text-[10px] text-slate-500 uppercase font-bold mb-1">
                          <span>{item.l}</span><span>{item.v}</span>
                        </div>
                        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                           <div className={`h-full ${item.c} rounded-full`} style={{ width: `${parseFloat(item.v)*100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </SlideContainer>
      )
    },
    {
      id: 'mnv2',
      content: (
        <SlideContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl items-center">
            <div>
              <h2 className="text-4xl font-black text-white mb-6">Inverted Residuals</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">Optimizing for the edge. MobileNetV2 uses depthwise separable convolutions to maintain high-accuracy.</p>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex gap-4">
                  <Layers className="text-rose-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Linear Bottlenecks</h4>
                    <p className="text-slate-500 text-xs">Protects feature integrity by removing non-linearity in thin layers.</p>
                  </div>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex gap-4">
                  <Boxes className="text-amber-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Depthwise Convolutions</h4>
                    <p className="text-slate-500 text-xs">Reduces compute by 9x through channel-wise filtering.</p>
                  </div>
                </div>
              </div>
            </div>
            <CodeBlock title="mobilenet_v2.py :: LayerLogic" code={`x = layers.DepthwiseConv2D(3, padding='same')(x)\nx = layers.Conv2D(64, 1, padding='same')(x)\nx = layers.Add()([x, inputs])`} color="amber" />
          </div>
        </SlideContainer>
      )
    },
    {
      id: 'threading',
      content: (
        <SlideContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl items-center">
            <CodeBlock title="camera.py :: ThreadedEngine" code={codeSnippets.threading} color="rose" />
            <div>
              <h2 className="text-4xl font-black text-white mb-6">Camera Threading</h2>
              <p className="text-slate-400 mb-8">Performance isn't just AI. Decoupling I/O from inference prevents the UI from freezing.</p>
              <div className="grid grid-cols-1 gap-4">
                <GlassCard title="Mutex Implementation" icon={Shield}>
                  <p className="text-slate-400 text-xs">Atomic updates ensure the classifier always predicts on a stable buffer.</p>
                </GlassCard>
                <div className="flex gap-4 text-center">
                  <div className="w-1/2 p-6 bg-white/5 rounded-3xl border border-white/5">
                    <Activity size={24} className="mx-auto mb-2 text-rose-500" />
                    <p className="text-2xl font-black text-white">0.0ms</p>
                    <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Input Lag</p>
                  </div>
                  <div className="w-1/2 p-6 bg-white/5 rounded-3xl border border-white/5">
                    <Gauge size={24} className="mx-auto mb-2 text-emerald-400" />
                    <p className="text-2xl font-black text-white">30+</p>
                    <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Stable FPS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SlideContainer>
      )
    },
    {
      id: 'opt',
      content: (
        <SlideContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl items-center">
            <div>
              <h2 className="text-4xl font-black text-white mb-6">TFLite Quantization</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">Shrinking memory footprint from 3.4MB to 1.8MB for edge deployment.</p>
              <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
                <div className="flex justify-between items-center mb-6 font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                  <span>Storage Optimization</span><span>47% Savings</span>
                </div>
                <div className="h-6 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '53%' }} className="h-full bg-cyan-500" />
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-mono text-slate-500 uppercase">
                  <span>Original (H5)</span><span>Quantized (TFLite)</span>
                </div>
              </div>
            </div>
            <CodeBlock title="setup_env.py :: Quantize" code={codeSnippets.optimization} color="cyan" />
          </div>
        </SlideContainer>
      )
    },
    {
      id: 'conclusion',
      content: (
        <SlideContainer>
          <motion.div animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 6 }} className="mb-12">
            <div className="w-32 h-32 rounded-[3rem] bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-3xl shadow-emerald-500/20 border-4 border-white/20">
              <Shield className="text-white" size={64} />
            </div>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 text-center tracking-tighter leading-none">Vision <br/>Secured.</h1>
          <p className="text-slate-400 text-center max-w-xl mb-16 text-lg font-medium leading-relaxed">
            Industrial face mask detection system. Ready for deployment.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <button className="flex items-center justify-center gap-3 px-12 py-5 bg-emerald-500 text-slate-950 font-black rounded-2xl hover:bg-emerald-400 transition-all shadow-2xl active:scale-95">
              <Github size={20} /> REPOSITORY
            </button>
            <button className="flex items-center justify-center gap-3 px-12 py-5 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all active:scale-95 shadow-xl">
              DOCUMENTATION
            </button>
          </div>
        </SlideContainer>
      )
    }
  ];

  const next = () => currentSlide < slides.length - 1 && setCurrentSlide(prev => prev + 1);
  const prev = () => currentSlide > 0 && setCurrentSlide(prev => prev - 1);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentSlide]);

  return (
    <div className="fixed inset-0 bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-emerald-500/30">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[200px] rounded-full pointer-events-none opacity-40" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/5 blur-[200px] rounded-full pointer-events-none opacity-40" />
      
      <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5 z-50">
        <motion.div className="h-full bg-emerald-500" initial={false} animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />
      </div>

      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-5 z-50">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrentSlide(i)} className="group flex items-center gap-4 outline-none">
            <div className={`w-1 transition-all duration-500 rounded-full ${currentSlide === i ? 'h-10 bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'h-2 bg-slate-800 group-hover:bg-slate-600'}`} />
            <span className={`text-[9px] font-black uppercase tracking-widest transition-all duration-500 ${currentSlide === i ? 'text-white opacity-100' : 'text-slate-700 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                PAGE 0{i + 1}
            </span>
          </button>
        ))}
      </div>

      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div key={currentSlide} className="w-full h-full">{slides[currentSlide].content}</motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-50 pointer-events-none">
        <div className="hidden sm:flex pointer-events-auto items-center gap-3 px-6 py-3 rounded-full bg-slate-900/80 backdrop-blur-2xl border border-white/5 shadow-2xl">
            <Activity size={14} className="text-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none">Inference: [STABLE]</span>
        </div>
        <div className="flex gap-4 pointer-events-auto ml-auto">
            <button onClick={prev} disabled={currentSlide === 0} className="p-5 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/5 text-white hover:bg-white/10 transition-all disabled:opacity-20 active:scale-90 shadow-2xl"><ChevronLeft size={24} /></button>
            <button onClick={next} disabled={currentSlide === slides.length - 1} className="group relative flex items-center gap-3 px-10 rounded-3xl overflow-hidden bg-emerald-500 text-slate-950 font-black tracking-tighter hover:bg-emerald-400 transition-all disabled:opacity-20 active:scale-95 shadow-xl shadow-emerald-500/40">
                <span className="relative z-10 uppercase text-xs tracking-widest font-black">{currentSlide === slides.length - 1 ? 'End' : 'Next'}</span>
                <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>
    </div>
  );
}