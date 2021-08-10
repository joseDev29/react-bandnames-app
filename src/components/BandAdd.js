import React, { useState } from "react";

export const BandAdd = ({ createBand }) => {
  const [value, setValue] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    if (value.trim().length >= 0) {
      createBand(value);
      setValue("");
    }
  };

  return (
    <>
      <h3>Agregar Banda</h3>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Nuevo nombre de la banda"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      </form>
    </>
  );
};
