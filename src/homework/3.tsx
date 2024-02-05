import React, { useState, ChangeEvent } from "react";
// Вказувати тип стану не обов'язково, так як стан ми ініціалізуємо пустим рядком,
// тому TypeScript визначить тип автоматично.
export function FormComponent() {
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return <input type="text" value={value} onChange={handleChange} />;
}
