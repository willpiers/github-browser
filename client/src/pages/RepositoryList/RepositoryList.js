import React, { useReducer } from "react";
import { useQuery } from "../../utils";
import { Avatar, Card, List, Pagination } from "antd";
import { SearchForm } from "./components";
import { Link } from "react-router-dom";

const initialQuery = {
  search: "webpack",
  language: "javascript",
  sort: "stars",
  order: "desc",
  page: 1,
};

function queryReducer(state, action) {
  switch (action.type) {
    case "UPDATE_QUERY":
      return { ...state, ...action.payload };
    default:
      return initialQuery;
  }
}

const buildEndpoint = ({ search, language, sort, order, page }) => {
  return `/api/repositories?q=${search}&language=${language}&sort=${sort}&order=${order}&page=${page}`;
};

export const RepositoryList = () => {
  const [query, dispatch] = useReducer(queryReducer, initialQuery);

  const { data: repos, error } = useQuery(buildEndpoint(query));

  if (error) {
    return (
      <div>
        <SearchForm updateQuery={dispatch} initialValues={initialQuery} />
        <p>
          The server encountered an error. Open the console to see more or try
          again later.
        </p>
      </div>
    );
  }

  return (
    <div>
      <SearchForm updateQuery={dispatch} initialValues={initialQuery} />
      <Pagination
        style={{ margin: "1rem 0" }}
        disabled={!repos}
        current={query.page}
        pageSize={30}
        showSizeChanger={false}
        total={Infinity}
        onChange={(page) => {
          dispatch({
            type: "UPDATE_QUERY",
            payload: { page },
          });
        }}
      />
      {!repos ? null : (
        <div>
          <List
            grid={{ gutter: 8, column: 4 }}
            dataSource={repos}
            renderItem={(repo) => (
              <Link to={`/${repo.full_name}`}>
                <List.Item>
                  <Card bordered={true}>
                    <Card.Meta
                      avatar={
                        <Avatar
                          size="small"
                          src={`https://avatars.githubusercontent.com/${repo.owner.login}`}
                        />
                      }
                      title={repo.full_name}
                      description={repo.description}
                    />
                  </Card>
                </List.Item>
              </Link>
            )}
          />
        </div>
      )}
    </div>
  );
};
