import React from 'react';
import { useQuintContext } from './context';
import { BlockRenderer } from './BlockRenderer';
import { ChoiceButton } from './ChoiceButton';
import { mergeClassNames, mergeStyles } from './utils';

interface QuintRendererProps {
  /** Additional CSS class name(s) to apply to the container */
  className?: string;
  /** Additional inline styles to apply to the container */
  style?: React.CSSProperties;
}

export const QuintRenderer: React.FC<QuintRendererProps> = ({
  className,
  style,
}) => {
  const { state } = useQuintContext();
  const items = state.getItems();

  return (
    <div
      className={mergeClassNames('quint-container', className)}
      style={mergeStyles(style)}
    >
      {items
        .filter((item) => item.type === 'block' || item.type === 'choice')
        .map((item, index) => {
          const key = `${item.type}-${index}-${
            item.type === 'block'
              ? item.data.blockId
              : `${item.blockId}-${item.data.choiceId}`
          }`;

          switch (item.type) {
            case 'block':
              return <BlockRenderer key={key} block={item.data} />;
            case 'choice':
              return (
                <ChoiceButton
                  key={key}
                  choice={item.data}
                  blockId={item.blockId}
                />
              );
            default:
              return null;
          }
        })}
    </div>
  );
};

