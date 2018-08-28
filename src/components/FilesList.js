import React from "react";

import MultiSelectList from "./MultiSelectList";
import FilesListItem from "./FilesListItem";

class FilesList extends React.Component {
  handlePlayFromIndex(index) {
    const { onPlayFiles, files, path } = this.props;

    onPlayFiles(files.slice(index));
  }

  render() {
    const {
      files,
      path,
      playing,
      currentFile,
      onToggle,
      selectedFiles,
      onFileSelected,
    } = this.props;

    return (
      <div>
        {files.map((file, index) => {
          const key = file.filename;
          const isCurrentFile =
            currentFile &&
            `${file.directory}/${file.filename}` ===
              `${currentFile.directory}/${currentFile.filename}`;
          return (
            <div
              key={key}
              onClick={event => {
                event.stopPropagation();
                onFileSelected(key);
              }}
              onDoubleClick={() => this.handlePlayFromIndex(index)}
            >
              <FilesListItem
                file={file}
                playing={isCurrentFile && playing}
                currentFile={isCurrentFile}
                selected={selectedFiles.indexOf(key) !== -1}
                onPlayFile={() => this.handlePlayFromIndex(index)}
                onToggle={onToggle}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default FilesList;
