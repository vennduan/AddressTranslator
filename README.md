# Address Translator

智能中英文地址翻译工具 - 专为跨境电商和物流行业设计

AI-powered English-Chinese address translation tool designed for cross-border e-commerce and logistics

## ✨ 功能特点 / Features

### 核心功能
- 🌐 **智能翻译** - AI驱动的地址智能翻译
- 🔒 **隐私保护** - 无数据存储，保证用户隐私安全
- 🎨 **精美界面** - 现代化设计，支持深色/浅色模式
- 💾 **翻译本地缓存** - 本地保存翻译历史记录
- ⚡ **快速响应** - 毫秒级翻译速度

### 国际化支持
- 🇨🇳 中文界面支持
- 🇺🇸 英文界面支持
- 一键切换语言

### 商业功能
- 🤝 **批量翻译** - Excel/CSV文件批量处理能力（开发中）
- 👨‍💼 **人工服务** - 复杂地址专业人工翻译服务
- 📱 **微信扫码** - 支持微信二维码在线咨询

## 🛠️ 技术栈 / Tech Stack

- ⚛️ **React 18** - 前端框架
- 🎨 **TailwindCSS** - 样式框架
- 🪶 **TypeScript** - 类型安全
- 🌐 **React Router** - 路由管理
- 🔄 **Mistral AI API** - AI翻译服务

## 📦 安装与运行 / Installation

### 前置要求
- Node.js 16+ 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/vennduan/AdressTranslator.git
cd AdressTranslator
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 打开浏览器访问 `http://localhost:5174`

### 构建生产版本
```bash
npm run build
npm run preview
```

## 🌐 部署 / Deployment

### 使用 Vercel（推荐）
1. 安装Vercel CLI: `npm i -g vercel`
2. 运行: `vercel`
3. 按照提示完成部署

### 其他平台
- **Netlify**: 将build文件夹拖拽上传
- **GitHub Pages**: 配置GitHub Actions自动部署
- **Self-hosted**: 使用Nginx/Apache托管build产物

## ⚙️ 配置说明 / Configuration

### 环境变量
创建 `.env` 文件配置以下变量：

```bash
# AI翻译API地址
VITE_API_URL=https://api.mxai.site/transadd

# Google Analytics（可选）
VITE_GA_ID=your-ga-id
```

### 自定义修改
- **翻译API**: 修改 `src/App.tsx` 中的 `fetchTranslation` 函数
- **主题颜色**: 修改 `tailwind.config.js`
- **语言支持**: 扩展 `src/i18n/translations.ts`

## 📄 法律文档 / Legal

本项目包含完整的法律文档页面：

- [隐私政策](https://transadd.mxai.site/privacy) - Privacy Policy
- [服务条款](https://transadd.mxai.site/terms) - Terms of Service
- [AI透明度声明](https://transadd.mxai.site/transparency) - AI Transparency Statement

## 🤝 贡献 / Contributing

欢迎提交Issue和Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 更新日志 / Changelog

### v1.0.0 (2025-11-17)
- ✨ 初始版本发布
- ✨ AI智能地址翻译功能
- ✨ 中英文双语支持
- ✨ 深色/浅色主题切换
- ✨ 完整的法律文档页面
- ✨ SEO优化配置

## 📄 许可证 / License

本项目基于 [LICENSE](LICENSE) 文件中的条款进行授权

## 👨‍💻 作者 / Author

**venn**

- GitHub: [@vennduan](https://github.com/vennduan)

## 🙏 致谢 / Acknowledgments

- [Mistral AI](https://mistral.ai/) - 提供AI翻译能力
- [React](https://react.dev/) - 优秀的前端框架
- [TailwindCSS](https://tailwindcss.com/) - 强大的CSS框架
- [Lucide Icons](https://lucide.dev/) - 精美的图标库

## 🌟 项目状态 / Status

🟢 **活跃开发中** - 欢迎提出改进建议和反馈

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/vennduan">venn</a></sub>
</div>

