const CheckboxGroup = ({
  label,
  values,
  options,
  onChange,
}: {
  label: string;
  values: string[];
  options: string[];
  onChange: (values: string[]) => void;
}) => {
  const toggleValue = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter((value) => value !== option));
      return;
    }
    onChange([...values, option]);
  };

  return (
    <fieldset className="flex flex-col gap-3 border-0 p-0 m-0">
      <legend className="text-sm font-medium text-[#1A1A1A] mb-2">
        {label}
      </legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((option) => (
          <label
            key={option}
            className={`flex min-h-11 cursor-pointer items-center rounded-lg border px-4 py-2 text-sm transition-colors ${
              values.includes(option)
                ? "border-[#1A1A1A] bg-[#EAE3DA] text-[#1A1A1A]"
                : "border-[#D5CEC6] bg-white text-[#3D3D3D] hover:border-[#1A1A1A]"
            }`}
          >
            <input
              className="sr-only"
              type="checkbox"
              checked={values.includes(option)}
              onChange={() => toggleValue(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default CheckboxGroup;
