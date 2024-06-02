const detailTable = `
<table id="detailTable" class="list">
  <thead>
    <tr>
      <th>快照链接</th>
      <th>适配情况</th>
      <th>操作</th>
    </tr>
  </thead>
  <tbody id="detailBody"></tbody>
</table>`;
document.getElementById('listDiv').innerHTML = detailTable;

axios.get('./config.json').then((data) => {
  data = data.data;
  let index = 0;
  let tbody = '';
  data.data.forEach((d) => {
    const eachSnapshot = `
      <tr>
        <td>${d.snapshotUrl}</td>
        <td>
          <div>${d.status}</div>
          <button onclick="status(${index}, 0);">未适配</button>
          <button onclick="status(${index}, 1);">已适配</button>
          <button onclick="status(${index}, 2);">无activityId</button>
          <button onclick="status(${index}, 3);">现有规则有效</button>
          <button onclick="status(${index}, 4);">无法适配</button>
          <button onclick="status(${index}, 5);">不予适配</button>
        </td>
        <td>
          <button onclick='review("${d.snapshotUrl}");'>审查</button>
        </td>
      </tr>
    `;
    index++;
    tbody += eachSnapshot;
  });
  document.getElementById('detailBody').innerHTML = tbody;
});

function review(snapshot){
  window.open(snapshot);
}

function status(index, statusNumber){
  window.open(`${String(index)}/${String(statusNumber)}/status`);
}