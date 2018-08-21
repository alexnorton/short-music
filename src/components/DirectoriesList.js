import React, { Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import removeArticle from "../helpers/removeArticle";

const StyledDirectoriesList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const DirectoriesListItem = styled.li`
  line-height: 1.4em;
`;

const DirectoriesList = ({ directories, path }) => (
  <StyledDirectoriesList>
    {directories
      .sort((a, b) => removeArticle(a).localeCompare(removeArticle(b)))
      .map(directory => (
        <DirectoriesListItem key={directory}>
          <Link to={"/" + [...path, directory].join("/")}>{directory}</Link>
        </DirectoriesListItem>
      ))}
  </StyledDirectoriesList>
);

export default DirectoriesList;
