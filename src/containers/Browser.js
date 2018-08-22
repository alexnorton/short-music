import React from "react";
import { connect } from "react-redux";

import DirectoryListing from "../components/DirectoryListing";
import { loadAndPlayQueue, toggle } from "../actions/user";

class Browser extends React.Component {
  state = { path: [], data: null, error: null };

  async componentDidMount() {
    await this.updateData();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.match.params.path !== prevProps.match.params.path) {
      await this.updateData();
    }
  }

  async updateData() {
    this.setState({
      data: null,
      error: null,
    });

    const path = this.props.match.params.path
      ? this.props.match.params.path.split("/")
      : [];

    this.setState({
      path,
    });

    const req = await fetch(`/data/${[...path, ""].join("/")}`);

    if (req.status !== 200) {
      const body = await req.text();
      return this.setState({ error: { code: req.status, message: body } });
    }

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
    const { path, data, error } = this.state;
    const { loadAndPlayQueue, toggle, currentFile, playing } = this.props;

    return (
      <DirectoryListing
        path={path}
        data={data}
        error={error}
        onSelectFile={loadAndPlayQueue}
        onToggle={toggle}
        playing={playing}
        currentFile={currentFile}
      />
    );
  }
}

const mapStateToProps = ({ player: { queue, queueIndex, playing } }) => ({
  currentFile: queue && queueIndex !== null && queue[queueIndex].file,
  playing,
});

const mapDispatchToProps = dispatch => ({
  loadAndPlayQueue: queue => dispatch(loadAndPlayQueue(queue)),
  toggle: () => dispatch(toggle()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browser);
