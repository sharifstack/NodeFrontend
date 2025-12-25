import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { api } from "../helpers/axios";

//get all categories
export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["getAllcategories"],
    queryFn: async () => {
      const res = await api.get("/category/get-all-category");
      return res.data;
    },
  });
};

//create sub-category
export const useCreateSubCategory = () => {
  return useMutation({
    queryKey: ["createSubCategory"],
    mutationFn: async (data) => {
      const res = await api.post("/subcategory/create-subcategory", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    },
    onError: (error, onMutateResult) => {
      // An error happened!
      console.log(error);
      console.log(`rolling back optimistic update with id ${onMutateResult}`);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onSettled: (data, error, variables, onMutateResult, context) => {
      // Invalidate and refetch or reset
    },
  });
};
