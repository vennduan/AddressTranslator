import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const location = useLocation();

  useEffect(() => {
    // Create FAQ structured data for search engines
    const currentFAQList = faqContent[language].items;
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      name: language === 'zh' ? '地址翻译器 - 常见问题 FAQ' : 'Address Translator - Frequently Asked Questions FAQ',
      description: language === 'zh'
        ? '关于地址翻译器的常见问题解答，包括隐私保护、翻译准确性、使用功能等。'
        : 'Frequently asked questions about Address Translator, including privacy protection, translation accuracy, features, etc.',
      mainEntity: currentFAQList.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      })),
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
    script.id = 'faq-page-structured-data';
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('faq-page-structured-data');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [language, location.pathname]);

  const faqContent: {
    zh: { title: string; subtitle: string; items: FAQItem[] };
    en: { title: string; subtitle: string; items: FAQItem[] };
  } = {
    zh: {
      title: '常见问题 FAQ',
      subtitle: '关于地址翻译器的使用指南和常见问题解答',
      items: [
        {
          question: '地址翻译器是免费的吗？',
          answer: '是的，地址翻译器完全免费使用。我们不收取任何费用，致力于为用户提供安全、快速、免费的地址翻译服务。'
        },
        {
          question: '我的数据会被存储吗？隐私如何保护？',
          answer: '绝对不会！我们采用本地化架构，所有数据仅在您的浏览器中处理，不会上传到服务器。您的地址信息和翻译历史只存储在本地浏览器中，我们完全无法访问。对于特别注重隐私的用户，我们建议使用浏览器的无痕模式。'
        },
        {
          question: '翻译的准确性如何？支持哪些语言？',
          answer: '我们使用Mistral AI先进的语言模型，专门优化了地址格式的翻译准确性。目前支持中文和英文的双向翻译，包括各种地址格式和地理位置信息的准确转换。对于重要的地址，建议进行人工验证。'
        },
        {
          question: '为什么叫"AddressFlow"？',
          answer: 'AddressFlow寓意地址翻译的流畅体验。我们希望为跨境电商、国际物流等场景提供流畅的地址翻译服务，让地址在不同语言和文化之间流畅转换。'
        },
        {
          question: '支持批量翻译吗？支持文件上传吗？',
          answer: '目前版本主要支持单个地址的实时翻译。批量翻译功能正在开发中，未来将支持Excel、CSV等文件格式的批量上传和翻译，敬请期待！如需批量翻译服务，欢迎联系我们。'
        },
        {
          question: '翻译结果可以作为正式文件使用吗？',
          answer: '本工具提供的翻译结果仅供参考。对于正式文件、法律文件或重要商务文件，建议寻求专业翻译人员的帮助。对于一般的跨境电商物流地址，我们的翻译结果已经足够准确。'
        },
        {
          question: '如何清除翻译历史记录？',
          answer: '翻译历史记录仅存储在您的本地浏览器中。您可以通过浏览器的设置清除本地存储数据，或直接使用浏览器的清除浏览历史功能。在无痕/隐私模式下使用时，关闭浏览器后历史记录会自动清除。'
        },
        {
          question: '遇到翻译错误怎么办？',
          answer: '如果遇到翻译错误或不准确的情况，请尝试以下步骤：1) 检查输入地址的格式是否正确；2) 确保地址信息完整；3) 如问题持续存在，请联系我们反馈，我们会持续优化AI模型。'
        },
        {
          question: '支持移动端使用吗？',
          answer: '是的，地址翻译器采用响应式设计，完美支持手机、平板等移动设备。无论您在电脑还是移动设备上，都能获得流畅的使用体验。'
        },
        {
          question: '如何联系技术支持？',
          answer: '如有任何问题或建议，欢迎通过电子邮件联系我们：vennduo@gmail.com。我们会尽快回复您的问题。您也可以通过页面下方的微信二维码添加我们。'
        }
      ]
    },
    en: {
      title: 'Frequently Asked Questions FAQ',
      subtitle: 'User guide and FAQ about Address Translator',
      items: [
        {
          question: 'Is Address Translator free to use?',
          answer: 'Yes, Address Translator is completely free to use. We do not charge any fees and are committed to providing users with safe, fast, and free address translation services.'
        },
        {
          question: 'Will my data be stored? How is privacy protected?',
          answer: 'Absolutely not! We adopt a localized architecture where all data is processed only in your browser and will not be uploaded to the server. Your address information and translation history are stored only in the local browser, which we cannot access at all. For users who are particularly concerned about privacy, we recommend using the browser\'s incognito mode.'
        },
        {
          question: 'How accurate is the translation? Which languages are supported?',
          answer: 'We use Mistral AI\'s advanced language model, specifically optimized for the translation accuracy of address formats. Currently supports Chinese-English bidirectional translation, including accurate conversion of various address formats and geographic location information. For important addresses, manual verification is recommended.'
        },
        {
          question: 'Why is it called "AddressFlow"?',
          answer: 'AddressFlow symbolizes the smooth experience of address translation. We want to provide smooth address translation services for cross-border e-commerce, international logistics and other scenarios, allowing addresses to flow smoothly between different languages and cultures.'
        },
        {
          question: 'Does it support batch translation? Does it support file upload?',
          answer: 'The current version mainly supports real-time translation of individual addresses. The batch translation feature is under development and will soon support batch upload and translation of Excel, CSV and other file formats. Stay tuned! If you need batch translation services, please contact us.'
        },
        {
          question: 'Can the translation results be used as official documents?',
          answer: 'The translation results provided by this tool are for reference only. For official documents, legal documents, or important business documents, it is recommended to seek the help of professional translators. For general cross-border e-commerce logistics addresses, our translation results are accurate enough.'
        },
        {
          question: 'How to clear translation history?',
          answer: 'The translation history is stored only in your local browser. You can clear local storage data through your browser settings, or directly use your browser\'s clear browsing history function. When using in incognito/private mode, the history will be automatically cleared after closing the browser.'
        },
        {
          question: 'What should I do if I encounter translation errors?',
          answer: 'If you encounter translation errors or inaccuracies, please try the following steps: 1) Check if the input address format is correct; 2) Ensure the address information is complete; 3) If the problem persists, please contact us for feedback, and we will continue to optimize the AI model.'
        },
        {
          question: 'Does it support mobile devices?',
          answer: 'Yes, Address Translator uses responsive design and perfectly supports mobile devices such as phones and tablets. Whether you are on a computer or a mobile device, you can get a smooth user experience.'
        },
        {
          question: 'How to contact technical support?',
          answer: 'If you have any questions or suggestions, please feel free to contact us via email: vennduo@gmail.com. We will reply to your questions as soon as possible. You can also add us through the WeChat QR code at the bottom of the page.'
        }
      ]
    }
  };

  const c = faqContent[language];

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
            {c.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-300">{c.subtitle}</p>
        </div>

        {/* FAQ 列表 - 使用折叠面板增强用户体验 */}
        <div className="bg-white/70 dark:bg-zinc-900/70 rounded-xl shadow-lg border border-slate-200/50 dark:border-zinc-800/50 p-6 backdrop-blur-md">
          <div className="space-y-4">
            {c.items.map((item, index) => (
              <div
                key={index}
                className="border-b border-slate-200/50 dark:border-zinc-800/50 last:border-0 pb-4 last:pb-0"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between text-left py-3 hover:bg-slate-50 dark:hover:bg-zinc-800/50 rounded-lg px-2 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 pr-4">
                    {item.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronDown className="w-5 h-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 flex-shrink-0 text-slate-500 dark:text-slate-400" />
                  )}
                </button>

                {openIndex === index && (
                  <div className="mt-3 px-2">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 联系信息 */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {language === 'zh'
              ? '还有其他问题？联系我们：vennduo@gmail.com'
              : 'Have other questions? Contact us: vennduo@gmail.com'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
