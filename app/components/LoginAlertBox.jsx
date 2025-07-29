import { Button } from "@components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"

export default function CardDemo() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm bg-white rounded-lg shadow-md">
        <CardHeader>
          <CardTitle>Hello!</CardTitle>
          <CardDescription>
            Fill in your username and password to sign in
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full text-white bg-blue-900" type="submit">
            SIGN IN
          </Button>
          <CardAction>
            <div>
              <Button variant="link">Sign Up</Button>
            </div>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  )
}
