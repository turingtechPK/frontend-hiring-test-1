/* eslint-disable react/button-has-type */

'use client';

const colorStyles = {
  blue: 'bg-blue hover:bg-blue/90',
  primary: 'bg-primary hover:bg-primary/90',
  text: 'hover:bg-primary/90 !text-black hover:text-white',
  icon: '',
};

const sizeStyles = {
  small: 'px-3 py-2',
  regular: 'px-4 py-3',
  large: 'px-4 lg:px-10 py-2 lg:py-4 text-base lg:text-lg',
};

const commonStyles = 'text-white rounded-sm leading-none';

type ButtonProps = {
  type?: 'button' | 'submit';
  className?: string;
  color?: keyof typeof colorStyles;
  size?: keyof typeof sizeStyles;
  onClick?: React.MouseEventHandler;
  children: React.ReactNode;
  disabled?: boolean;
};

export default function Button({
  className = '',
  color = 'primary',
  size = 'regular',
  type = 'button',
  onClick,
  children,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${colorStyles[color]} ${sizeStyles[size]} ${commonStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
