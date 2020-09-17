import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, List } from "antd";
import {
  StarOutlined,
  CopyOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";

export const RepositoryDetail = () => {
  const { owner, name } = useParams();

  const [repo, setRepo] = useState(null);
  useEffect(() => {
    const fetchRepos = async () => {
      const res = await fetch(`/api/repository/${owner}/${name}`, {
        method: "GET",
      });

      const repository = await res.json();
      setRepo(repository);
    };

    fetchRepos();
  }, [name, owner]);

  if (!repo) {
    return <p>Loading repository...</p>;
  }

  const statistics = [
    {
      icon: StarOutlined,
      display: "Stargazers",
      count: repo.stargazers_count,
    },
    {
      icon: CopyOutlined,
      display: "Forks",
      count: repo.forks_count,
    },
    {
      icon: ExclamationCircleOutlined,
      display: "Open Issues",
      count: repo.open_issues_count,
    },
    {
      icon: EyeOutlined,
      display: "Watchers",
      count: repo.watchers_count,
    },
  ];

  return (
    <div>
      <Link to="/">
        <Button style={{ marginBottom: "1rem" }}>Back</Button>
      </Link>
      <Card
        bordered={true}
        title={repo.full_name}
        extra={<a href={repo.html_url}>View on Github</a>}
      >
        <Card.Meta
          avatar={
            <Avatar
              size="large"
              src={`https://avatars.githubusercontent.com/${repo.owner.login}`}
            />
          }
          description={repo.description}
        />
        <List
          style={{ margin: "2rem 0 0 0" }}
          grid={{ gutter: 8, column: 4 }}
          dataSource={statistics}
          renderItem={(statistic) => (
            <List.Item>
              <Card bordered={true}>
                <Card.Meta
                  title={statistic.display}
                  description={statistic.count}
                  avatar={<Avatar icon={<statistic.icon />} />}
                />
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};
