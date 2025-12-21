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
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { api } from "../helpers/axios";
import { useNavigate } from "react-router";
import FullScreenLoader from "./ui/FullScreenLoader";

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmail = identifier.includes("@");

    const data = {
      phoneNumber: isEmail ? null : identifier,
      email: isEmail ? identifier : null,
      password: password,
    };
    setLoading(true);
    try {
      const res = await api.post("/auth/login", data);
      if (res.statusText == "OK") {
        localStorage.setItem("accessToken", res.data.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FullScreenLoader show={loading} />
      <div className={cn("w-1/2 mx-auto my-[20vh]", className)} {...props}>
        <Card className="shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-semibold">
              Welcome Back 👋
            </CardTitle>
            <CardDescription>Login with email or phone number</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FieldGroup>
                {/* Email or Phone */}
                <Field>
                  <FieldLabel>Email or Phone Number</FieldLabel>
                  <Input
                    type="text"
                    placeholder="email@example.com or 017XXXXXXXX"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                </Field>

                {/* Password */}
                <Field>
                  <div className="flex items-center">
                    <FieldLabel>Password</FieldLabel>
                    <a
                      href="#"
                      className="ml-auto text-sm text-muted-foreground hover:text-primary hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </Field>

                {/* Actions */}
                <Field className="space-y-3">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>

                  <Button variant="outline" type="button" className="w-full">
                    Continue with Google
                  </Button>

                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{" "}
                    <a
                      href="#"
                      className="font-medium text-primary hover:underline"
                    >
                      Sign up
                    </a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
