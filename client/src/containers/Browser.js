import React from "react";
import { connect } from "react-redux";

import DirectoryListing from "../components/DirectoryListing";
import { playFile } from "../actions/user";

class Browser extends React.Component {
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

    const req = await fetch(`/data/${[...path, ""].join("/")}`);
    const json = await req.json();

    const data = {
      directories: json
        .filter(item => item.type === "directory")
        .map(item => item.name),
      files: json.filter(item => item.type === "file").map(item => item.name),
    };

    this.setState({
      data,
    });
  }

  render() {
    const { path, data } = this.state;
    const { playFile } = this.props;

    return data ? (
      <DirectoryListing path={path} data={data} onSelectFile={playFile} />
    ) : null;
  }
}

const mapDispatchToProps = dispatch => ({
  playFile: (path, file) => dispatch(playFile(path, file)),
});

export default connect(
  null,
  mapDispatchToProps
)(Browser);
