import removeArticle from "./removeArticle";

const compareItems = (a: string, b: string): number =>
  removeArticle(a).localeCompare(removeArticle(b), undefined, {
    numeric: true,
    sensitivity: "base",
  });

export default compareItems;
