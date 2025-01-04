import classNames from 'classnames';
import React, { ReactNode, forwardRef } from 'react';
import InputError from './InputError.tsx';

interface InputProps {
  type?: string;
  helperText?: string;
  label?: string;
  autoComplete?: string;
  name?: string;
  disabled?: boolean;
  maxLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  className?: string;
  height?: string;
  onRightIconClick?: () => void;
}

const TextInputField = (
  props: InputProps,
  ref: React.Ref<HTMLInputElement>
) => {
  const {
    type = 'text',
    label,
    helperText,
    autoComplete = '',
    name,
    maxLength,
    onChange,
    value,
    rightIcon,
    leftIcon,
    className,
    height = 'h-10',
    onRightIconClick,
    ...rest
  } = props;

  return (
    <div className={classNames('group block')}>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium leading-6 text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center rounded-md">
        {leftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 justify-center">
            {leftIcon}
          </div>
        )}
        <input
          {...rest}
          name={name}
          id={name}
          ref={ref}
          autoComplete={autoComplete}
          type={type}
          maxLength={maxLength}
          className={classNames(
            `${height} w-full border border-gray-300 rounded-md focus:ring-0 focus:!border-blue-50 appearance-none leading-loose px-3 text-sm bg-transparent focus:outline-none`,
            {
              'pl-8': leftIcon,
              'pr-8': rightIcon,
            },
            className
          )}
          onChange={onChange}
          value={value}
        />
        {rightIcon && (
          <div
            onClick={onRightIconClick}
            className="cursor-pointer absolute inset-y-0 right-0 z-20 px-2 flex items-center justify-center"
          >
            {rightIcon}
          </div>
        )}
      </div>
      {helperText && <InputError message={helperText} />}
    </div>
  );
};

const TextField = forwardRef<HTMLInputElement, InputProps>(TextInputField);
export default TextField;
