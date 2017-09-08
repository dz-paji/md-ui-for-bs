# Material Design UI for Blessing Skin Server
[![Build Status](https://circleci.com/gh/g-plane/md-ui-for-bs/tree/master.svg?style=shield)](https://circleci.com/gh/g-plane/md-ui-for-bs)

## 预览
[这个页面](https://g-plane.github.io/md-ui-for-bs/)可以查看最新的构建预览

点击[此处](https://circleci.com/api/v1.1/project/github/g-plane/md-ui-for-bs/latest/artifacts/0/$CIRCLE_ARTIFACTS/md_ui.zip)可以下载最新的构建成品。（即已经编译好的开发版）

使用上面的最新构建可以体验最新的功能，但也可能存在 Bug。

## 与其它插件的兼容性

以下的兼容性结果仅根据插件的代码预测而来，大部分插件未经实际测试。

若发现兼容问题，欢迎指出（发 issue）。

|插件|版本|兼容性|
|:-----:|:----:|:------:|
|BS Super Cache|1.0.1|视图页面未适配|
|Laravel Debugbar|1.0|未知|
|Profile 文件缓存|1.0.1|视图页面未适配|
|Redis|1.0|视图页面未适配|
|SEO META 标签|1.0.1|兼容|
|Yggdrasil API|1.1.4|未知|
|举报材质|1.0.1|视图页面未适配|
|你好多莉|1.0|不兼容|
|多种首页样式|1.3.0|视图页面未适配|
|头像 API|1.1|兼容|
|导入 v2 数据|1.1.1|未适配|
|批量导入|1.0.4|视图页面未适配|
|插件市场（非官方）|2.2.0|视图页面未适配|
|数据对接|1.3.3|未知|
|注册邮箱验证|1.0.1|未知|
|皮肤编辑实用工具|1.0.0|兼容|
|示例插件|1.0|N/A|
|配置生成|1.2.1|视图页面未适配|
|静态文件 CDN|1.0|不兼容|

## 开发与构建

``` bash
# 安装依赖
$ yarn

# 带热重载的演示
$ yarn dev

# 构建并压缩代码
$ yarn build

# 代码检查
$ yarn lint
```
