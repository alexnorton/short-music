interface BaseItem {
  name: string;
}

interface DirectoryItem extends BaseItem {
  type: "directory";
}

interface FileItem extends BaseItem {
  type: "file";
}

interface UrlItem extends BaseItem {
  type: "url";
  url: string;
}

type Item = DirectoryItem & FileItem & UrlItem;
export type ApiResponse = Item[];
