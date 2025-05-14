🌍 _[英文](README.md) ∙ [简体中文](README-zh.md)_

# Byte Image Generator

一个现代化的图片生成工具，基于 Next.js 14+ 和 TypeScript 构建。可以轻松生成各种风格的图片。

[![GitHub](https://img.shields.io/github/stars/shadowDragons/image-generator?style=social)](https://github.com/shadowDragons/image-generator)

⭐ 如果您觉得这个项目有用，请考虑在 GitHub 上给它一个星标！您的支持将帮助我们不断改进项目。

[English](README.md) | [中文](README-zh.md)

![Byte Image Generator](./public/opengraph-image.png)

## 特性

- 🎨 多种背景模板（纯色、渐变、图案）
- 🖼️ 自定义图片生成
- 🌈 丰富的颜色定制选项
- 📏 多种图片尺寸选择
- 🌓 深色/浅色模式支持
- 🌍 国际化支持（英文和中文）
- 📊 Google Analytics 集成
- 💅 使用 Tailwind CSS 的响应式设计

## 演示

访问 [https://image-generator.tool.vin](https://image-generator.tool.vin) 查看在线演示。

## 快速开始

### 在 Vercel 上部署

[![使用 Vercel 部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shadowDragons/image-generator)

### 本地开发

1. 克隆仓库

```bash
git clone https://github.com/shadowDragons/image-generator.git
cd image-generator
```

2. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

3. 创建环境变量文件

```bash
cp .env.example .env.local
```

4. 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 环境变量

在根目录创建 `.env.local` 文件，包含以下变量：

```env
NEXT_PUBLIC_GOOGLE_ID=your-ga-id
```

## 技术栈

- [Next.js 14](https://nextjs.org/) - React 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Tailwind CSS](https://tailwindcss.com/) - 样式
- [next-themes](https://github.com/pacocoursey/next-themes) - 主题管理
- [html2canvas](https://html2canvas.hertzen.com/) - 图片生成
- [React DnD](https://react-dnd.github.io/react-dnd/) - 拖拽功能

## 项目结构

```
.
├── app/          # Next.js 应用目录
├── components/   # React 组件
├── config/       # 站点配置
├── lib/          # 工具函数
├── public/       # 静态资源
├── styles/       # 全局样式
└── types/        # TypeScript 类型定义
```

## 贡献

我们欢迎各种形式的贡献！如果您想做出重大改变，请先开一个 issue 讨论您想要改变的内容。

1. Fork 这个仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 许可证

本项目基于 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 作者

Junexus ([https://sphrag.com](https://sphrag.com))

## 支持

如果您觉得这个项目对您有帮助，可以考虑给我买杯咖啡：

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://sphrag.com/en/sponsor)

## 路线图

- [ ] 更多图片模板
- [ ] 自定义字体支持
- [ ] 图片滤镜效果
- [ ] 批量生成功能
- [ ] 图片压缩优化
- [ ] 更多社交媒体尺寸支持

## 致谢

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [html2canvas](https://html2canvas.hertzen.com/)
