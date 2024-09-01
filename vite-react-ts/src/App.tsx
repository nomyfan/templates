import { cn } from "./utils/cn";

function App() {
  return (
    <h1
      className={cn(
        "text-center text-transparent bg-clip-text bg-gradient-to-tr from-amber-300 to-red-500",
      )}
    >
      vite-react-ts
    </h1>
  );
}

export { App };
