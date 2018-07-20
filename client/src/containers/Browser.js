import React from "react";
import { connect } from "react-redux";

import DirectoryListing from "../components/DirectoryListing";
import { playFile } from "../actions";

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

    const req = await fetch(`/browse?path=${path.join("/")}`);
    const data = await req.json();

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
