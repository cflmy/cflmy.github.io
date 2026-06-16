# 长风工具箱

纯前端实用工具，在浏览器本地运行，**数据不上传服务器**。

- 线上：https://www.cflmy.top
- 主站：https://www.cflmy.cn

## 工具

| 工具 | 说明 |
|------|------|
| 二维码 | 将链接或文本转为二维码，可下载 PNG |
| 图片压缩 | Canvas 本地压缩，可调质量与尺寸 |
| Word 排版 | 上传 .docx，一键套用论文/公文/自定义格式 |
| 简历生成 | 填写信息、上传证件照，多模板导出 Word / PDF |

## 开发

```bash
pnpm install
pnpm dev
```

## 分支与部署

| 分支 | 内容 |
|------|------|
| `main` | 源代码（Vue + Vite） |
| `public` | 构建产物（`dist` 目录内容 + `CNAME`） |

Gitee Pages / GitHub Pages 请绑定 **`public` 分支** 作为发布源，根目录即站点文件。自定义域名在 `public/CNAME` 中配置（构建时会复制到发布包）。

### 本地发布

```bash
pnpm deploy:public
```

等价于 `pnpm build` 后将 `dist/` 推送到 `public` 分支。

### 推送源码

```bash
git push origin main
```

推送到 `main` 后，若仓库在 GitHub 且已开启 Pages，Actions 会自动构建并更新 `public` 分支。
