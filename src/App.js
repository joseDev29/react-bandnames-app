import io from "socket.io-client";

import { useEffect, useState } from "react";

import { BandAdd } from "./components/BandAdd";
import { BandList } from "./components/BandList";

const connectSocketServer = () => {
  const socket = io.connect("http://localhost:6005", {
    transports: ["websocket"],
  });
  return socket;
};

export const App = () => {
  const [socket] = useState(connectSocketServer());
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

  const vote = (id) => {
    console.log("vote: ", id);
    socket.emit("vote-band", id);
  };

  const deleteBand = (id) => {
    console.log("delete: ", id);
    socket.emit("delete-band", id);
  };

  const changeName = (id, name) => {
    const data = { id, name };
    socket.emit("change-name-band", data);
  };

  const createBand = (name) => {
    socket.emit("create-band", { name });
  };

  useEffect(() => {
    //Devuelve un boolean dependiendo de sie sta conectado o no
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("current-bands", (data) => {
      setBands(data);
    });
  }, []);

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {online ? (
            <span className="text-success"> Online</span>
          ) : (
            <span className="text-danger"> Ofline</span>
          )}
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <BandList
            data={bands}
            vote={vote}
            deleteBand={deleteBand}
            changeName={changeName}
          />
        </div>
        <div className="col-4">
          <BandAdd createBand={createBand} />
        </div>
      </div>
    </div>
  );
};
