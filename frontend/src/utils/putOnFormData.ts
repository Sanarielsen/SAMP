type FormDataValue =
  | string
  | Blob
  | number
  | boolean
  | null
  | undefined;

export const putOnFormData = <T extends Record<string, FormDataValue>>(
  data: T
): FormData => {
  const fd = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value == null) return;

    if (value instanceof Blob) {
      fd.append(key, value); // ✅ FILE GOES RAW
      return;
    }

    fd.append(key, String(value)); // primitives only
  });

  return fd;
};