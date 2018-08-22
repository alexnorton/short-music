import React from "react";

import MultiSelectList from "./MultiSelectList";
import FilesListItem from "./FilesListItem";

class FilesList extends React.Component {
  state = {
    selected: [],
  };

  handleSelect(key) {
    this.setState({ selected: [key] });
  }

  handlePlayFromIndex(index) {
    const { onPlayFiles, files, path } = this.props;

    onPlayFiles(files.slice(index).map(file => [...path, file]));
  }

  render() {
    const { files, path, currentFile } = this.props;
    const { selected } = this.state;

    return (
      <div>
        {files.map((file, index) => {
          const key = file;
          return (
            <div
              key={key}
              onClick={() => this.handleSelect(key)}
              onDoubleClick={() => this.handlePlayFromIndex(index)}
            >
              <FilesListItem
                file={file}
                playing={
                  currentFile &&
                  [...path, file].join("/") === currentFile.join("/")
                }
                selected={selected.indexOf(key) !== -1}
                onPlayFile={() => this.handlePlayFromIndex(index)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default FilesList;
