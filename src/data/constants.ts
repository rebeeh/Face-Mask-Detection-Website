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
// Representative Python code snippets shown in slides
// ---------------------------------------------------------------------------

export const codeSnippets: CodeSnippets = {
    mobilenet: `x = layers.DepthwiseConv2D(3, padding='same')(x)
x = layers.Conv2D(64, 1, padding='same')(x)
x = layers.Add()([x, inputs])`,

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
)`,
};

