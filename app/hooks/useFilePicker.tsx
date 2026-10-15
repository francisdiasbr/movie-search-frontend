import { ChangeEvent, useRef } from 'react';

interface UseFilePickerOptions {
  accept?: string;
}

// Hidden <input type="file"> plus the click that opens it. Render `input`
// anywhere in the tree and call `open()` from a button.
export function useFilePicker(onFile: (file: File) => void, { accept = 'image/*' }: UseFilePickerOptions = {}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (file) onFile(file);
  };

  const input = <input accept={accept} hidden onChange={handleChange} ref={inputRef} type='file' />;

  return { input, open: () => inputRef.current?.click() };
}
