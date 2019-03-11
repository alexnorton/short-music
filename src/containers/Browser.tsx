import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RouteComponentProps } from "react-router-dom";

import File from "../model/File";
import Directory from "../model/Directory";
import DirectoryListing from "../components/DirectoryListing";
import { loadAndPlayQueue, toggle, playLater, playNext } from "../actions/user";
import { fetchDirectory } from "../actions/library";
import { StoreState } from "../reducers/rootReducer";
import getFileFromLibrary from "../helpers/getFileFromLibrary";

interface BrowserRouterProps {
  path?: string;
}

interface BrowserProps extends RouteComponentProps<BrowserRouterProps> {
  directory?: Directory;
  currentFile?: File;
  playing: boolean;
}

interface BrowserDispatchProps {
  loadAndPlayQueue: typeof loadAndPlayQueue;
  playLater: typeof playLater;
  playNext: typeof playNext;
  toggle: typeof toggle;
  fetchDirectory: typeof fetchDirectory;
}

class Browser extends React.PureComponent<BrowserProps & BrowserDispatchProps> {
  async componentDidMount() {
    await this.updateData();
  }

  async componentDidUpdate(prevProps: BrowserProps & BrowserDispatchProps) {
    if (this.props.match.params.path !== prevProps.match.params.path) {
      await this.updateData();
    }
  }

  async updateData() {
    const path = this.props.match.params.path
      ? this.props.match.params.path.split("/")
      : [];

    if (!this.props.directory) {
      this.props.fetchDirectory(path);
    }
  }

  render() {
    const {
      loadAndPlayQueue,
      playLater,
      playNext,
      toggle,
      currentFile,
      playing,
      directory,
    } = this.props;

    if (directory) {
      const { contents, error } = directory;

      const path = this.props.match.params.path
        ? this.props.match.params.path.split("/")
        : [];

      return (
        <DirectoryListing
          path={path}
          data={contents}
          error={error}
          onPlayFiles={loadAndPlayQueue}
          onPlayLater={playLater}
          onPlayNext={playNext}
          onToggle={toggle}
          playing={playing}
          currentFile={currentFile}
        />
      );
    }
    return null;
  }
}

const mapStateToProps = (
  { player: { queue, queueIndex, playing }, library }: StoreState,
  ownProps: BrowserProps
): BrowserProps => ({
  ...ownProps,
  currentFile:
    (queue &&
      queueIndex !== null &&
      getFileFromLibrary(
        library,
        queue[queueIndex].file.directory,
        queue[queueIndex].file.filename
      )) ||
    undefined,
  playing,
  directory: library["/" + (ownProps.match.params.path || "")],
});

const mapDispatchToProps = (dispatch: Dispatch): BrowserDispatchProps =>
  bindActionCreators(
    {
      loadAndPlayQueue,
      playLater,
      playNext,
      toggle,
      fetchDirectory,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browser);
