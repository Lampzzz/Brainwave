interface NumberFieldProps {
  label?: string;
  value: number;
  isLabel?: boolean;
}

export default function NumberField({
  label,
  value,
  isLabel = true,
}: NumberFieldProps) {
  return (
    <div className="flex flex-col space-y-2 overflow-hidden">
      {isLabel && <label className="text-sm">{label}</label>}
      <input
        type="number"
        min={1}
        value={value}
        className="bg-zinc-700 p-2 rounded-lg flex-1 focus:outline-none"
      />
    </div>
  );
}
