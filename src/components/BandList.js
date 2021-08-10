import React, { useContext, useEffect, useState } from "react";

import { SocketContext } from "../context/SocketContext";

export const BandList = () => {
  const { socket } = useContext(SocketContext);

  const [bands, setBands] = useState([]);

  useEffect(() => {
    socket.on("current-bands", (data) => {
      setBands(data);
    });
    //El return en un useEffect es una arrow function que se ejecuta solo en el momento en el que
    //el componente va a ser eliminado
    //En caso de que el componente vaya ser eliminado, ya no es necesario escuchar ese evento
    return () => {
      socket.off("current-bands");
    };
  }, [socket]);

  const onChangeInputName = (event, id) => {
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

  const vote = (id) => {
    socket.emit("vote-band", id);
  };

  const onNotFocus = (id, name) => {
    const data = { id, name };
    socket.emit("change-name-band", data);
  };

  const deleteBand = (id) => {
    socket.emit("delete-band", id);
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
            onChange={(event) => onChangeInputName(event, band.id)}
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
