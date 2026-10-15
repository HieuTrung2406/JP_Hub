import React, { useEffect, useState } from "react";
import { List, Typography, Spin, message } from "antd";
import { supabase } from "./Lib/supabaseClient";

function ListJP() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm fetch data từ bảng vocabulary
  const fetchVocabulary = async () => {
    setLoading(true);
    try {
      const { data: vocabulary, error } = await supabase
        .from("vocabulary")
        .select("*");

      if (error) {
        throw error;
      }

      setData(vocabulary);
    } catch (error) {
      message.error("Failed to fetch data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Gọi fetchVocabulary khi component được mount
  useEffect(() => {
    fetchVocabulary();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={3}>Danh sách từ vựng</Typography.Title>
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <List
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text>{item.word}</Typography.Text>
            </List.Item>
          )}
        />
      )}
    </div>
  );
}

export default ListJP;
