import React, { useEffect, useState, useReducer } from "react";
import { Card, List, Avatar } from "antd";
import { SearchForm } from "./components";

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
  return `/api/search?q=${search}&language=${language}&sort=${sort}&order=${order}&page=${page}`;
};

export const RepositoryList = () => {
  const [repos, setRepos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [query, dispatch] = useReducer(queryReducer, initialQuery);
  useEffect(() => {
    const fetchRepos = async () => {
      setIsLoading(true);
      const res = await fetch(queryBuilder(query), {
        method: "GET",
      });

      const repositories = await res.json();
      setRepos(repositories);
      setIsLoading(false);
    };

    fetchRepos();
  }, [query]);

  return (
    <div>
      <SearchForm updateQuery={dispatch} initialValues={initialQuery} />
      {isLoading ? (
        <p>Loading repos...</p>
      ) : (
        <div>
          <List
            grid={{ gutter: 8, column: 4 }}
            dataSource={repos}
            renderItem={(repo) => (
              <List.Item>
                <Card bordered={true}>
                  <Card.Meta
                    avatar={
                      <Avatar
                        src={`https://avatars.githubusercontent.com/${repo.owner.login}`}
                      />
                    }
                    title={repo.full_name}
                    description={repo.description}
                  />
                </Card>
              </List.Item>
            )}
          />
          <p
            onClick={() =>
              dispatch({
                type: "UPDATE_QUERY",
                payload: { page: query.page + 1 },
              })
            }
          >
            next page
          </p>
        </div>
      )}
    </div>
  );
};
