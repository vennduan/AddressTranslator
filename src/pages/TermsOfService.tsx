import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TermsOfService = () => {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const location = useLocation();

  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: language === 'zh' ? '地址翻译器 - 服务条款' : 'Address Translator - Terms of Service',
      description: language === 'zh'
        ? '使用地址翻译器的服务条款和条件。'
        : 'Terms and conditions for using the Address Translator service.',
      provider: {
        '@type': 'Organization',
        name: 'Address Translator',
        url: 'https://transadd.mxai.site'
      },
      areaServed: 'Global',
      availableLanguage: ['Chinese', 'English']
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'terms-structured-data';
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('terms-structured-data');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [language, location.pathname]);

  const content = {
    zh: {
      title: '服务条款',
      lastUpdated: '最后更新日期：2025年1月17日',
      introduction: '欢迎使用地址翻译器（以下简称"本服务"）。通过使用本服务，您同意遵守以下条款和条件。请仔细阅读这些条款。',
      sections: [
        {
          title: '1. 服务描述',
          content: '地址翻译器是一个在线工具，提供中英文地址翻译服务。本服务通过第三方AI技术（Mistral AI）实现翻译功能，所有数据处理都在用户本地浏览器中进行。'
        },
        {
          title: '2. 用户责任',
          content: '您同意仅在合法和适当的用途下使用本服务。您不得使用本服务进行任何违法、有害、威胁、骚扰、诽谤、淫秽或其他令人反感的行为。'
        },
        {
          title: '3. 服务可用性',
          content: '我们致力于保持服务的持续可用性，但不对服务的可用性、及时性或性能做出任何保证。我们保留随时修改、暂停或终止服务的权利，无需事先通知。'
        },
        {
          title: '4. 数据保护',
          content: '我们重视您的数据隐私。所有翻译过程都在您的本地设备上进行，我们不会收集、存储或传输您的个人数据。翻译历史仅保存在您的本地浏览器中。'
        },
        {
          title: '5. 第三方服务',
          content: '本服务使用Mistral AI提供翻译功能。使用本服务即表示您同意遵守Mistral AI的服务条款和隐私政策。我们对第三方服务的性能和可用性不承担任何责任。'
        },
        {
          title: '6. 知识产权',
          content: '本服务的所有内容、功能和特性（包括用户界面设计、代码和算法）均受版权、商标和其他知识产权法律的保护。您不得复制、修改、分发、出售或租赁本服务的任何部分。'
        },
        {
          title: '7. 免责声明',
          content: '本服务按"现状"提供，不提供任何明示或暗示的保证。我们不保证翻译结果的准确性、完整性或可靠性。对于因使用本服务而产生的任何直接或间接损失，我们不承担任何责任。'
        },
        {
          title: '8. 服务变更',
          content: '我们保留随时修改、更新或替换这些条款的权利。我们将通过更新此页面来通知您任何变更。您在本条款变更后继续使用本服务即表示您接受这些变更。'
        },
        {
          title: '9. 终止使用',
          content: '我们保留因任何原因（包括但不限于违反这些条款）立即终止或暂停您访问本服务的权利，无需事先通知或承担任何责任。'
        },
        {
          title: '10. 适用法律',
          content: '这些条款应受适用的法律法规管辖并根据其解释。任何与本条款相关的争议应通过友好协商解决。'
        },
        {
          title: '11. 联系我们',
          content: '如果您对这些条款有任何疑问，请通过我们提供的联系方式与我们联系。'
        }
      ]
    },
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last Updated: January 17, 2025',
      introduction: 'Welcome to Address Translator (hereinafter referred to as "the Service"). By using the Service, you agree to comply with the following terms and conditions. Please read these terms carefully.',
      sections: [
        {
          title: '1. Service Description',
          content: 'Address Translator is an online tool that provides Chinese-English address translation services. The Service uses third-party AI technology (Mistral AI) to implement translation functions, and all data processing is performed in the user\'s local browser.'
        },
        {
          title: '2. User Responsibilities',
          content: 'You agree to use the Service only for lawful and appropriate purposes. You may not use the Service for any illegal, harmful, threatening, harassing, defamatory, obscene, or otherwise objectionable conduct.'
        },
        {
          title: '3. Service Availability',
          content: 'We strive to maintain continuous availability of the Service, but make no warranties regarding availability, timeliness, or performance. We reserve the right to modify, suspend, or terminate the Service at any time without prior notice.'
        },
        {
          title: '4. Data Protection',
          content: 'We value your data privacy. All translation processes are performed on your local device, and we do not collect, store, or transmit your personal data. Translation history is only saved in your local browser.'
        },
        {
          title: '5. Third-Party Services',
          content: 'The Service uses Mistral AI to provide translation functionality. By using the Service, you agree to comply with Mistral AI\'s Terms of Service and Privacy Policy. We are not responsible for the performance and availability of third-party services.'
        },
        {
          title: '6. Intellectual Property',
          content: 'All content, features, and functionality of the Service (including user interface design, code, and algorithms) are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of the Service.'
        },
        {
          title: '7. Disclaimer',
          content: 'The Service is provided "as is" without any express or implied warranties. We do not guarantee the accuracy, completeness, or reliability of translation results. We are not responsible for any direct or indirect losses arising from the use of the Service.'
        },
        {
          title: '8. Service Changes',
          content: 'We reserve the right to modify, update, or replace these terms at any time. We will notify you of any changes by updating this page. Your continued use of the Service after changes to these terms constitutes acceptance of those changes.'
        },
        {
          title: '9. Termination of Use',
          content: 'We reserve the right to immediately terminate or suspend your access to the Service for any reason, including but not limited to violation of these terms, without prior notice or liability.'
        },
        {
          title: '10. Applicable Law',
          content: 'These terms shall be governed by and construed in accordance with applicable laws and regulations. Any disputes related to these terms should be resolved through friendly consultation.'
        },
        {
          title: '11. Contact Us',
          content: 'If you have any questions about these terms, please contact us through the contact information we provide.'
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

export default TermsOfService;