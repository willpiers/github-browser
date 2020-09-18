import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";

const { Option } = Select;

export const SearchForm = ({ updateQuery, initialValues }) => {
  const [search, setSearch] = useState(initialValues.search);
  const [language, setLanguage] = useState(initialValues.language);
  const [sort, setSort] = useState(initialValues.sort);
  const [order, setOrder] = useState(initialValues.order);
  return (
    <Form
      name="query"
      layout="inline"
      style={{
        padding: "12px",
      }}
      onFinish={() => {
        updateQuery({
          type: "UPDATE_QUERY",
          payload: {
            search,
            language,
            sort,
            order,
            page: 1,
          },
        });
      }}
      initialValues={{
        search: initialValues.search,
        language: initialValues.language,
        sort: initialValues.sort,
        order: initialValues.order,
      }}
    >
      <Form.Item name="search" label="Search">
        <Input
          type="text"
          value={"javascript"}
          onChange={(evt) => {
            setSearch(evt.target.value);
          }}
          style={{
            width: 100,
          }}
        />
      </Form.Item>

      <Form.Item name="language" label="Language">
        <Select
          value={0}
          style={{
            width: 110,
            margin: "0 6px",
          }}
          onChange={setLanguage}
        >
          <Option value="">Any</Option>
          <Option value="clojure">Clojure</Option>
          <Option value="java">Java</Option>
          <Option value="javascript">JavaScript</Option>
          <Option value="python">Python</Option>
          <Option value="ruby">Ruby</Option>
          <Option value="rust">Rust</Option>
        </Select>
      </Form.Item>

      <Form.Item name="sort" label="Sort By">
        <Select
          value={0}
          style={{
            width: 150,
            margin: "0 6px",
          }}
          onChange={setSort}
        >
          <Option value="stars">Stars</Option>
          <Option value="score">Relevance (Score)</Option>
        </Select>
      </Form.Item>

      <Form.Item name="order" label="Order By">
        <Select
          value={0}
          style={{
            width: 80,
            margin: "0 6px",
          }}
          onChange={setOrder}
        >
          <Option value="desc">DESC</Option>
          <Option value="asc">ASC</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};
