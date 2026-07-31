import { PasswordInput } from "@/components/customs/PasswordInput";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginForm() {
  return (
    <Card className="min-w-sm">
      <CardHeader>
        <CardTitle className="text-center">Login to your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" required />
            </div>
            <div className="grid gap-2.5">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <div className="flex gap-2">
                  <Link href="/register" className="text-primary">
                    ¿Forgot your password?
                  </Link>
                </div>
              </div>
              <PasswordInput type="password" id="password" required />
            </div>
            <div className="flex gap-2">
              <span>¿Don&apos;t have acount?</span>
              <Link href="/register" className="text-primary">
                Register now
              </Link>
            </div>
            <Button>Login</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
