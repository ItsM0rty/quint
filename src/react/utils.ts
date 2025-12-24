import React from 'react';

/**
 * Merges multiple className strings, filtering out empty values.
 * Standard React pattern for combining classNames.
 */
export function mergeClassNames(...classNames: (string | undefined | null | false)[]): string {
  return classNames.filter(Boolean).join(' ');
}

/**
 * Merges multiple style objects, with later styles overriding earlier ones.
 * Standard React pattern for combining inline styles.
 */
export function mergeStyles(
  ...styles: (React.CSSProperties | undefined | null)[]
): React.CSSProperties {
  return Object.assign({}, ...styles.filter(Boolean));
}

