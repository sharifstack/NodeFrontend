import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "../../helpers/axios";
import { useNavigate } from "react-router";

/* =========================
   Zod Schema
========================= */
const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),

    email: z
      .string()
      .email("Invalid email address")
      .optional()
      .or(z.literal("")),

    phoneNumber: z
      .string()
      .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
      .optional()
      .or(z.literal("")),

    password: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.email || data.phoneNumber, {
    message: "Either email or phone number is required",
    path: ["email"], // error message placement
  });

export function RegistrationForm({ className }) {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  async function onSubmit(value) {
    const data = {
      name: value.name,
      email: value.email || null,
      phoneNumber: value.phoneNumber || null,
      password: value.password,
    };

    try {
      const res = await api.post("/auth/registration", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Registration Data:", res);
    } catch (error) {
      navigate("/login");
      console.log(error.response);
    }
  }

  return (
    <div className={cn("max-w-1/2 mx-auto my-[20vh]", className)}>
      <Card className="shadow-2xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-semibold">
            Create Account 🚀
          </CardTitle>
          <CardDescription>Register with email or phone number</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Sharif Ahmed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="017XXXXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
export default RegistrationForm;
