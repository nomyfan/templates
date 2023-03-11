import { greet } from "wasm_binds";

function App() {
  return (
    <div>
      <button
        onClick={() => {
          greet("WASM");
        }}
      >
        Greet
      </button>
    </div>
  );
}

export default App;
