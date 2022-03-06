import { useButton } from '@mui/base';
import { styled } from '@mui/system';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';

const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const CustomButtonRoot = styled('button')`
  font-weight: bold;
  font-size: 0.875rem;
  background-color: #028082;
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  width: 100%;
  &:hover {
    background-color: #34525b;
  }

  &.active {
    background-color: #242526;
  }

  &.focusVisible {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CustomButton = React.forwardRef(function CustomButton(props, ref) {
  const { children } = props;
  const { active, disabled, focusVisible, getRootProps } = useButton({
    ...props,
    ref,
    component: CustomButtonRoot,
  });

  const classes = {
    active,
    disabled,
    focusVisible,
  };

  return (
    <CustomButtonRoot {...getRootProps()} className={clsx(classes)}>
      {children}
    </CustomButtonRoot>
  );
});

export default CustomButton;
CustomButton.propTypes = {
  children: PropTypes.node,
};