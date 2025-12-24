import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PrivacyPolicy = () => {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const location = useLocation();

  useEffect(() => {
    // 添加Privacy Policy Page专用结构化数据
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: language === 'zh' ? '地址翻译器 - 隐私政策' : 'Address Translator - Privacy Policy',
      description: language === 'zh'
        ? '地址翻译器隐私政策说明我们如何收集、使用和保护您的个人信息。'
        : 'Privacy Policy for Address Translator explains how we collect, use, and protect your personal information.',
      provider: {
        '@type': 'Organization',
        name: 'Address Translator',
        url: 'https://transadd.mxai.site'
      },
      areaServed: 'Global',
      availableLanguage: ['Chinese', 'English'],
      hasCredential: 'GDPR Compliant'
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'privacy-policy-structured-data';
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('privacy-policy-structured-data');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [language, location.pathname]);

  const content = {
    zh: {
      title: '隐私政策',
      lastUpdated: '最后更新日期：2025年1月17日',
      introduction: '本隐私政策说明了地址翻译器（以下简称"本服务"）如何收集、使用和保护您的个人信息。我们致力于保护您的隐私和数据安全。',
      sections: [
        {
          title: '1. 信息收集',
          content: '本服务采用本地处理架构，您的输入数据（包括地址信息）仅在您的设备上处理，不会上传到我们的服务器。我们不收集、存储或传输任何个人识别信息。'
        },
        {
          title: '2. 数据使用',
          content: '翻译过程完全在您的浏览器中进行。我们使用第三方AI服务（Mistral AI）进行翻译，但仅传输必要的地址文本内容，不包含任何个人识别信息。'
        },
        {
          title: '3. 数据存储',
          content: '您的翻译历史记录仅存储在您的本地浏览器中（使用localStorage技术）。我们不会访问、收集或存储这些信息。您可以随时清除浏览器数据来删除这些记录。'
        },
        {
          title: '4. 第三方服务',
          content: '我们使用Mistral AI提供翻译服务。该服务仅接收必要的文本内容进行翻译，不会收集额外的个人信息。关于Mistral AI的隐私政策，请访问其官方网站了解详情。'
        },
        {
          title: '5. Cookie政策',
          content: '本服务不使用Cookie。我们仅在您的浏览器本地存储翻译历史记录，这些数据不会发送到我们的服务器。'
        },
        {
          title: '6. 数据安全',
          content: '我们采用行业标准的安全措施来保护您的信息安全。由于数据仅在本地处理，您的隐私得到了最大程度的保护。'
        },
        {
          title: '7. 儿童隐私',
          content: '本服务不针对13岁以下儿童。我们不会有意收集儿童的个人信息。'
        },
        {
          title: '8. 政策变更',
          content: '我们可能会不时更新本隐私政策。任何更改都将在此页面发布，并更新最后修改日期。建议您定期查看本政策以了解任何变更。'
        },
        {
          title: '9. 联系我们',
          content: '如果您对本隐私政策有任何疑问，请通过我们提供的联系方式与我们联系。'
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: January 17, 2025',
      introduction: 'This Privacy Policy explains how Address Translator (hereinafter referred to as "the Service") collects, uses, and protects your personal information. We are committed to protecting your privacy and data security.',
      sections: [
        {
          title: '1. Information Collection',
          content: 'This service adopts a local processing architecture. Your input data (including address information) is processed only on your device and will not be uploaded to our servers. We do not collect, store, or transmit any personally identifiable information.'
        },
        {
          title: '2. Data Usage',
          content: 'The translation process is performed entirely in your browser. We use a third-party AI service (Mistral AI) for translation, but only the necessary address text content is transmitted, without any personally identifiable information.'
        },
        {
          title: '3. Data Storage',
          content: 'Your translation history is stored only in your local browser (using localStorage technology). We do not access, collect, or store this information. You can delete these records at any time by clearing your browser data.'
        },
        {
          title: '4. Third-Party Services',
          content: 'We use Mistral AI to provide translation services. The service only receives the necessary text content for translation and does not collect additional personal information. For details about Mistral AI\'s privacy policy, please visit their official website.'
        },
        {
          title: '5. Cookie Policy',
          content: 'This service does not use cookies. We only store translation history in your browser locally, and this data is not sent to our servers.'
        },
        {
          title: '6. Data Security',
          content: 'We employ industry-standard security measures to protect your information. Since data is processed locally only, your privacy is maximally protected.'
        },
        {
          title: '7. Children\'s Privacy',
          content: 'This service is not directed to children under 13. We do not knowingly collect personal information from children.'
        },
        {
          title: '8. Policy Changes',
          content: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page and the last modified date will be updated. We recommend that you periodically review this Policy to stay informed of any changes.'
        },
        {
          title: '9. Contact Us',
          content: 'If you have any questions about this Privacy Policy, please contact us through the contact information we provide.'
        }
      ]
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-black dark:to-zinc-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 语言切换按钮 */}
        <div className="flex justify-end mb-6">
          <div className="flex bg-white/70 dark:bg-zinc-900/70 rounded-lg p-1 border border-slate-200/50 dark:border-zinc-800/50">
            <button
              onClick={() => setLanguage('zh')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                language === 'zh'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:text-blue-600'
              }`}
            >
              中文
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                language === 'en'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:text-blue-600'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
            {currentContent.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {currentContent.lastUpdated}
          </p>
        </div>

        {/* 内容卡片 */}
        <div className="bg-white/70 dark:bg-zinc-900/70 rounded-xl shadow-lg border border-slate-200/50 dark:border-zinc-800/50 p-8 backdrop-blur-md">
          {/* 介绍 */}
          <div className="mb-8">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentContent.introduction}
            </p>
          </div>

          {/* 各章节内容 */}
          <div className="space-y-6">
            {currentContent.sections.map((section, index) => (
              <div key={index} className="border-b border-slate-200/50 dark:border-zinc-800/50 pb-6 last:border-0">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
                  {section.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* 返回首页按钮 */}
          <div className="mt-8 text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {language === 'zh' ? '返回首页' : 'Back to Home'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;