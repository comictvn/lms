import React from 'react';

import clsx from 'clsx';

import styles from './index.module.css';

export type GridColumnsType =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23;

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: GridColumnsType;
  xs?: GridColumnsType;
  sm?: GridColumnsType;
  md?: GridColumnsType;
  lg?: GridColumnsType;
  xl?: GridColumnsType;
  xxl?: GridColumnsType;
  flex?: string | number;
}

const Col = React.forwardRef<HTMLDivElement, ColProps>((props: ColProps, ref) => {
  const { children, className, span, xs, sm, md, lg, xl, xxl, flex, style, ...rest } = props;
  const classes = clsx(
    styles['jitera-col'],
    styles[`jitera-col-${span}`],
    styles[`jitera-col-xs-${xs}`],
    styles[`jitera-col-sm-${sm}`],
    styles[`jitera-col-md-${md}`],
    styles[`jitera-col-lg-${lg}`],
    styles[`jitera-col-xl-${xl}`],
    styles[`jitera-col-xxl-${xxl}`],
    className,
  );
  const internalStyle = {
    ...style,
    // eslint-disable-next-line sonarjs/no-nested-template-literals
    ...(flex ? { flex: `0 0 ${typeof flex === 'number' ? `${flex}px` : flex}` } : {}),
  };
  return (
    <div {...rest} style={internalStyle} className={classes} ref={ref}>
      {children}
    </div>
  );
});

export { Col };
