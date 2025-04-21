import { BrowserRouter } from "react-router-dom";
import InvNavbar from "./components/navbar/InvNavbar";
import InvRoutes from "./InvRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: 20 }}>
        <BrowserRouter>
          <InvNavbar />
          <InvRoutes />
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
