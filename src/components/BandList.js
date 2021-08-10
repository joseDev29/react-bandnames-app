import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export const BandList = ({
  data,
  vote,
  deleteBand,
  changeName: updateName,
}) => {
  const [bands, setBands] = useState(data);

  useEffect(() => {
    setBands(data);
  }, [data]);

  const onChangeName = (event, id) => {
    const newName = event.target.value;

    setBands(
      bands.map((band) => {
        if (band.id === id) {
          band.name = newName;
        }
        return band;
      })
    );
  };

  const onNotFocus = (id, name) => {
    console.log("change name: ", id, name);
    updateName(id, name);
  };

  const createRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => {
              vote(band.id);
            }}
          >
            +1
          </button>
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={band.name}
            onChange={(event) => onChangeName(event, band.id)}
            onBlur={() => {
              onNotFocus(band.id, band.name);
            }}
          />
          {/* onBLur se activa cuando el input pierde el foco */}
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteBand(band.id);
            }}
          >
            Borrar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <th></th>
          <th>Nombre</th>
          <th>Votos</th>
          <th>Borrar</th>
        </thead>

        <tbody>{createRows()}</tbody>
      </table>
    </>
  );
};
