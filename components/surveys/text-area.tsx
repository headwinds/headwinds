const TextArea = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) => {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-[#1A1A1A]">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        rows={4}
        className="w-full resize-none rounded-lg border border-[#C5BEB6] bg-white px-4 py-3 text-sm font-normal leading-relaxed text-[#1A1A1A] placeholder:text-[#8A8A8A] transition-colors focus:border-[#1A1A1A] focus:outline-none"
      />
    </label>
  );
};

export default TextArea;
