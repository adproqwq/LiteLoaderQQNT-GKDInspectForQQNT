export default `
<html>
  <head>
    <title>快照收集详情</title>
    <style>
      .list {
        border-collapse: collapse;
        width: 100%;
        table-layout: fixed;
      }
    
      .list td {
        border: 1px solid dodgerblue;
        padding: 8px;
        word-break: break-all;
        word-wrap: break-word;
      }
    
      .list th {
        border: 1px solid dodgerblue;
        padding: 8px;
        padding-top: 12px;
        padding-bottom: 12px;
        border-right: 1px solid #FF901E;
        background-color: dodgerblue;
        color: #FF901E;
      }
    </style>
  </head>
  <body>
    <div id="listDiv"></div>
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/1.6.8/axios.min.js"></script>
    <script src="./index.js"></script>
  </body>
</html>
`;