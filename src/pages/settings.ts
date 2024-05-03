export default `
<setting-section data-title="详情">
  <setting-panel>
    <setting-list data-direction="column">
      <setting-item>
        <div>
          <setting-text>查看详情</setting-text>
          <setting-text data-type="secondary">打开窗口查看详情</setting-text>
          <setting-button id="detail" data-type="secondary">查看</setting-button>
        </div>
      </setting-item>
    </setting-list>
  </setting-panel>
</setting-section>

<setting-section data-title="关于">
  <setting-panel>
    <setting-list data-direction="column">
      <setting-item>
        <div>
          <setting-text>Github 仓库</setting-text>
          <setting-text data-type="secondary">https://github.com/adproqwq/LiteLoaderQQNT-GKDInspectForQQNT</setting-text>
          <setting-button id="github" data-type="secondary">去看看</setting-button>
        </div>
      </setting-item>
      <setting-item>
        <div>
          <setting-text>作者</setting-text>
          <setting-text data-type="secondary">adproqwq(Adpro)</setting-text>
        </div>
      </setting-item>
      <setting-item>
        <div>
          <setting-text>版本号</setting-text>
          <setting-text id="pluginVersion" data-type="secondary"></setting-text>
        </div>
      </setting-item>
    </setting-list>
  </setting-panel>
</setting-section>`