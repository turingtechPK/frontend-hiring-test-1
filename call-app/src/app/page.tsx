import CallTable from "@/components/CallTable";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function HomePage() {
  return (
    <ProtectedRoute>
      <CallTable />
    </ProtectedRoute>
  );
}
