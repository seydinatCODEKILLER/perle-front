// components/form/RHFSelect.jsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

export const RHFSelect = ({
  value,
  onChange,
  fallback,
  placeholder = "Sélectionner",
  children,
}) => {
  return (
    <Select
      value={value ?? fallback}
      onValueChange={(v) => {
        if (!v) return;
        onChange(v);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>{children}</SelectContent>
    </Select>
  );
};
