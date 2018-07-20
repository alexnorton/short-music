import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import removeArticle from "../helpers/removeArticle";

const FileButton = styled.button`
  background: none !important;
  color: #2980b9;
  border: none;
  padding: 0 !important;
  font: inherit;
  text-decoration: underline;
  cursor: pointer;
  outline: none;

  :hover {
    color: #3498db;
  }
`;

const DirectoryListing = ({ data, path, onSelectFile }) => (
  <div>
    <h2>{path && path.join(" / ")}</h2>
    {path.length > 0 && (
      <Link to={"/" + path.slice(0, path.length - 1).join("/")}>
        Up one level
      </Link>
    )}
    {data.directories.length > 0 && (
      <Fragment>
        <h3>Directories</h3>
        <ul>
          {data.directories
            .sort((a, b) => removeArticle(a).localeCompare(removeArticle(b)))
            .map(directory => (
              <li key={directory}>
                <Link to={"/" + [...path, directory].join("/")}>
                  {directory}
                </Link>
              </li>
            ))}
        </ul>
      </Fragment>
    )}
    {data.files.length > 0 && (
      <Fragment>
        <h3>Files</h3>
        <ul>
          {data.files
            .sort((a, b) => removeArticle(a).localeCompare(removeArticle(b)))
            .map(file => (
              <li key={file}>
                <FileButton
                  onClick={e => {
                    e.preventDefault();
                    onSelectFile(path, file);
                  }}
                >
                  {file}
                </FileButton>
              </li>
            ))}
        </ul>
      </Fragment>
    )}
  </div>
);

export default DirectoryListing;
