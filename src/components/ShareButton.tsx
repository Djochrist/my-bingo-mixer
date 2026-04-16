import { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { getThemeById } from '../data/themes';
import { useColorMode } from '../context/ThemeContext';

interface ShareButtonProps {
  playerName: string;
  themeId: string;
  markedCount: number;
}

export function ShareButton({ playerName, themeId, markedCount }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const { colorMode } = useColorMode();
  const theme = getThemeById(themeId);

  const shareText = `I just got BINGO on Bingo Mixer! Theme: ${theme.name} — ${markedCount} squares marked. Try it at bingomixer.app`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'I got BINGO!', text: shareText, url: window.location.href });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
        copied
          ? colorMode === 'dark'
            ? 'border-emerald-400/40 bg-emerald-500/12 text-emerald-300'
            : 'border-emerald-400 bg-emerald-50 text-emerald-700'
          : colorMode === 'dark'
            ? 'border-cyan-500/28 bg-cyan-500/8 text-cyan-300 hover:bg-cyan-500/18 hover:border-cyan-400/45'
            : 'border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-400'
      }`}
    >
      {copied ? (
        <><Check className="w-3 h-3" strokeWidth={2.5} />Copied</>
      ) : (
        <><Share2 className="w-3 h-3" strokeWidth={2.5} />Share</>
      )}
    </button>
  );
}
