import { Link } from "react-router-dom";
import { PageContainer, PageHeader } from "../../../components/ui/shell";
import TaskList from "../component/TaskList";

export default function TasksPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Daily reward queue"
        title="Tasks"
        description="Complete each action, keep the streak moving, and watch rewards stack up without losing context."
        actions={
          <Link to="/dashboard/daily-checkin" className="btn-dark">
            Open daily check-in
          </Link>
        }
      />
      <TaskList />
    </PageContainer>
  );
}
