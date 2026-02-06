import { forwardRef, TextareaHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError;
  label?: string;
  characterCount?: {
    current: number;
    max: number;
  };
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, label, characterCount, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full border-2 border-gray-300 rounded-md p-3 input-purple focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 hover:border-gray-400'
          } ${className}`}
          {...props}
        />
        <div className="flex justify-between items-center mt-1">
          {error && (
            <p className="text-red-500 text-sm">{error.message}</p>
          )}
          {characterCount && (
            <span className="text-xs text-gray-400 ml-auto">
              {characterCount.current}/{characterCount.max}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

