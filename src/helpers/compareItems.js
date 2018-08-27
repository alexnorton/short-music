import removeArticle from "./removeArticle";

const compareItems = (a, b) =>
  removeArticle(a).localeCompare(removeArticle(b), undefined, {
    numeric: true,
    sensitivity: "base",
  });

export default compareItems;
