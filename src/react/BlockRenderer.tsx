import React from 'react';
import type { Block, Reveal } from '../types';
import { ChoiceButton } from './ChoiceButton';
import { RevealContainer } from './RevealContainer';
import { useQuintContext } from './context';
import { mergeClassNames, mergeStyles } from './utils';

interface BlockRendererProps {
  block: Block;
  /** Additional CSS class name(s) to apply to the block container */
  className?: string;
  /** Additional inline styles to apply to the block container */
  style?: React.CSSProperties;
  /** Additional CSS class name(s) to apply to the block content */
  contentClassName?: string;
  /** Additional inline styles to apply to the block content */
  contentStyle?: React.CSSProperties;
  /** Additional CSS class name(s) to apply to the choices container */
  choicesClassName?: string;
  /** Additional inline styles to apply to the choices container */
  choicesStyle?: React.CSSProperties;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  className,
  style,
  contentClassName,
  contentStyle,
  choicesClassName,
  choicesStyle,
}) => {
  const { state } = useQuintContext();
  
  // Get reveals for this block from the reveals Map (not from items array)
  // Reveals are only stored in the Map, not as standalone items
  const revealsForBlock: Reveal[] = [];
  state.getItems().forEach((item) => {
    if (item.type === 'choice' && item.blockId === block.blockId) {
      const revealId = `${block.blockId}:${item.data.choiceId}`;
      const reveal = state.getReveal(revealId);
      if (reveal) {
        revealsForBlock.push(reveal);
      }
    }
  });

  return (
    <div
      className={mergeClassNames('quint-block', className)}
      style={mergeStyles(style)}
      data-block-id={block.blockId}
    >
      {block.content && (
        <div
          className={mergeClassNames('quint-block-content', contentClassName)}
          style={mergeStyles(contentStyle)}
        >
          {block.content}
        </div>
      )}
      {block.choices.length > 0 && (
        <div
          className={mergeClassNames('quint-choices', choicesClassName)}
          style={mergeStyles(choicesStyle)}
        >
          {block.choices.map((choice) => {
            // Find reveal for this specific choice
            const reveal = revealsForBlock.find(
              (r) => r.choiceId === choice.choiceId
            );
            
            return (
              <React.Fragment key={choice.choiceId}>
                <ChoiceButton
                  choice={choice}
                  blockId={block.blockId}
                />
                {reveal && (
                  <RevealContainer reveal={reveal} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

