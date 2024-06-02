export default `(function() {
  let layuiScript = document.createElement('script');
  layuiScript.src = 'https://www.layuicdn.com/layui/layui.js';
  let layuiCss = document.createElement('link');
  layuiCss.rel = 'stylesheet';
  layuiCss.href = 'https://www.layuicdn.com/layui/css/layui.css';
  document.body.appendChild(layuiScript);
  document.head.appendChild(layuiCss);
  if(window.localStorage.getItem('categories') === null) window.localStorage.setItem('categories','');
  window.modifyResult = '';

  const modifyEnd = new Event('modifyEnd');

  navigator.clipboard._writeText = navigator.clipboard.writeText;
  navigator.clipboard.writeText = async (arg) => {
    try{
      JSON5.parse(arg);
    }
    catch{
      await navigator.clipboard._writeText(arg);
      layer.msg('复制成功',{icon: 1});
    }
    modifyRule(arg);
    window.addEventListener('modifyEnd', () => {
      navigator.clipboard._writeText(window.modifyResult).then(() => {
        layer.msg('注入修改成功',{icon: 1});
      });
    });
  }

  var mode, cate = '';

  const modifyRule = (rawRule) => {
    var layer = layui.layer;
    var form = layui.form;
    var element = layui.element;
    mode = '1';
    let rule = JSON5.parse(rawRule);
    layer.open({
      type: 1,
      title: '菜单',
      area: 'auto',
      shadeClose: true,
      success: (layero, index, that) => {
        document.getElementsByName('copy')[0].onclick = () => {
          let rulePos = document.getElementsByName('Rpos')[0].value;
          let rulePreKeys = document.getElementsByName('Rprekeys')[0].value;
          let ruleName = document.getElementsByName('Rname')[0].value;
          let ruleDesc = document.getElementsByName('Rdesc')[0].value;

          if(rulePos != ''){
            if(rulePos.startsWith('{') == true && rulePos.endsWith('}') == true){
              let position = JSON5.parse(rulePos);
              let positionKeys = Object.keys(position);
              if(positionKeys.length == 2){
                if(positionKeys.indexOf('left') != -1 && positionKeys.indexOf('right') != -1){
                  layer.msg('坐标非法',{icon: 2});
                  return;
                }
                else if(positionKeys.indexOf('top') != -1 && positionKeys.indexOf('bottom') != -1){
                  layer.msg('坐标非法',{icon: 2});
                  return;
                }
                else if(positionKeys[0] == positionKeys[1]){
                  layer.msg('坐标非法',{icon: 2});
                  return;
                }
                else rule.groups[0].rules[0].position = position;
              }
              else{
                layer.msg('坐标非法',{icon: 2});
                return;
              }
            }
            else{
              layer.msg('你填写的坐标不是一个对象',{icon: 2});
              return;
            }
          }

          if (rulePreKeys != ''){
            let eachPreKey = rulePreKeys.split(',');
            let preKeysArray = [];
            eachPreKey.forEach((a)=>{
              preKeysArray.push(Number(a));
            });
            let rulePrekeysObj = {
              preKeys: preKeysArray,
            };
            rule.groups[0].rules[0] = {...rulePrekeysObj,...rule.groups[0].rules[0]};
          }

          if(cate == '开屏广告') delete rule.groups[0].rules[0].activityIds;

          if(ruleName != '' && cate != '') rule.groups[0].name = cate + '-' + ruleName;
          else if(ruleName != '' && cate == '') rule.groups[0].name = ruleName;
          else{
            if(cate != '') rule.groups[0].name = cate;
          }

          if(ruleDesc == '') delete rule.groups[0].desc;
          else rule.groups[0].desc = ruleDesc;

          layer.close(index);
          
          window.modifyResult = output(rule, mode);
          window.dispatchEvent(modifyEnd);
        };

        document.getElementsByName('saveSettings')[0].onclick = () => {
          let categories = document.getElementsByName('categories')[0].value;
          window.localStorage.setItem('categories',categories);
          layer.msg('保存成功，重新打开本窗口生效',{icon: 6});
        };

        let categories = window.localStorage.getItem('categories');
        if(categories && categories != '') document.getElementsByName('categories')[0].innerText = JSON5.stringify(JSON5.parse(categories));

        geneCategories();
      },
      content: \`
        <div class="layui-tab layui-tab-brief" lay-filter="tab-filter">
          <ul class="layui-tab-title">
            <li class="layui-this" lay-id="info">信息配置</li>
            <li lay-id="settings">设置</li>
          </ul>
          <div class="layui-tab-content">
            <div class="layui-tab-item layui-show">
              <div class="layui-form">
                <div class="layui-form-item">
                  <label class="layui-form-label">选择模式：</label>
                  <input type="radio" name="mode" value="0" title="ts模式" lay-filter="mode-filter">
                  <input type="radio" name="mode" value="1" title="app模式" lay-filter="mode-filter" checked>
                  <input type="radio" name="mode" value="2" title="groups模式" lay-filter="mode-filter">
                  <input type="radio" name="mode" value="3" title="rules模式" lay-filter="mode-filter">
                </div>
                <div id="categories" class="layui-form-item">
                  <label class="layui-form-label">选择分类：</label>
                </div>
                <div class="layui-form-item">
                  <label class="layui-form-label">插入限制字段：</label>
                  <input type="radio" name="limit" value="yes" title="是" lay-filter="limit-filter">
                  <input type="radio" name="limit" value="no" title="否" lay-filter="limit-filter" checked>
                </div>
                <div class="layui-form-item">
                  <label class="layui-form-label">修改key为：</label>
                  <div class="layui-input-group">
                    <input type="number" name="Rkey" lay-affix="ok" lay-filter="ok" class="layui-input">
                    <div class="layui-input-suffix">
                      <i class="layui-icon layui-icon-tips"></i> ts模式、app模式和groups模式修改groups内的key；rules模式修改rules内的key。记得点勾！
                    </div>
                  </div>
                </div>
                <div class="layui-form-item">
                  <label name="preKeysLabel" class="layui-form-label layui-hide">修改preKeys为：</label>
                  <div class="layui-input-group">
                    <input type="text" name="Rprekeys" lay-affix="clear" class="layui-input layui-hide">
                    <div name="preKeysTips" class="layui-input-suffix layui-hide">
                      <i class="layui-icon layui-icon-tips"></i> 多个key用,号分割，不要加空格。没有不填。切换模式不会丢失填写的内容。因格式化问题，格式与GKD要求的有区别。
                    </div>
                  </div>
                </div>
                <div class="layui-form-item">
                  <label class="layui-form-label">坐标：</label>
                  <div class="layui-input-block">
                    <input type="text" name="Rpos" placeholder="一个合法的坐标对象，若无不填" autocomplete="off" lay-affix="clear" class="layui-input">
                  </div>
                </div>
                <div class="layui-form-item">
                  <label class="layui-form-label">规则组名称：</label>
                  <div class="layui-input-block">
                    <input type="text" name="Rname" placeholder="\${rule.groups[0].name}" autocomplete="off" lay-affix="clear" class="layui-input">
                  </div>
                </div>
                <div class="layui-form-item">
                  <label class="layui-form-label">规则组描述：</label>
                  <div class="layui-input-block">
                    <input type="text" name="Rdesc" placeholder="没有描述不填" autocomplete="off" lay-affix="clear" class="layui-input">
                  </div>
                </div>
                <div class="layui-btn-container">
                  <button type="button" name="copy" class="layui-btn">确定</button>
                </div>
              </div>
            </div>
            <div class="layui-tab-item">
              <div class="layui-form">
                <div class="layui-form-item">
                  <label class="layui-form-label">分类：</label>
                  <div class="layui-input-block">
                    <textarea name="categories" cols=50 rows=15 placeholder="多个{key, name}组成的数组，支持JSON5语法" class="layui-textarea"></textarea>
                  </div>
                </div>
                <div class="layui-btn-container">
                  <button type="button" name="saveSettings" class="layui-btn">保存</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      \`,
    });
    layui.use(()=>{
      form.render();
      element.render('tab', 'tab-filter');
    });
    form.on('radio(mode-filter)', (data)=>{
      let elem = data.elem;
      mode = elem.value;
      if(mode == '3'){
        document.getElementsByName('Rprekeys')[0].classList.remove('layui-hide');
        document.getElementsByName('preKeysLabel')[0].classList.remove('layui-hide');
        document.getElementsByName('preKeysTips')[0].classList.remove('layui-hide');
      }
      else{
        document.getElementsByName('Rprekeys')[0].classList.add('layui-hide');
        document.getElementsByName('preKeysLabel')[0].classList.add('layui-hide');
        document.getElementsByName('preKeysTips')[0].classList.add('layui-hide');
      }
    });
    form.on('radio(cate-filter)', (data)=>{
      let elem = data.elem;
      cate = elem.value;
    });
    form.on('radio(limit-filter)', (data)=>{
      let elem = data.elem;
      let isInsert = elem.value;
      if(isInsert == 'yes'){
        if(mode != '3'){
          rule.groups[0].matchTime = 10000;
          rule.groups[0].resetMatch = 'app';
          rule.groups[0].actionMaximum = 1;
        }
        else{
          rule.groups[0].rules[0].matchTime = 10000;
          rule.groups[0].rules[0].resetMatch = 'app';
          rule.groups[0].rules[0].actionMaximum = 1;
        }
      }
    });
    form.on('input-affix(ok)', function(data){
      let elem = data.elem;
      let value = elem.value;
      if(value != ''){
        if(mode == '0' || mode == '1' || mode == '2') rule.groups[0].key = Number(value);
        else{
          let ruleKey = {
            key: Number(value)
          };
          rule.groups[0].rules[0] = {...ruleKey,...rule.groups[0].rules[0]};
        }
        layer.msg('修改成功',{icon: 1});
      }
    });
  };

  function output(rule, mode){
    if(mode == '0'){
      const tsFile = \`import { defineGkdApp } from '@gkd-kit/define';\r\rexport default defineGkdApp(\${JSON5.stringify(rule,null,2)});\r\`;
      return tsFile;
    }
    else if(mode == '1') return JSON5.stringify(rule,null,2);
    else if(mode == '2') return JSON5.stringify(rule.groups[0],null,2);
    else if(mode == '3') return JSON5.stringify(rule.groups[0].rules[0],null,2);
  }

  function geneCategories(){
    let categories = window.localStorage.getItem('categories');
    let CateChoo = document.getElementById('categories');
    if(categories && categories != ''){
      categories = JSON5.parse(categories);
      categories.forEach((b)=>{
        let TInput = document.createElement('input');
        TInput.type = 'radio';
        TInput.name = 'RCate';
        TInput.value = b.name;
        TInput.title = b.name;
        TInput.setAttribute('lay-filter','cate-filter');
        CateChoo.appendChild(TInput);
      });
    }
  }

})();`