import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import removeArticle from "../helpers/removeArticle";
import filenameToComponents from "../helpers/filenameToComponents";

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
        .map((item, index) => (
          <ContentItem key={item}>{renderItem(item, index)}</ContentItem>
        ))}
    </ContentList>
  </Fragment>
);

const FileButton = styled.button`
  background: none !important;
  color: #2980b9;
  border: none;
  padding: 0 !important;
  font: inherit;
  text-align: left;
  cursor: pointer;
  outline: none;

  :hover {
    color: #3498db;
  }
`;

const MutedButtonText = styled.span`
  color: #7f8c8d;
  font-size: 0.8em;

  ${FileButton}:hover & {
    color: #95a5a6;
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
        renderItem={(file, index) => {
          const { number, name, extension } = filenameToComponents(file);
          return (
            <FileButton
              onClick={e => {
                e.preventDefault();
                onSelectFile(
                  data.files.slice(index).map(file => [...path, file])
                );
              }}
            >
              {number && <MutedButtonText>{number}</MutedButtonText>}
              {name}
              {extension && <MutedButtonText>{extension}</MutedButtonText>}
            </FileButton>
          );
        }}
      />
    )}
  </Container>
);

export default DirectoryListing;
