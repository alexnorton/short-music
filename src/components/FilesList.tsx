import * as React from "react";

import File from "../model/File";
import FilesListItem from "./FilesListItem";
import areFilesEqual from "../helpers/areFilesEqual";

interface FilesListProps {
  files: File[];
  playing: boolean;
  currentFile?: File;
  onToggle: { (): any };
  selectedFiles: any[];
  onFileSelected: { (file: any): any };
  onPlayFiles: { (files: File[], index: number): any };
}

class FilesList extends React.Component<FilesListProps> {
  handlePlayFromIndex(index: number) {
    const { onPlayFiles, files } = this.props;

    onPlayFiles(files, index);
  }

  handleOpenMenu(event: React.MouseEvent<Element>) {
    event.preventDefault();
    console.log("open menu");
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
            ? areFilesEqual(file, currentFile)
            : false;

          return (
            <div
              key={key}
              onClick={event => {
                event.stopPropagation();
                onFileSelected(key);
              }}
              onContextMenu={this.handleOpenMenu}
              onDoubleClick={() => this.handlePlayFromIndex(index)}
            >
              <FilesListItem
                file={file}
                playing={isCurrentFile && playing}
                currentFile={isCurrentFile}
                selected={selectedFiles.indexOf(key) !== -1}
                onPlayFile={() => this.handlePlayFromIndex(index)}
                onToggle={onToggle}
                onOpenMenu={this.handleOpenMenu}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default FilesList;
