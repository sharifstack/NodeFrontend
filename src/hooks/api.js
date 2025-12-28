import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { api } from "../helpers/axios";
import { Slide, toast } from "react-toastify";
import { toastSuccess } from "../helpers/toast";

//create category
export const useCreateCategory = () => {
  return useMutation({
    queryKey: ["createCategory"],
    mutationFn: (values) => {
      const imageFile = values.image;
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", imageFile);
      return api.post("/category/create_category", formData);
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

//get all subcategories
export const useGetAllSubCategories = () => {
  return useQuery({
    queryKey: ["getAllSubCategories"],
    queryFn: async () => {
      const res = await api.get("/subcategory/all-subcategory");
      return res.data;
    },
  });
};

//create brand
export const useCreateBrand = () => {
  return useMutation({
    queryKey: ["createBrand"],
    mutationFn: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("since", values.since);
      formData.append("image", values.image);
      const res = await api.post("/brand/create-brand", formData);
      return res.data;
    },
    onError: (error, onMutateResult) => {
      // An error happened!
      console.log(error);
      console.log(`rolling back optimistic update with id ${onMutateResult}`);
    },
    onSuccess: (data) => {
      console.log(data);
      toastSuccess("Brand created successfully!");
    },
    onSettled: () => {
      reset();
    },
  });
};
