import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { FaPlay, FaPause } from "react-icons/fa";
import memoized from "fast-memoize";

import File from "../model/File";
import FilesList from "./FilesList";
import DirectoriesList from "./DirectoriesList";
import DirectoryContents from "../model/DirectoryContents";
import areFilesEqual from "../helpers/areFilesEqual";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto 30px;
`;

const DirectoryHeading = styled.h2`
  font-size: 32px;
`;

const PlayAllButton = styled.span`
  display: none;
  color: #2980b9;
  font-size: 22px;
  margin-left: 5px;

  ${DirectoryHeading}:hover & {
    display: inline-block;
  }
`;

const DirectorySubHeading = styled.span`
  display: block;
  font-size: 20px;
  color: #7f8c8d;
  font-weight: normal;
`;

const ContentTypeHeading = styled.h4`
  font-size: 24px;
`;

interface DirectoryListingProps {
  data?: DirectoryContents;
  error?: string;
  path: string[];
  onPlayFiles: { (file: File[], index: number): void };
  onToggle: { (): void };
  currentFile?: File;
  playing: boolean;
}

interface DirectoryListingState {
  selectedFiles: any[];
}

class DirectoryListing extends React.Component<
  DirectoryListingProps,
  DirectoryListingState
> {
  state = {
    selectedFiles: [],
  };

  constructor(props: DirectoryListingProps) {
    super(props);

    this.clearFileSelection = this.clearFileSelection.bind(this);
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.handlePlayAll = this.handlePlayAll.bind(this);
  }

  isCurrentFileInDirectory = memoized((currentFile?: File) => {
    const { data } = this.props;
    return (
      (currentFile &&
        data &&
        data.files.length > 0 &&
        data.files.filter(file => areFilesEqual(file, currentFile)).length >
          0) ||
      false
    );
  });

  clearFileSelection() {
    this.setState({ selectedFiles: [] });
  }

  handleFileSelected(key: any) {
    this.setState({ selectedFiles: [key] });
  }

  handlePlayAll(currentFileIsInDirectory: boolean) {
    const { data, onPlayFiles, onToggle } = this.props;

    if (data && data.files.length > 0) {
      if (currentFileIsInDirectory) {
        onToggle();
        return;
      }

      onPlayFiles(data.files, 0);
    }
  }

  render() {
    const {
      data,
      error,
      path,
      onPlayFiles,
      onToggle,
      currentFile,
      playing,
    } = this.props;

    const { selectedFiles } = this.state;

    const currentFileIsInDirectory = this.isCurrentFileInDirectory(currentFile);

    const title = path && path.length > 0 ? path[path.length - 1] : "Home";

    return (
      <Container onClick={this.clearFileSelection}>
        {error ? (
          <>
            <DirectoryHeading>
              Error
              <br />
              <DirectorySubHeading>{error}</DirectorySubHeading>
            </DirectoryHeading>
          </>
        ) : data ? (
          <>
            <Helmet>
              <title>{title}</title>
            </Helmet>
            <DirectoryHeading
              onClick={() => this.handlePlayAll(currentFileIsInDirectory)}
            >
              {title}
              {data.files.length > 0 && (
                <PlayAllButton>
                  {playing && currentFileIsInDirectory ? (
                    <FaPause />
                  ) : (
                    <FaPlay />
                  )}
                </PlayAllButton>
              )}
              {path && path.length > 1 && (
                <DirectorySubHeading>
                  {path.slice(0, path.length - 1).join(" / ")}
                </DirectorySubHeading>
              )}
            </DirectoryHeading>

            {path.length > 0 && (
              <Link to={"/" + path.slice(0, path.length - 1).join("/")}>
                Up one level
              </Link>
            )}
            {data.directories.length > 0 && (
              <>
                <ContentTypeHeading>Directories</ContentTypeHeading>
                <DirectoriesList directories={data.directories} path={path} />
              </>
            )}
            {data.files.length > 0 && (
              <>
                <ContentTypeHeading>Files</ContentTypeHeading>
                <FilesList
                  files={data.files}
                  onPlayFiles={onPlayFiles}
                  onToggle={onToggle}
                  playing={playing}
                  currentFile={currentFile}
                  selectedFiles={selectedFiles}
                  onFileSelected={this.handleFileSelected}
                />
              </>
            )}
          </>
        ) : (
          <>
            <DirectoryHeading>Loading...</DirectoryHeading>
          </>
        )}
      </Container>
    );
  }
}

export default DirectoryListing;
