import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AITransparency = () => {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const location = useLocation();

  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      '@id': 'https://transadd.mxai.site/transparency',
      headline: language === 'zh' ? 'AI透明度声明 - 地址翻译器' : 'AI Transparency Statement - Address Translator',
      description: language === 'zh'
        ? '了解地址翻译器如何使用AI技术，以及我们对透明度、公平性和安全性的承诺。'
        : 'Learn how Address Translator uses AI technology and our commitment to transparency, fairness, and security.',
      keywords: language === 'zh'
        ? ['AI翻译', '透明度', 'Mistral AI', '隐私保护', '地址翻译']
        : ['AI translation', 'transparency', 'Mistral AI', 'privacy protection', 'address translation'],
      author: {
        '@type': 'Organization',
        name: 'Address Translator',
        url: 'https://transadd.mxai.site'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Address Translator',
        url: 'https://transadd.mxai.site'
      },
      inLanguage: language === 'zh' ? 'zh-CN' : 'en-US',
      aiTransparencyNote: language === 'zh'
        ? '本服务使用Mistral AI提供翻译功能，所有数据处理都在用户本地进行。'
        : 'This service uses Mistral AI for translation, all data processing is done locally on the user\'s device.',
      accountablePerson: {
        '@type': 'Organization',
        name: 'Address Translator Team'
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'ai-transparency-structured-data';
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('ai-transparency-structured-data');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [language, location.pathname]);

  const content = {
    zh: {
      title: 'AI透明度声明',
      lastUpdated: '最后更新日期：2025年1月17日',
      introduction: '本声明详细说明了地址翻译器（以下简称"本服务"）如何使用人工智能（AI）技术，以及我们对AI系统透明度、公平性和安全性的承诺。',
      sections: [
        {
          title: '1. AI系统概述',
          content: '本服务使用Mistral AI提供的先进语言模型进行地址翻译。AI系统通过机器学习算法分析和理解输入的地址文本，然后生成目标语言的翻译结果。我们的AI系统专门针对地址格式和地理位置信息进行了优化。'
        },
        {
          title: '2. AI训练数据来源',
          content: '我们的AI翻译模型基于公开可用的多语言地址数据集、地理信息系统数据和经过清洗的地址语料库进行训练。训练数据经过严格筛选，确保不包含个人敏感信息或隐私数据。'
        },
        {
          title: '3. AI决策过程',
          content: '当用户输入地址时，AI系统会：分析地址结构和组成部分、识别地理位置信息、理解语言和格式特征、生成符合目标语言习惯的翻译结果。整个过程基于模式识别和语言规则，不涉及个人判断或偏见。'
        },
        {
          title: '4. 准确性和限制',
          content: '虽然我们的AI系统经过精心训练，但翻译准确性可能受到以下因素影响：输入地址的完整性、地址格式的复杂性、地理位置的特殊性、语言习惯的差异性。我们建议用户对重要地址进行人工验证。'
        },
        {
          title: '5. 偏见和公平性',
          content: '我们致力于确保AI系统的公平性和无偏见性。我们的训练数据涵盖多个国家和地区，力求避免地域、文化或语言偏见。如发现任何偏见或歧视性内容，请立即向我们报告。'
        },
        {
          title: '6. 数据隐私保护',
          content: 'AI处理过程完全遵循我们的隐私政策：所有数据处理都在用户本地进行，不会上传到外部服务器。AI模型仅接收必要的文本输入，不会访问用户个人信息。翻译历史仅存储在本地浏览器中。'
        },
        {
          title: '7. 安全措施',
          content: '我们实施了多项安全措施来确保AI系统的安全使用：输入验证和清理，防止恶意代码注入、输出过滤，确保翻译结果的适当性、监控异常使用模式，防止系统滥用、定期更新AI模型，修复潜在安全漏洞。'
        },
        {
          title: '8. 用户控制权',
          content: '用户拥有以下控制权：可以选择不使用AI翻译功能、可以清除本地存储的翻译历史、可以选择不保存任何翻译记录、可以向我们的团队报告AI翻译错误或问题。'
        },
        {
          title: '9. 持续改进',
          content: '我们致力于持续改进AI系统的性能和准确性。我们定期：收集用户反馈，优化翻译质量、更新训练数据，提升AI理解能力、监控翻译结果，识别改进机会、与AI技术社区合作，采用最佳实践。'
        },
        {
          title: '10. 透明度承诺',
          content: '我们承诺保持AI系统的高度透明度：公开AI技术的使用方式和范围、诚实地说明AI的能力和局限性、及时披露任何AI相关的安全或隐私问题、积极响应用户对AI系统的关切和建议。'
        },
        {
          title: '11. 联系和反馈',
          content: '如果您对我们的AI系统有任何疑问、担忧或建议，请随时与我们联系。我们重视每一位用户的反馈，这将帮助我们不断改进AI系统的性能和透明度。'
        }
      ]
    },
    en: {
      title: 'AI Transparency Statement',
      lastUpdated: 'Last Updated: January 17, 2025',
      introduction: 'This statement details how Address Translator (hereinafter referred to as "the Service") uses artificial intelligence (AI) technology, and our commitment to AI system transparency, fairness, and security.',
      sections: [
        {
          title: '1. AI System Overview',
          content: 'The Service uses advanced language models provided by Mistral AI for address translation. The AI system analyzes and understands input address text through machine learning algorithms, then generates translation results in the target language. Our AI system is specifically optimized for address formats and geographic location information.'
        },
        {
          title: '2. AI Training Data Sources',
          content: 'Our AI translation model is trained on publicly available multilingual address datasets, geographic information system data, and cleaned address corpora. The training data is carefully filtered to ensure it does not contain personal sensitive information or private data.'
        },
        {
          title: '3. AI Decision Process',
          content: 'When users input addresses, the AI system will: analyze address structure and components, identify geographic location information, understand language and format characteristics, generate translation results that conform to target language conventions. The entire process is based on pattern recognition and language rules, without involving personal judgment or bias.'
        },
        {
          title: '4. Accuracy and Limitations',
          content: 'Although our AI system is carefully trained, translation accuracy may be affected by the following factors: completeness of input addresses, complexity of address formats, specificity of geographic locations, differences in language conventions. We recommend users manually verify important addresses.'
        },
        {
          title: '5. Bias and Fairness',
          content: 'We are committed to ensuring the fairness and unbiased nature of AI systems. Our training data covers multiple countries and regions, striving to avoid geographic, cultural, or language bias. If any biased or discriminatory content is found, please report it to us immediately.'
        },
        {
          title: '6. Data Privacy Protection',
          content: 'The AI processing process fully complies with our privacy policy: all data processing is performed locally on the user\'s device and will not be uploaded to external servers. The AI model only receives necessary text input and will not access user personal information. Translation history is only stored in the local browser.'
        },
        {
          title: '7. Security Measures',
          content: 'We have implemented multiple security measures to ensure the safe use of AI systems: input validation and cleaning to prevent malicious code injection, output filtering to ensure appropriateness of translation results, monitoring abnormal usage patterns to prevent system abuse, regularly updating AI models to fix potential security vulnerabilities.'
        },
        {
          title: '8. User Control',
          content: 'Users have the following controls: can choose not to use AI translation function, can clear locally stored translation history, can choose not to save any translation records, can report AI translation errors or issues to our team.'
        },
        {
          title: '9. Continuous Improvement',
          content: 'We are committed to continuously improving the performance and accuracy of AI systems. We regularly: collect user feedback to optimize translation quality, update training data to enhance AI understanding capabilities, monitor translation results to identify improvement opportunities, collaborate with the AI technology community to adopt best practices.'
        },
        {
          title: '10. Transparency Commitment',
          content: 'We are committed to maintaining high transparency of AI systems: openly disclose the usage methods and scope of AI technology, honestly explain the capabilities and limitations of AI, timely disclose any AI-related security or privacy issues, actively respond to user concerns and suggestions about AI systems.'
        },
        {
          title: '11. Contact and Feedback',
          content: 'If you have any questions, concerns, or suggestions about our AI system, please feel free to contact us. We value feedback from every user, which will help us continuously improve the performance and transparency of AI systems.'
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

export default AITransparency;