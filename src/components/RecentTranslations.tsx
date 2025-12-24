type Translation = {
  input: string;
  output: string;
  fromChinese: boolean;
  timestamp: number;
}

interface RecentTranslationsProps {
  translations: Translation[];
  onSelect: (translation: Translation) => void;
}

function RecentTranslations({ translations, onSelect }: RecentTranslationsProps) {
  if (translations.length === 0) {
    return (
      <div className="mt-4 p-4 bg-white dark:bg-zinc-900 rounded-lg border border-slate-200 dark:border-zinc-800 text-center text-slate-600 dark:text-slate-400">
        No recent translations
      </div>
    )
  }

  return (
    <div className="mt-4 bg-white dark:bg-zinc-900 rounded-lg border border-slate-200 dark:border-zinc-800 divide-y divide-slate-200 dark:divide-zinc-800 overflow-hidden shadow-sm">
      {translations.map((translation, index) => (
        <button
          key={index}
          onClick={() => onSelect(translation)}
          className="w-full p-4 text-left hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
        >
          <div className="flex justify-between items-start mb-1">
            <span className="text-sm font-medium text-slate-900 dark:text-slate-200">
              {translation.fromChinese ? '中文 → English' : 'English → 中文'}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {new Date(translation.timestamp).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-1">{translation.input}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{translation.output}</p>
        </button>
      ))}
    </div>
  )
}

export default RecentTranslations
