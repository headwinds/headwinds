const ToggleGroup = ({
  label,
  name,
  value,
  options,
  onChange,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
}) => {
  return (
    <fieldset className="flex flex-col gap-3 border-0 p-0 m-0">
      <legend className="text-sm font-medium text-[#1A1A1A] mb-2">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${
              value === option
                ? "border-[#1A1A1A] bg-[#1A1A1A] text-[#F3EBE2]"
                : "border-[#D5CEC6] bg-white text-[#3D3D3D] hover:border-[#1A1A1A]"
            }`}
          >
            <input
              className="sr-only"
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              required={required}
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default ToggleGroup;
