import { COLORS } from "@/shared/constants";
import { ListFilterOptions } from "@/shared/types";
import { DownOutlined } from "@ant-design/icons";
import { Col, Dropdown, MenuProps, Row, Space, Typography } from "antd";

const { Text } = Typography;

interface Props {
  filter: ListFilterOptions;
  setFilter: (filter: ListFilterOptions) => void;
}

export default function ListFilter({ filter, setFilter }: Props) {
  const onFilterChange = (filter: ListFilterOptions) => {
    setFilter(filter);
  };
  const selectedFilter = filter === "All" ? "Status" : filter;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Text>All</Text>,
      onClick: () => onFilterChange("All"),
    },
    {
      key: "2",
      label: <Text>Archived</Text>,
      onClick: () => onFilterChange("Archived"),
    },
    {
      key: "3",
      label: <Text>Unarchive</Text>,
      onClick: () => onFilterChange("Unarchive"),
    },
  ];

  return (
    <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
      <Col span={24}>
        <Text style={{ marginRight: "10px" }}>Filter by: </Text>
        <Dropdown menu={{ items, selectable: true }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space style={{ color: COLORS.primary }}>
              {selectedFilter}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Col>
    </Row>
  );
}
