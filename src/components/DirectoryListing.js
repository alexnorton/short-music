import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";

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

const DirectorySubHeading = styled.span`
  display: block;
  font-size: 20px;
  color: #7f8c8d;
  font-weight: normal;
`;

const ContentTypeHeading = styled.h4`
  font-size: 24px;
`;

const DirectoryListing = ({ data, error, path, onSelectFile, currentFile }) => {
  const title = path && path.length > 0 ? path[path.length - 1] : "Home";
  return (
    <Container>
      {error ? (
        <Fragment>
          <DirectoryHeading>Error {error.code}</DirectoryHeading>
        </Fragment>
      ) : data ? (
        <Fragment>
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
                currentFile={currentFile}
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
};

export default DirectoryListing;