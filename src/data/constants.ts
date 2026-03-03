import type {
    AugmentationPoint,
    ClassPoint,
    CodeSnippets,
    TrainingEpoch,
} from '../types';

// ---------------------------------------------------------------------------
// Training history — 8 epochs of MobileNetV2 fine-tuning
// ---------------------------------------------------------------------------

export const trainingHistory: TrainingEpoch[] = [
    { epoch: 1, acc: 0.72, val_acc: 0.68, loss: 0.55, val_loss: 0.60 },
    { epoch: 2, acc: 0.84, val_acc: 0.81, loss: 0.38, val_loss: 0.42 },
    { epoch: 3, acc: 0.89, val_acc: 0.87, loss: 0.25, val_loss: 0.29 },
    { epoch: 4, acc: 0.93, val_acc: 0.91, loss: 0.18, val_loss: 0.22 },
    { epoch: 5, acc: 0.95, val_acc: 0.93, loss: 0.12, val_loss: 0.15 },
    { epoch: 6, acc: 0.97, val_acc: 0.95, loss: 0.08, val_loss: 0.11 },
    { epoch: 7, acc: 0.98, val_acc: 0.97, loss: 0.05, val_loss: 0.08 },
    { epoch: 8, acc: 0.982, val_acc: 0.978, loss: 0.04, val_loss: 0.07 },
];

// ---------------------------------------------------------------------------
// Data augmentation relative performance (% of original)
// ---------------------------------------------------------------------------

export const augmentationData: AugmentationPoint[] = [
    { name: 'Original', val: 100 },
    { name: 'Rotation', val: 85 },
    { name: 'Brightness', val: 92 },
    { name: 'Blur', val: 78 },
    { name: 'Zoom', val: 88 },
];

// ---------------------------------------------------------------------------
// Dataset class distribution (3,833 base images)
// ---------------------------------------------------------------------------

export const classDistribution: ClassPoint[] = [
    { name: 'With Mask', value: 1916, fill: '#10b981' },
    { name: 'No Mask', value: 1917, fill: '#f43f5e' },
];

// ---------------------------------------------------------------------------
// Python code snippets — sourced directly from src/ in the detection repo.
// Keep these in sync with Face-Mask-Detection-Python/src/*.py
// ---------------------------------------------------------------------------

export const codeSnippets: CodeSnippets = {

    // src/detector.py :: MaskDetector._preprocess_face
    preprocessing: `def _preprocess_face(self, face_image):
    # 1. Colour space — MobileNetV2 expects RGB
    face = cv2.cvtColor(face_image, cv2.COLOR_BGR2RGB)

    # 2. Letterbox padding (aspect-ratio preserving)
    h, w = face.shape[:2]
    max_dim = max(h, w)
    square = np.zeros((max_dim, max_dim, 3), dtype=np.uint8)
    dx = (max_dim - w) // 2
    dy = (max_dim - h) // 2
    square[dy:dy+h, dx:dx+w] = face

    # 3. Resize + Keras normalisation [-1, 1]
    face = cv2.resize(square, config.MODEL_INPUT_SIZE)
    face = img_to_array(face)
    return preprocess_input(face).astype(np.float32)`,

    // src/camera.py :: ThreadedCamera
    threading: `class ThreadedCamera:
    def __init__(self, src=0, width=1280, height=720):
        self.cap = cv2.VideoCapture(src)
        # 1-frame buffer — minimises capture latency
        self.cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
        self.read_lock = threading.Lock()
        self.started   = False

    def start(self):
        self.started = True
        self._thread = threading.Thread(
            target=self._update, daemon=True)
        self._thread.start()
        return self

    def _update(self):           # background worker
        while self.started:
            grabbed, frame = self.cap.read()
            with self.read_lock:
                self.grabbed = grabbed
                self.frame   = frame
            time.sleep(0.005)   # prevent CPU saturation`,

    // src/detector.py :: YuNetFaceDetector.__init__
    yunet: `if not os.path.exists(config.FACE_MODEL_YUNET):
    raise FileNotFoundError(
        f"YuNet model not found at: {config.FACE_MODEL_YUNET}\\n"
        "Run 'python setup_env.py' to download it."
    )
self._detector = cv2.FaceDetectorYN.create(
    model=config.FACE_MODEL_YUNET,
    config="",
    input_size=(320, 320),
    score_threshold=config.YUNET_SCORE_THRESHOLD,  # 0.6
    nms_threshold=config.YUNET_NMS_THRESHOLD,      # 0.3
    backend_id=cv2.dnn.DNN_BACKEND_DEFAULT,
    target_id=cv2.dnn.DNN_TARGET_CPU,
)`,

    // setup_env.py :: Quantize (conceptual — FP16 via TFLite)
    optimization: `# FP16 Quantization via TFLite
converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.target_spec.supported_types = [tf.float16]
tflite_model = converter.convert()`,

    // src/detector.py (adapted from keras layers in training notebook)
    mobilenet: `x = layers.DepthwiseConv2D(3, padding='same')(x)
x = layers.Conv2D(64, 1, padding='same')(x)
x = layers.Add()([x, inputs])`,
};
