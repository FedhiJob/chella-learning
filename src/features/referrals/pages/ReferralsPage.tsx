import { PageContainer, PageHeader } from "../../../components/ui/shell";
import ReferralCodeContainer from "../components/ReferralCodeContainer";
import Referrals from "../components/Referrals";

export default function ReferralsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Growth loop"
        title="Referrals"
        description="Share your code, track who joined, and keep referral earnings front and center."
      />
      <div className="space-y-8">
        <ReferralCodeContainer />
        <Referrals />
      </div>
    </PageContainer>
  );
}
