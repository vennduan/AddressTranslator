import { useState } from 'react'
import { ArrowDownUp, Upload, Users } from 'lucide-react'
import TranslationBox from './components/TranslationBox'
import ThemeToggle from './components/ThemeToggle'
import LanguageSwitcher from './components/LanguageSwitcher'
import { ThemeProvider } from './contexts/ThemeContext'
import './index.css'
import Footer from './components/Footer'
import { translations } from './i18n/translations'
import { useLanguage } from './contexts/LanguageContext'
import MetaUpdater from './components/MetaUpdater'

function AppContent() {
  const { language } = useLanguage();
  const t = translations[language];

  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [fromChinese, setFromChinese] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showBatchModal, setShowBatchModal] = useState(false)
  const [showManualModal, setShowManualModal] = useState(false)

  const fetchTranslation = async (address: string) => {
    const url = `https://api.mxai.site/transadd`;
    const translateType = fromChinese ? 'cn2en' : 'en2cn'
    try {
      console.log('Sending request to:', url);
      console.log('Request payload:', { translateType, messages: address });
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({translateType: translateType, messages: address }), 
      });
  
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }
  
      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching translation:', error);
      // 如果是网络错误，提供更友好的错误信息
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
      }
      throw error;
    }
  };

  const handleTranslate = async () => {
    try {
      setLoading(true)
      const data = await fetchTranslation(inputText);

      // 检查响应数据结构
      if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error('Invalid response structure:', data);
        throw new Error('Invalid response structure: ' + JSON.stringify(data));
      }

      // 解析 Mistral AI 返回的 content
      const content = data.choices[0].message.content;

      if (!content) {
        throw new Error('Empty content in response');
      }

      console.log('Raw content:', content);

      // content 可能已经是 JSON 字符串，需要解析
      let jsonString = content.trim();
      
      // 如果包含 Markdown 代码块标记，先去掉
      jsonString = jsonString.replace(/```json\n?/g, '').replace(/\n?```/g, '').trim();

      // 解析 JSON 字符串
      let result;
      try {
        result = JSON.parse(jsonString);
        console.log('Parsed result:', result);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Content that failed to parse:', jsonString);
        throw new Error('Failed to parse JSON response: ' + jsonString);
      }

      // 获取翻译结果
      if (!result || !result.address) {
        console.error('No address field in result:', result);
        throw new Error('No address field in result: ' + JSON.stringify(result));
      }

      const translatedText = result.address;

      // 更新输出文本
      setOutputText(translatedText)
      setLoading(false)
    } catch (error) {
      console.error('Error during translation:', error)
      // 只显示用户友好的错误信息
      setOutputText(t.errors.translationFailed)
      setLoading(false)
    }
  };

  const switchLanguages = () => {
    setFromChinese(!fromChinese)
    setInputText(outputText)
    setOutputText(inputText)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-slate-100 dark:from-black dark:to-zinc-900 p-4 sm:p-8 transition-colors duration-300">
      <MetaUpdater />
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <a
              href="https://afdian.com/a/venns"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Buy Me a Coffee"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6.5 3.5l.5.5v12.5c0 .5.5 1 1 1h9c.6 0 1-.5 1-1V4l.5-.5h2.5c.3 0 .5.2.5.5v.5l-1.5 10c-.1.5-.5.9-1 .9H8.5c-.5 0-.9-.4-1-.9L6 4.5v-.5c0-.3.2-.5.5-.5H9m-2-.5h8l-1 2h-6l-1-2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              <span>Support</span>
            </a>
          </div>

          {/* 语言切换器 */}
          <LanguageSwitcher />

          <ThemeToggle />
        </div>

        <header className="mb-12 text-center">
          <div className="inline-block">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
              {t.app.title}
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full" />
          </div>
          <p className="mt-4 text-slate-600 dark:text-slate-300">{t.app.subtitle}</p>
        </header>

        <div className="bg-white/70 dark:bg-zinc-900/70 rounded-xl shadow-lg border border-slate-200/50 dark:border-zinc-800/50 p-6 backdrop-blur-md transition-all">
          <div className="flex flex-col gap-4">
            <TranslationBox
              value={inputText}
              onChange={setInputText}
              onTranslate={handleTranslate}
              placeholder={fromChinese ? "输入中文地址..." : "Enter English address..."}
              label={fromChinese ? "中文" : "English"}
            />

            <div className="flex justify-center">
              <button
                onClick={switchLanguages}
                className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors group"
                aria-label="Switch languages"
              >
                <ArrowDownUp className="text-slate-600 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
              </button>
            </div>

            <TranslationBox
              value={outputText}
              onChange={setOutputText}
              placeholder={fromChinese ? "English translation..." : "中文翻译..."}
              label={fromChinese ? "English" : "中文"}
              readOnly
              loading={loading}
            />

            {/* 数据处理提示 - 输出框下方 */}
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-center flex items-center justify-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{t.tips.translationTips}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-start">
          <div className="flex gap-3">
            <button
              onClick={() => setShowBatchModal(true)}
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 transition-colors border border-blue-600/20 hover:border-blue-600/40"
            >
              <Upload size={16} />
              <span>{t.buttons.batchTranslate}</span>
            </button>
            <button
              onClick={() => setShowManualModal(true)}
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-purple-600/10 hover:bg-purple-600/20 text-purple-600 dark:text-purple-400 transition-colors border border-purple-600/20 hover:border-purple-600/40"
            >
              <Users size={16} />
              <span>{t.buttons.manualTranslate}</span>
            </button>
          </div>
        </div>

        {/* 批量翻译模态框 */}
        {showBatchModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowBatchModal(false)}>
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
              <div className="text-center">
                <div className="mb-4">
                  <Upload size={48} className="mx-auto text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  {t.modals.batch.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {t.modals.batch.description}
                </p>

                {/* 微信二维码 */}
                <div className="mb-4">
                  <div className="w-32 h-32 mx-auto mb-2">
                    <img
                      src="https://img.cuasedu.org/file/venvo_wechat.png"
                      alt={t.modals.batch.wechat}
                      className="w-full h-full rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t.modals.batch.wechat}
                  </p>
                </div>

                <button
                  onClick={() => setShowBatchModal(false)}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t.buttons.close}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 人工翻译模态框 */}
        {showManualModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowManualModal(false)}>
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
              <div className="text-center">
                <div className="mb-4">
                  <Users size={48} className="mx-auto text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  {t.modals.manual.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {t.modals.manual.description}
                </p>

                {/* 微信二维码 */}
                <div className="mb-4">
                  <div className="w-32 h-32 mx-auto mb-2">
                    <img
                      src="https://img.cuasedu.org/file/venvo_wechat.png"
                      alt={t.modals.manual.wechat}
                      className="w-full h-full rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t.modals.manual.wechat}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    {t.modals.manual.contactInfo}
                  </p>
                </div>

                <button
                  onClick={() => setShowManualModal(false)}
                  className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {t.buttons.close}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
