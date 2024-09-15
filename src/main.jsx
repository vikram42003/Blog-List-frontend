import ReactDOM from "react-dom/client";
import { QueryClient } from "@tanstack/react-query";

import { QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import ContextProvider from "./ContextProvider";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={client}>
    <ContextProvider>
      <App />
    </ContextProvider>
  </QueryClientProvider>
);
