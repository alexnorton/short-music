import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import removeArticle from "../helpers/removeArticle";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto 30px;
`;

const DirectoryHeading = styled.h2`
  font-size: 32px;
`;

const ContentTypeHeading = styled.h3`
  font-size: 24px;
`;

const ContentList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ContentItem = styled.li`
  line-height: 1.4em;
`;

const ContentTypeListing = ({ items, heading, renderItem }) => (
  <Fragment>
    <ContentTypeHeading>{heading}</ContentTypeHeading>
    <ContentList>
      {items
        .sort((a, b) => removeArticle(a).localeCompare(removeArticle(b)))
        .map(item => <ContentItem key={item}>{renderItem(item)}</ContentItem>)}
    </ContentList>
  </Fragment>
);

const FileButton = styled.button`
  background: none !important;
  color: #2980b9;
  border: none;
  padding: 0 !important;
  font: inherit;
  text-decoration: underline;
  cursor: pointer;
  outline: none;

  :hover {
    color: #3498db;
  }
`;

const DirectoryListing = ({ data, path, onSelectFile }) => (
  <Container>
    <DirectoryHeading>
      {path && path.length > 0 ? path.join(" / ") : "Home"}
    </DirectoryHeading>
    {path.length > 0 && (
      <Link to={"/" + path.slice(0, path.length - 1).join("/")}>
        Up one level
      </Link>
    )}
    {data.directories.length > 0 && (
      <ContentTypeListing
        items={data.directories}
        heading="Directories"
        renderItem={directory => (
          <Link to={"/" + [...path, directory].join("/")}>{directory}</Link>
        )}
      />
    )}
    {data.files.length > 0 && (
      <ContentTypeListing
        items={data.files}
        heading="Files"
        renderItem={file => (
          <FileButton
            onClick={e => {
              e.preventDefault();
              onSelectFile(path, file);
            }}
          >
            {file}
          </FileButton>
        )}
      />
    )}
  </Container>
);

export default DirectoryListing;
