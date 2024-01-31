'use client';

type InputFieldProps = {
  type?: 'text' | 'password';
  name: string;
  label: string;
  placeholder?: string;
  required: boolean;
  value: string;
  onChange: (value: string) => void; // eslint-disable-line no-unused-vars
};

export default function InputField({
  type = 'text',
  name,
  label,
  placeholder = '',
  value,
  onChange,
  required = false,
}: InputFieldProps) {
  const changeHandler = (event: React.ChangeEvent) => {
    const newValue = (event.target as HTMLInputElement).value;
    onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-6">
      <label
        className={`a ${required ? 'before:content-["*"] before:text-red-600 before:mr-2' : ''}`}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="border border-slate-300 px-4 py-2 rounded-sm"
        required={required}
        name={name}
        id={name}
        value={value}
        onChange={changeHandler}
      />
    </div>
  );
}
