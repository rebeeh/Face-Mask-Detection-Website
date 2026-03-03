import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Slide system
// ---------------------------------------------------------------------------

export interface SlideDefinition {
    id: string;
    content: ReactNode;
}

// ---------------------------------------------------------------------------
// UI component props
// ---------------------------------------------------------------------------

export interface GlassCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    icon?: LucideIcon;
    title?: string;
}

export interface CodeBlockProps {
    code: string;
    color?: 'emerald' | 'cyan' | 'amber' | 'rose';
    title: string;
}

export interface SlideContainerProps {
    children: ReactNode;
}

// ---------------------------------------------------------------------------
// Layout component props
// ---------------------------------------------------------------------------

export interface ProgressBarProps {
    current: number;
    total: number;
}

export interface SideNavProps {
    count: number;
    current: number;
    labels: readonly string[];
    onSelect: (index: number) => void;
}

export interface NavControlsProps {
    current: number;
    onNext: () => void;
    onPrev: () => void;
    total: number;
}

// ---------------------------------------------------------------------------
// Data shapes
// ---------------------------------------------------------------------------

export interface TrainingEpoch {
    acc: number;
    epoch: number;
    loss: number;
    val_acc: number;
    val_loss: number;
}

export interface AugmentationPoint {
    name: string;
    val: number;
}

export interface ClassPoint {
    fill: string;
    name: string;
    value: number;
}

export interface CodeSnippets {
    mobilenet: string;
    optimization: string;
    preprocessing: string;
    threading: string;
    yunet: string;
}

// ---------------------------------------------------------------------------
// Display items — readable, self-documenting field names
// ---------------------------------------------------------------------------

/** A statistic tile shown on the Hero slide (label / value / colorClass). */
export interface StatItem {
    label: string;
    value: string;
    colorClass: string;
}

/**
 * A labelled metric with a progress bar (label / value / backgroundClass).
 * Previously was a separate but structurally identical `MetricItem`.
 */
export interface MetricItem {
    label: string;
    value: string;
    bgClass: string;
}

/** A numbered step shown in the Preprocessing slide (title / description). */
export interface StepItem {
    title: string;
    description: string;
}
