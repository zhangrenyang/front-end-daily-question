# 前端每日一题

一个前端刷题插件

## how to use

1. 在 vscode 搜前端每日一题，或者 [在 vscode marketplace 上下载](https://marketplace.visualstudio.com/items?itemName=everest-architecture.front-end-daily-question)
2. 安装完成后，vscode 左侧栏会出现一个新图标，点击进去就能看我们的练习题了。
3. 点击想做的题目，会弹出 4 个选择框。选择其中一个会自动生成面试题文件，到你指定的 workplace。（ps. 建议在你专门刷题的文件夹下使用，那么就不会每次都弹出选择框了）
4. 请在 start 和 end 之间作答。
5. 下方会有提交答案和查看题解的按钮。提交答案，会提交你在 start 和 end 之间的答案。

## how to contribute

- 接口文档 https://github.com/everest-architecture/front-end-daily-question/blob/main/packages/requirements/API.md
- 项目看板，可以在上面领任务 https://github.com/everest-architecture/front-end-daily-question/projects/1
- fork 下来，完成你的需求，提交 Pull Request，就可以提交了参与贡献了！

## Features

1. 对接每日一题题库
2. 自动生成记录你答题答案的文件夹
3. 提交你的答案到题库
4. 打开查看你的问题
5. 刷新题目列表

## Requirements

🈚️

## Extension Settings

- `interview.workspaceFolder`:  文件夹地址

## Known Issues

## Release Notes

### release 1.0.0

1. 现在可以提交答案跟查看题解了！！
2. 可以刷新你的答案列表
3. 新增每日新题 logo
4. 修改了一些上个版本的 bug

### Beta 0.0.2

接入珠峰每日一题 API

### Beta 0.0.1

完成第一版，仅有题目以及文件夹

## QA

### 弹出弹窗说插件不可用

- 大部分情况可能是你的 vscode 版本太低了。目前我们的 vscode 插件使用 1.49.0 的引擎开发。请把 vscode 版本升级到 1.49.0 以上。

### For more information

**Enjoy!**
