# 小可爱日程时钟

一个童趣风格的日程时钟网页应用，专为小女孩设计。

## 功能特点

- 实时时钟显示，配可爱圆盘时钟样式
- 课程图标选择：钢琴、跳舞、英语、绘画、阅读、运动、音乐、美术
- 设置每周固定时间的日程计划
- 到点闹铃提醒功能
- 粉色和蓝色系配色，可爱小动物贴纸装饰
- 自适应移动端
- 数据自动保存到本地

## 部署到 GitHub Pages

1. 创建新仓库，名称如 `schedule-clock`
2. 将 `index.html` 推送到仓库的 `gh-pages` 分支
3. 访问 `https://你的用户名.github.io/schedule-clock/`

或者使用 GitHub Actions 自动部署，参考配置：

```yaml
name: Deploy
on: push
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

## 技术栈

- 纯 HTML + CSS + JavaScript
- 无外部依赖
- LocalStorage 数据持久化
- Web Audio API 闹铃音效
