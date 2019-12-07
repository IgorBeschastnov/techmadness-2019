import React from 'react';
import classNames from 'classnames';

import './line.scss';

interface Props {
    tag?: React.ElementType;
    className?: string;
    vertical?: boolean;
    wrap?: boolean;
    justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around';
    alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
    onClick?: () => void;
}

export const Line: React.FC<Props> = ({
    tag: Tag = 'div',
    className,
    vertical,
    justifyContent,
    alignItems,
    wrap,
    children,
    onClick,
    ...other
  }) => {
    const classes = classNames(
      'd-md-flex',
      vertical ? 'flex-md-column' : 'flex-md-row',
      {
        [`justify-content-md-${justifyContent}`]: justifyContent != null,
        [`align-items-md-${alignItems}`]: alignItems != null,
        'flex-md-wrap': wrap
      },
      className
    );
    return (
      <Tag className={classes} onClick={onClick} {...other}>
        {children}
      </Tag>
    );
  };