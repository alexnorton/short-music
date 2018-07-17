import React from "react";
import { Link } from "react-router-dom";

class DirectoryListing extends React.Component {
  state = {};

  async componentDidMount() {
    await this.updateData();
  }

  async componentDidUpdate() {
    await this.updateData();
  }

  async updateData() {
    const path = this.props.match.params.path || "";

    if (path !== this.state.path) {
      this.setState({
        path,
      });

      const req = await fetch(`/browse?path=${path}`);
      const data = await req.json();

      this.setState({
        data,
      });
    }
  }

  render() {
    return (
      <div>
        <h2>{this.state.path}</h2>
        <ul>
          {this.state.data &&
            this.state.data.map(entry => (
              <li key={entry}>
                <Link to={[this.state.path, entry].join("/")}>{entry}</Link>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default DirectoryListing;
