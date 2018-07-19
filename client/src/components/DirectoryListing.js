import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import removeArticle from "../helpers/removeArticle";

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
                <button
                  href="#play"
                  onClick={e => {
                    e.preventDefault();
                    onSelectFile([...path, file].join("/"));
                  }}
                >
                  {file}
                </button>
              </li>
            ))}
        </ul>
      </Fragment>
    )}
  </div>
);

export default DirectoryListing;
