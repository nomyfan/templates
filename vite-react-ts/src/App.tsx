import { cn } from "./lib/utils";

function App() {
  return (
    <div
      className={cn(
        "text-8xl font-extrabold text-transparent text-center",
        "bg-clip-text bg-gradient-to-r from-amber-300 to-red-500",
      )}
    >
      vite-react-ts
    </div>
  );
}

export { App };
