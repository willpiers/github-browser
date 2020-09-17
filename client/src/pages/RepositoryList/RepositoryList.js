import React, { useEffect, useState, useReducer } from "react";
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

const queryBuilder = ({ search, language, sort, order, page }) => {
  return `/api/repositories?q=${search}&language=${language}&sort=${sort}&order=${order}&page=${page}`;
};

export const RepositoryList = () => {
  const [repos, setRepos] = useState(null);
  const [query, dispatch] = useReducer(queryReducer, initialQuery);
  useEffect(() => {
    const fetchRepos = async () => {
      const res = await fetch(queryBuilder(query), {
        method: "GET",
      });

      const repositories = await res.json();
      setRepos(repositories);
    };

    fetchRepos();
  }, [query]);

  return (
    <div>
      <SearchForm updateQuery={dispatch} initialValues={initialQuery} />
      {!repos ? (
        <p>Loading repos...</p>
      ) : (
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
          <Pagination
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
        </div>
      )}
    </div>
  );
};
