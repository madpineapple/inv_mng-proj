import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const submitQuery = async (query: string): Promise<any> => {
  const response = await axios.post("http://localhost:5230/api/llm/generate", {
    Text: query,
  });
  return response.data;
};
export const useLLMHook = () => {
  return useMutation({
    mutationFn: submitQuery,
  });
};
