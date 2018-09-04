import * as React from "react";

import File from "../model/File";
import FilesListItem from "./FilesListItem";

interface FilesListProps {
  files: File[];
  playing: boolean;
  currentFile?: File;
  onToggle: { (): any };
  selectedFiles: any[];
  onFileSelected: { (file: any): any };
  onPlayFiles: { (files: File[]): any };
}

class FilesList extends React.Component<FilesListProps> {
  handlePlayFromIndex(index: number) {
    const { onPlayFiles, files } = this.props;

    onPlayFiles(files.slice(index));
  }

  render() {
    const {
      files,
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

          const isCurrentFile = currentFile
            ? `${file.directory}/${file.filename}` ===
              `${currentFile.directory}/${currentFile.filename}`
            : false;

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
