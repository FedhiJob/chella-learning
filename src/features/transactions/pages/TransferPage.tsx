import { PageContainer, PageHeader } from "../../../components/ui/shell";
import Transfer from "../components/Transfer";

export default function TransferPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Peer transfer"
        title="Transfer"
        description="Send funds from the same dashboard without losing sight of the rest of your reward activity."
      />
      <div className="max-w-2xl">
        <Transfer />
      </div>
    </PageContainer>
  );
}
