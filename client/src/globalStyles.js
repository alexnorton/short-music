import { injectGlobal } from "styled-components";

injectGlobal`
  html,
  body,
  #root {
    height: 100%;
    margin: 0;
  }

  html {
    overflow: hidden;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    color: #333;
    overflow: auto;
  }

  a {
    color: #2980b9;
  }

  a:hover {
    color: #3498db;
  }
`;
