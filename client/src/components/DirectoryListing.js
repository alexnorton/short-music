import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import filenameToComponents from "../helpers/filenameToComponents";
import FilesList from "./FilesList";
import DirectoriesList from "./DirectoriesList";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto 30px;
`;

const DirectoryHeading = styled.h2`
  font-size: 32px;
`;

const DirectorySubHeading = styled.h3`
  font-size: 28px;
`;

const ContentTypeHeading = styled.h4`
  font-size: 24px;
`;

const DirectoryListing = ({ data, error, path, onSelectFile }) => (
  <Container>
    {error ? (
      <Fragment>
        <DirectoryHeading>Error {error.code}</DirectoryHeading>
      </Fragment>
    ) : data ? (
      <Fragment>
        <DirectoryHeading>
          {path && path.length > 0 ? path[path.length - 1] : "Home"}
        </DirectoryHeading>
        {path &&
          path.length > 1 && (
            <DirectorySubHeading>
              {path.slice(0, path.length - 1).join(" / ")}
            </DirectorySubHeading>
          )}
        {path.length > 0 && (
          <Link to={"/" + path.slice(0, path.length - 1).join("/")}>
            Up one level
          </Link>
        )}
        {data.directories.length > 0 && (
          <Fragment>
            <ContentTypeHeading>Directories</ContentTypeHeading>
            <DirectoriesList directories={data.directories} path={path} />
          </Fragment>
        )}
        {data.files.length > 0 && (
          <Fragment>
            <ContentTypeHeading>Files</ContentTypeHeading>
            <FilesList
              path={path}
              files={data.files}
              onPlayFiles={onSelectFile}
            />
          </Fragment>
        )}
      </Fragment>
    ) : (
      <Fragment>
        <DirectoryHeading>Loading...</DirectoryHeading>
      </Fragment>
    )}
  </Container>
);

export default DirectoryListing;
