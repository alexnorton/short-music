import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledDirectoriesList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const DirectoriesListItem = styled.li`
  line-height: 1.4em;
`;

interface DirectoriesListProps {
  directories: string[];
  path: string[];
}

const DirectoriesList: React.SFC<DirectoriesListProps> = ({
  directories,
  path,
}) => (
  <StyledDirectoriesList>
    {directories.map(directory => (
      <DirectoriesListItem key={directory}>
        <Link to={"/" + [...path, directory].join("/")}>{directory}</Link>
      </DirectoriesListItem>
    ))}
  </StyledDirectoriesList>
);

export default DirectoriesList;
