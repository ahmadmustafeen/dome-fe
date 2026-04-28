import { toast } from "react-toastify";

export const handleValidate = <T extends Record<string, any>>(
  vals: T,
  fields: string[]
) => {
  for (const key of fields) {
    const value = vals[key];

    if (value === '' || value === undefined || value === null) {
      const formattedKey =
        key.charAt(0).toUpperCase() + key.slice(1);

      toast.error(`${formattedKey} is required`);
      return false;
    }
  }

  return true;
};