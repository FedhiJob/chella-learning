import { AuthShell } from "../../../components/ui/auth-shell";
import Login from "../component/Login";

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to keep your balance, task progress, and referral activity in one place."
      footerText="Need an account?"
      footerLinkLabel="Create one now"
      footerLinkTo="/register"
    >
      <Login />
    </AuthShell>
  );
}
