import { SignIn } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8">
        <SignIn
          appearance={{
            baseTheme: dark,
            variables: { colorPrimary: "#6366f1" },
          }}
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  )
}
