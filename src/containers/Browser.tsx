import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RouteComponentProps } from "react-router-dom";

import File from "../model/File";
import DirectoryListing from "../components/DirectoryListing";
import ApiResponse from "../model/ApiResponse";
import { loadAndPlayQueue, toggle } from "../actions/user";
import { SERVER_ENDPOINT } from "../config";
import compareItems from "../helpers/compareItems";
import { StoreState } from "../reducers/rootReducer";
import Directory from "../model/Directory";

interface BrowserRouterProps {
  path: string;
}

interface BrowserProps extends RouteComponentProps<BrowserRouterProps> {
  currentFile: File;
  playing: boolean;
}

interface BrowserDispatchProps {
  loadAndPlayQueue: typeof loadAndPlayQueue;
  toggle: typeof toggle;
}

interface BrowserState {
  data: Directory | null;
  error: {
    code: number;
    message: string;
  } | null;
  path: string[];
}

class Browser extends React.Component<
  BrowserProps & BrowserDispatchProps,
  BrowserState
> {
  state = { path: [], data: null, error: null };

  async componentDidMount() {
    await this.updateData();
  }

  async componentDidUpdate(prevProps: BrowserProps & BrowserDispatchProps) {
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

    const req = await fetch(`${SERVER_ENDPOINT}/${[...path, ""].join("/")}`);

    if (req.status !== 200) {
      const body = await req.text();
      return this.setState({ error: { code: req.status, message: body } });
    }

    const json: ApiResponse = await req.json();

    const data: Directory = {
      directories: json
        .filter(item => item.type === "directory")
        .map(item => item.name)
        .sort(compareItems),
      files: json
        .filter(item => item.type === "file" || item.type === "url")
        .map(item => ({
          directory: path.join("/"),
          filename: item.name,
          title: item.name,
          url:
            item.type === "url"
              ? item.url
              : `${SERVER_ENDPOINT}/${[...path, item.name].join("/")}`,
        }))
        .sort((a, b) => compareItems(a.title, b.title)),
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
        onPlayFiles={loadAndPlayQueue}
        onToggle={toggle}
        playing={playing}
        currentFile={currentFile}
      />
    );
  }
}

const mapStateToProps = (
  { player: { queue, queueIndex, playing } }: StoreState,
  ownProps: BrowserProps
): BrowserProps => ({
  ...ownProps,
  currentFile: queue && queueIndex !== null && queue[queueIndex],
  playing,
});

const mapDispatchToProps = (dispatch: Dispatch): BrowserDispatchProps =>
  bindActionCreators(
    {
      loadAndPlayQueue,
      toggle,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browser);
