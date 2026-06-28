const TextField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "url";
  placeholder?: string;
  required?: boolean;
}) => {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-[#1A1A1A]">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="h-12 w-full rounded-lg border border-[#C5BEB6] bg-white px-4 text-sm font-normal text-[#1A1A1A] placeholder:text-[#8A8A8A] transition-colors focus:border-[#1A1A1A] focus:outline-none"
      />
    </label>
  );
};

export default TextField;
