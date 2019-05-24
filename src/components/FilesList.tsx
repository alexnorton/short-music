import * as React from "react";

import File from "../model/File";
import FilesListItem from "./FilesListItem";
import areFilesEqual from "../helpers/areFilesEqual";

interface FilesListProps {
  files: File[];
  playing: boolean;
  currentFile?: File;
  onToggle: { (): void };
  selectedFiles: File[];
  onFilesSelected: { (files: File[]): void };
  onAddFileToSlection: { (file: File): void };
  onRemoveFileFromSlection: { (file: File): void };
  onPlayFiles: { (files: File[], index: number): void };
  onOpenMenu: { (event: React.MouseEvent<Element>): void };
}

class FilesList extends React.Component<FilesListProps> {
  handlePlayFromIndex(index: number) {
    const { onPlayFiles, files } = this.props;

    onPlayFiles(files, index);
  }

  handleOpenMenu(event: React.MouseEvent<Element>) {
    event.preventDefault();
    this.props.onOpenMenu(event);
  }

  render() {
    const {
      files,
      playing,
      currentFile,
      onToggle,
      selectedFiles,
      onFilesSelected,
      onAddFileToSlection,
      onRemoveFileFromSlection,
    } = this.props;

    return (
      <div>
        {files.map((file, index) => {
          const key = file.filename;

          const isCurrentFile = currentFile
            ? areFilesEqual(file, currentFile)
            : false;

          const selected = selectedFiles.indexOf(file) !== -1;

          return (
            <FilesListItem
              key={key}
              file={file}
              playing={isCurrentFile && playing}
              currentFile={isCurrentFile}
              selected={selected}
              onPlayFile={() => this.handlePlayFromIndex(index)}
              onToggle={onToggle}
              onOpenMenu={event => {
                if (!selected) {
                  onFilesSelected([file]);
                }

                this.handleOpenMenu(event);
              }}
              onClick={event => {
                event.stopPropagation();

                if (event.metaKey) {
                  if (selected) {
                    onRemoveFileFromSlection(file);
                    return;
                  }
                  onAddFileToSlection(file);
                  return;
                }

                if (event.shiftKey) {
                  console.log("shiftKey");
                }

                onFilesSelected([file]);
              }}
              onContextMenu={event => {
                if (!selected) {
                  onFilesSelected([file]);
                }

                this.handleOpenMenu(event);
              }}
              onDoubleClick={() => this.handlePlayFromIndex(index)}
            />
          );
        })}
      </div>
    );
  }
}

export default FilesList;
