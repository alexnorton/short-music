import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import File from "../model/File";
import FilesList from "./FilesList";
import DirectoriesList from "./DirectoriesList";
import DirectoryContents from "../model/DirectoryContents";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto 30px;
`;

const DirectoryHeading = styled.h2`
  font-size: 32px;
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
  onPlayFiles: { (file: File[]): void };
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
  }

  clearFileSelection() {
    this.setState({ selectedFiles: [] });
  }

  handleFileSelected(key: any) {
    this.setState({ selectedFiles: [key] });
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
            <DirectoryHeading>
              {title}
              {path &&
                path.length > 1 && (
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
