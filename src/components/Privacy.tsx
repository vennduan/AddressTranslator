import { Shield } from 'lucide-react'

const Privacy = () => {
  const sections = [
    {
      title: "数据处理方式",
      content: [
        "所有地址翻译数据仅在您的浏览器本地进行即时处理。",
        "我们使用第三方翻译API（Mistral AI）进行翻译。",
        "您的输入数据会被发送到翻译API，但我们不会保存、存储或存档这些请求。",
        "翻译完成后，相关数据会从系统内存中立即清除。"
      ]
    },
    {
      title: "数据存储",
      content: [
        "您的历史翻译记录保存在浏览器的本地存储（localStorage）中。",
        "这些数据仅存储在您的设备上，不会上传到我们的服务器。",
        "您可以随时清除浏览器缓存来删除这些记录。"
      ]
    },
    {
      title: "第三方服务",
      content: [
        "我们可能会使用Google AdSense等广告服务。",
        "这些第三方服务可能使用cookie或类似技术来投放相关广告。",
        "您可以在浏览器设置中禁用cookie。",
        "我们不会与广告商分享您的个人地址信息。"
      ]
    },
    {
      title: "数据安全",
      content: [
        "我们实施了HTTPS加密来保护数据传输。",
        "使用CSP（内容安全策略）来防止恶意脚本注入。",
        "不使用追踪cookie或分析工具收集您的个人数据。"
      ]
    },
    {
      title: "您的权利",
      content: [
        "您可以随时停止使用本服务。",
        "您可以清除浏览器数据来删除所有本地存储的信息。",
        "我们不会与第三方共享您的个人数据。"
      ]
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-slate-100 dark:from-black dark:to-zinc-900 p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto flex-1">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
              隐私政策
            </h1>
          </div>
        </header>

        <div className="bg-white/80 dark:bg-zinc-900/80 rounded-xl shadow-lg border border-slate-200/50 dark:border-zinc-800/50 p-8 backdrop-blur-md">
          <section className="mb-8">
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              最后更新日期：{new Date().toLocaleDateString('zh-CN')}
            </p>
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
              欢迎使用地址翻译器（"我们"、"本服务"）。我们高度重视您的隐私保护。本隐私政策将说明我们如何收集、使用和保护您的信息
              （或完全不收集）。
            </p>
          </section>

          {sections.map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <span className="inline-block w-1.5 h-6 bg-blue-500 rounded-full"></span>
                {section.title}
              </h2>
              <div className="pl-4">
                {section.content.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="mb-3 text-slate-700 dark:text-slate-300 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-10 pt-6 border-t border-slate-200/50 dark:border-zinc-800/50">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
              联系我们
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              如果您对本隐私政策有任何疑问，请通过以下方式联系我们：
            </p>
            <p className="mt-2 text-slate-700 dark:text-slate-200">
              邮箱：privacy@mxai.site
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Privacy
