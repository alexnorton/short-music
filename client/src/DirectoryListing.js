import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import removeArticle from "./removeArticle";

class DirectoryListing extends React.Component {
  state = { path: [] };

  async componentDidMount() {
    await this.updateData();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.match.params.path !== prevProps.match.params.path) {
      await this.updateData();
    }
  }

  async updateData() {
    const path = this.props.match.params.path
      ? this.props.match.params.path.split("/")
      : [];

    this.setState({
      path,
    });

    const req = await fetch(`/browse?path=${path.join("/")}`);
    const data = await req.json();

    this.setState({
      data,
    });
  }

  render() {
    const { path, data } = this.state;

    return data ? (
      <div>
        <h2>{path && path.join(" / ")}</h2>
        {path.length > 0 && (
          <Link to={"/" + this.state.path.slice(0, path.length - 1).join("/")}>
            Up one level
          </Link>
        )}
        {data.directories.length > 0 && (
          <Fragment>
            <h3>Directories</h3>
            <ul>
              {data.directories
                .sort((a, b) =>
                  removeArticle(a).localeCompare(removeArticle(b))
                )
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
                .sort((a, b) =>
                  removeArticle(a).localeCompare(removeArticle(b))
                )
                .map(file => <li key={file}>{file}</li>)}
            </ul>
          </Fragment>
        )}
      </div>
    ) : null;
  }
}

export default DirectoryListing;
