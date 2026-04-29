import { AuthShell } from "../../../components/ui/auth-shell";
import Register from "../component/Register";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your Chella account"
      description="Set up your member profile, add an optional referral, and start earning from a cleaner rewards workflow."
      footerText="Already onboarded?"
      footerLinkLabel="Sign in"
      footerLinkTo="/login"
    >
      <Register />
    </AuthShell>
  );
}
