import React from "react";
import { List, Typography } from "antd";

const levels = ["N1", "N2", "N3", "N4", "N5"];

function ListJP() {
  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={3}>Danh sách cấp độ tiếng Nhật</Typography.Title>
      <List
        bordered
        dataSource={levels}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text>{item}</Typography.Text>
          </List.Item>
        )}
      />
    </div>
  );
}

export default ListJP;
