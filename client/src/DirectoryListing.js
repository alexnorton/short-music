import React from "react";
import { Link } from "react-router-dom";

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

    return (
      <div>
        <h2>{path && path.join(" / ")}</h2>
        {path.length > 0 && (
          <Link to={"/" + this.state.path.slice(0, path.length - 1).join("/")}>
            Up one level
          </Link>
        )}
        <ul>
          {data &&
            data.map(entry => (
              <li key={entry}>
                <Link to={"/" + [...path, entry].join("/")}>{entry}</Link>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default DirectoryListing;
