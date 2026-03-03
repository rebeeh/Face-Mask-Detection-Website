import type { SideNavProps } from '../../types';

/** Slide name labels shown on hover for each dot. */
const SLIDE_LABELS = [
    'Hero',
    'Dataset',
    'Architecture',
    'Preprocessing',
    'YuNet',
    'Analytics',
    'MobileNetV2',
    'Threading',
    'Optimization',
    'Conclusion',
] as const;

/**
 * Vertical dot-navigation on the left side of the screen.
 * Each dot shows the slide name on hover.
 * Hidden on mobile — displayed only on large screens.
 */
const SideNav: React.FC<SideNavProps> = ({ count, current, labels, onSelect }) => (
    <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-5 z-50">
        {Array.from({ length: count }, (_, i) => {
            const isActive = current === i;
            const label = labels[i] ?? SLIDE_LABELS[i] ?? `Slide ${i + 1}`;
            return (
                <button
                    key={label}
                    onClick={() => onSelect(i)}
                    aria-label={`Go to slide ${i + 1}: ${label}`}
                    aria-current={isActive ? 'step' : undefined}
                    className="group flex items-center gap-4 outline-none"
                >
                    {/* Progress dot */}
                    <div
                        className={[
                            'w-1 rounded-full transition-all duration-500',
                            isActive
                                ? 'h-10 bg-emerald-500 shadow-lg shadow-emerald-500/50'
                                : 'h-2 bg-slate-800 group-hover:bg-slate-600',
                        ].join(' ')}
                    />
                    {/* Slide name — slides in on hover */}
                    <span
                        className={[
                            'text-[9px] font-black uppercase tracking-widest transition-all duration-500',
                            isActive
                                ? 'text-white opacity-100'
                                : 'text-slate-700 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0',
                        ].join(' ')}
                    >
                        {label}
                    </span>
                </button>
            );
        })}
    </div>
);

export { SLIDE_LABELS };
export default SideNav;
