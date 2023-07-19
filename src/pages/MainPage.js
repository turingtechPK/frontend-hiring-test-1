import CallsTable from "../components/table/tableLayout/CallsTable";
import Layout from "../components/layout/Layout";
import Title from "../components/ui/title/Title";
import { useNavigate } from "react-router-dom";

function MainPage() {
    const navigate = useNavigate();
  return (
    
    <Layout navigate = {navigate}>
      <Title />
      <CallsTable />
    </Layout>
  );
}

export default MainPage;
