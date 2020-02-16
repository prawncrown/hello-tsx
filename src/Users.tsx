import React, { useState } from 'react';
import './App.css';

const Loaded = ({ wasm }:{wasm:any}) => <button onClick={wasm.greet}>Click me</button>;

const Unloaded = ({ loading, loadWasm }:{loading:any,loadWasm:any}) => {
  return loading ? (
    <div>Loading...</div>
  ) : (
    <button onClick={loadWasm}>Load library</button>
  );
};

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [wasm, setWasm] = useState();

  const loadWasm = async () => {
    try {
      setLoading(true);
      const wasm = await import('rust_test');
      setWasm(wasm);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tmp1">
      <header className="rmp2">
        {wasm ? (
          <Loaded wasm={wasm} />
        ) : (
          <Unloaded loading={loading} loadWasm={loadWasm} />
        )}
      </header>
    </div>
  );
};

export default Users;
