import InvNavbar from "./components/navbar/InvNavbar";
import InvRoutes from "./InvRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <InvNavbar />
        <InvRoutes />
      </div>
    </QueryClientProvider>
  );
}

export default App;
