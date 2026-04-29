import { PageContainer, PageHeader } from "../../../components/ui/shell";
import TransactionList from "../components/TransactionList";
import Transfer from "../components/Transfer";

export default function TransactionsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Movement and payouts"
        title="Transactions"
        description="Review transfer history and send funds without leaving the same workspace."
      />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <TransactionList />
        <Transfer />
      </div>
    </PageContainer>
  );
}
