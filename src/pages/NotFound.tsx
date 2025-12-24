import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const location = useLocation();

  useEffect(() => {
    // Add 404 page structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: language === 'zh' ? '页面未找到 - 404' : 'Page Not Found - 404',
      description: language === 'zh'
        ? `页面 "${location.pathname}" 未找到。请返回首页或检查URL。`
        : `The page "${location.pathname}" was not found. Please return to the home page or check the URL.`,
      publisher: {
        '@type': 'Organization',
        name: 'Address Translator',
        url: 'https://transadd.mxai.site'
      },
      inLanguage: language === 'zh' ? 'zh-CN' : 'en-US'
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = '404-structured-data';
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('404-structured-data');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [language, location.pathname]);

  const content = {
    zh: {
      title: '404',
      subtitle: '页面未找到',
      message: `很抱歉，页面 "${location.pathname}" 不存在或已被移动。`,
      suggestion: '请检查URL是否正确，或返回首页继续浏览。',
      backHome: '返回首页',
      switchLang: 'English'
    },
    en: {
      title: '404',
      subtitle: 'Page Not Found',
      message: `Sorry, the page "${location.pathname}" does not exist or has been moved.`,
      suggestion: 'Please check if the URL is correct, or return to the home page to continue browsing.',
      backHome: 'Back to Home',
      switchLang: '中文'
    }
  };

  const c = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-black dark:to-zinc-900 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        {/* 404 图标和标题 */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            {c.title}
          </h1>
          <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-200 mb-6">
            {c.subtitle}
          </h2>
          <div className="mx-auto w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full"></div>
        </div>

        {/* 错误信息 */}
        <div className="bg-white/70 dark:bg-zinc-900/70 rounded-xl shadow-lg border border-slate-200/50 dark:border-zinc-800/50 p-8 mb-8 backdrop-blur-md">
          <p className="text-slate-600 dark:text-slate-300 text-lg mb-4">
            {c.message}
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            {c.suggestion}
          </p>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {c.backHome}
          </a>
        </div>

        {/* 语言切换 */}
        <div className="flex justify-center">
          <button
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            className="px-4 py-2 text-sm rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors border border-slate-200/50 dark:border-zinc-700/50"
          >
            {c.switchLang}
          </button>
        </div>

        {/* 帮助提示 */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {language === 'zh'
              ? '技术支持：vennduo@gmail.com'
              : 'Technical Support: vennduo@gmail.com'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
