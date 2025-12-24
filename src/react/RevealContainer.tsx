import React from 'react';
import type { Reveal } from '../types';
import { useQuintContext } from './context';
import { BlockRenderer } from './BlockRenderer';
import { mergeClassNames, mergeStyles } from './utils';

interface RevealContainerProps {
  reveal: Reveal;
  /** Additional CSS class name(s) to apply to the reveal container */
  className?: string;
  /** Additional inline styles to apply to the reveal container */
  style?: React.CSSProperties;
  /** Additional CSS class name(s) to apply to the reveal toggle button */
  toggleClassName?: string;
  /** Additional inline styles to apply to the reveal toggle button */
  toggleStyle?: React.CSSProperties;
  /** Additional CSS class name(s) to apply to the reveal content */
  contentClassName?: string;
  /** Additional inline styles to apply to the reveal content */
  contentStyle?: React.CSSProperties;
  /** Additional CSS class name(s) to apply to the reveal text */
  textClassName?: string;
  /** Additional inline styles to apply to the reveal text */
  textStyle?: React.CSSProperties;
}

export const RevealContainer: React.FC<RevealContainerProps> = ({
  reveal,
  className,
  style,
  toggleClassName,
  toggleStyle,
  contentClassName,
  contentStyle,
  textClassName,
  textStyle,
}) => {
  const { onRevealToggle } = useQuintContext();

  const handleToggle = () => {
    // onRevealToggle from context is handleRevealToggle which takes just revealId
    if (onRevealToggle) {
      onRevealToggle(reveal.revealId);
    }
  };

  const content = reveal.generatedContent || reveal.staticContent || '';

  return (
    <div
      className={mergeClassNames('quint-reveal-container', className)}
      style={mergeStyles(style)}
    >
      <button
        type="button"
        onClick={handleToggle}
        className={mergeClassNames('quint-reveal-toggle', toggleClassName)}
        style={mergeStyles(toggleStyle)}
        aria-expanded={reveal.expanded}
      >
        <span className="quint-reveal-indicator">
          {reveal.expanded ? '⌄' : '>'}
        </span>
        <span className="quint-reveal-label">
          {reveal.expanded ? 'Hide' : 'Show'} explanation
        </span>
      </button>
      {reveal.expanded && (
        <div
          className={mergeClassNames('quint-reveal-content', contentClassName)}
          style={mergeStyles(contentStyle)}
        >
          {content && (
            <div
              className={mergeClassNames('quint-reveal-text', textClassName)}
              style={mergeStyles(textStyle)}
            >
              {content}
            </div>
          )}
          {reveal.nestedBlocks &&
            reveal.nestedBlocks.map((block) => (
              <BlockRenderer key={block.blockId} block={block} />
            ))}
        </div>
      )}
    </div>
  );
};

