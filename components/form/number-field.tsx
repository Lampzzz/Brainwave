interface NumberFieldProps {
  label?: string;
  value: number;
  isLabel?: boolean;
  name: string;
  onChangeTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function NumberField({
  label,
  value,
  isLabel = true,
  onChangeTime,
  name,
}: NumberFieldProps) {
  return (
    <div className="flex flex-col space-y-2 overflow-hidden">
      {isLabel && <label className="text-sm">{label}</label>}
      <input
        name={name}
        type="number"
        min={1}
        value={value}
        onChange={onChangeTime}
        className="bg-zinc-700 p-2 rounded-lg flex-1 focus:outline-none"
      />
    </div>
  );
}
