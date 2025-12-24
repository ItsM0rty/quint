import React from 'react';
import type { Choice, BlockId } from '../types';
import { useQuintContext } from './context';
import { mergeClassNames, mergeStyles } from './utils';

interface ChoiceButtonProps {
  choice: Choice;
  blockId: BlockId;
  /** Additional CSS class name(s) to apply to the button */
  className?: string;
  /** Additional inline styles to apply to the button */
  style?: React.CSSProperties;
}

export const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  choice,
  blockId,
  className,
  style,
}) => {
  const { onChoiceActivated } = useQuintContext();

  const handleClick = async () => {
    if (onChoiceActivated) {
      await onChoiceActivated(
        blockId,
        choice.choiceId,
        choice.directionality,
        choice.inputData,
        choice.reveal
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={mergeClassNames('quint-choice-button', className)}
      style={mergeStyles(style)}
      data-directionality={choice.directionality}
      data-reveal={choice.reveal}
    >
      {choice.label}
    </button>
  );
};

