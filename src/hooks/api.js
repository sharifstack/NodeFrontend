import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { api } from "../helpers/axios";
import { toastError, toastSuccess } from "../helpers/toast";
import { useNavigate } from "react-router";

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
    onSettled: () => {
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
    onSettled: () => {},
  });
};

//get all brands
export const useGetAllBrand = () => {
  return useQuery({
    queryKey: ["getAllBrand"],
    queryFn: async () => {
      const res = await api.get("/brand/all-brand");
      return res.data;
    },
  });
};

//get single brand
export const useGetSingleBrand = (slug) => {
  return useQuery({
    queryKey: ["getSingleBrand", slug],
    queryFn: async () => {
      const res = await api.get(`/brand/single-brand/${slug}`);
      return res.data;
    },
  });
};

//Edit/put brand
export const useEditBrand = (slug) => {
  const navigate = useNavigate();
  return useMutation({
    queryKey: ["editBrand", slug],
    mutationFn: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("since", values.since);
      if (values.image) {
        formData.append("image", values.image);
      }
      const res = await api.put(`/brand/update-brand/${slug}`, formData);
      return res.data;
    },
    onError: (error, onMutateResult) => {
      // An error happened!
      console.log(error);
      console.log(`rolling back optimistic update with id ${onMutateResult}`);
    },
    onSuccess: (data) => {
      console.log(data);
      toastSuccess("Brand updated successfully!");
      navigate("/brand-list");
    },
    onSettled: () => {},
  });
};

//delete brand
export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    queryKey: ["deleteBrand"],
    mutationFn: async (slug) => {
      return await api.delete(`brand/delete-brand/${slug}`);
    },
    onError: (error, onMutateResult) => {
      // An error happened!
      console.log(error);
      console.log(`rolling back optimistic update with id ${onMutateResult}`);
      toastError("Failed to delete brand. Please try again.");
    },
    onSuccess: (data) => {
      console.log(data);
      toastSuccess("Brand deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["getAllBrand"] });
    },
    onSettled: () => {
      // Invalidate and refetch or reset
    },
  });
};

//Create Product

export const useCreateSingleVariant = () => {
  return useMutation({
    queryKey: ["createSingleVariant"],
    mutationFn: (values) => {
      const formData = new FormData();
      for (let key in values) {
        if (key === "image") {
          const files = values[key];
          if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
              formData.append("image", files[i]);
            }
          }
        } else {
          formData.append(key, values[key]);
        }
      }
      return api.post("/product/create-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    onError: (error, onMutateResult) => {
      console.log(error);
      console.log(`rolling back optimistic update with id ${onMutateResult}`);
    },
    onSuccess: (data) => {
      console.log(data);
      toastSuccess("Single Variant Product created successfully!");
    },
    onSettled: () => {},
  });
};

//get single Variant Product
export const useGetSingleVariant = (type) => {
  return useQuery({
    queryKey: [`${type} product`],
    queryFn: async () => {
      if (type) {
        const res = await api.get(
          `/product/getall-products?productType=${type}`,
        );
        return res.data;
      } else {
        const res = await api.get("/product/getall-products");
        return res.data;
      }
    },
  });
};

//One Single Variant Product
export const useOneSingleVariant = (slug) => {
  return useQuery({
    queryKey: [`singleproduct`],
    queryFn: async () => {
      const res = await api.get(`/product/single-product/`, {
        params: { slug },
      });
      return res.data;
    },
    enabled: !!slug,
  });
};

//Edit/put Single Variant Product
export const useEditSingleVariant = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ slug, values }) => {
      return api.put(`/product/update-product/${slug}`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    onSuccess: () => {
      toastSuccess("Product updated successfully!");
      navigate(-1);
    },

    onError: (err) => {
      console.error(err);
    },
  });
};

export const useUploadSingleVariant = () => {
  return useMutation({
    mutationFn: async ({ slug, images }) => {
      const formData = new FormData();

      images.forEach((img) => {
        formData.append("image", img);
      });

      return api.put(`/product/upload-productimg/${slug}`, formData);
    },

    onSuccess: () => {
      toastSuccess("Image uploaded successfully!");
    },

    onError: (err) => {
      console.error(err);
    },
  });
};

//delete single Variant Product
export const useDeleteSingleVariant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    queryKey: ["deleteSingleVariant"],
    mutationFn: async (slug) => {
      return await api.delete(`/product/delete-product/${slug}`);
    },
    onError: (error, onMutateResult) => {
      // An error happened!
      console.log(error);
      console.log(`rolling back optimistic update with id ${onMutateResult}`);
      toastError("Failed to delete brand. Please try again.");
    },
    onSuccess: (data) => {
      console.log(data);
      toastSuccess("Single Variant Product deleted successfully!");
      queryClient.invalidateQueries({ queryKey: [`${type} product`] });
    },
    onSettled: () => {
      // Invalidate and refetch or reset
    },
  });
};
