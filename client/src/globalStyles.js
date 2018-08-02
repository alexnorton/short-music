import { injectGlobal } from "styled-components";

injectGlobal`
  html,
  body,
  #root {
    height: 100%;
    margin: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    color: #333;
  }

  a {
    color: #2980b9;
    text-decoration: none;
  }

  a:hover {
    color: #3498db;
  }
`;
