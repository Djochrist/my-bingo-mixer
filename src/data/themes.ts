export interface QuestionTheme {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  /** CSS custom property values for visual theming */
  css: {
    /* dark heading gradient */
    headA: string; headB: string; headC: string;
    /* light heading gradient */
    headLA: string; headLB: string; headLC: string;
    /* button / glow primary */
    accentA: string; accentB: string; accentMid: string;
    /* RGB channels for rgba() usage */
    accentRGB: string;
    /* card deck card colour strip */
    cardFrom: string; cardTo: string;
    /* marked-square highlight (semi-transparent) */
    markBg: string; markBorder: string;
  };
  questions: string[];
}

export const themes: QuestionTheme[] = [
  {
    id: 'tech',
    name: 'Tech & Dev',
    emoji: '💻',
    description: 'For developers and engineers',
    color: 'from-violet-500 to-cyan-500',
    css: {
      headA: '#c4b5fd', headB: '#a78bfa', headC: '#22d3ee',
      headLA: '#5b21b6', headLB: '#7c3aed', headLC: '#0891b2',
      accentA: '#7c3aed', accentMid: '#6366f1', accentB: '#22d3ee',
      accentRGB: '124,58,237',
      cardFrom: '#7c3aed', cardTo: '#22d3ee',
      markBg: 'rgba(124,58,237,0.18)', markBorder: 'rgba(124,58,237,0.45)',
    },
    questions: [
      'uses VS Code',
      'has multiple monitors',
      'drinks coffee while coding',
      'has a GitHub account',
      'prefers dark mode',
      'owns a mechanical keyboard',
      'listens to music while coding',
      'has a rubber duck for debugging',
      'uses keyboard shortcuts daily',
      'has customized their IDE or terminal',
      'has shipped a production bug',
      'debugged code at 3 AM',
      'mentors junior developers',
      'built something in a weekend',
      'contributes to open source',
      'knows more than 3 programming languages',
      'has pair programmed before',
      'built a project they\'re proud of',
      'has given a tech talk or presentation',
      'names their side projects like pets',
      'has a home lab or local server setup',
      'has done a career pivot into tech',
      'uses vim or emacs',
      'has forgotten a semicolon today',
      'reads the docs before asking Google',
    ],
  },
  {
    id: 'social',
    name: 'Social Mixer',
    emoji: '🎉',
    description: 'Great for any social event',
    color: 'from-pink-500 to-orange-400',
    css: {
      headA: '#fda4af', headB: '#fb7185', headC: '#fb923c',
      headLA: '#be123c', headLB: '#e11d48', headLC: '#c2410c',
      accentA: '#ec4899', accentMid: '#f43f5e', accentB: '#f97316',
      accentRGB: '236,72,153',
      cardFrom: '#ec4899', cardTo: '#fb923c',
      markBg: 'rgba(236,72,153,0.16)', markBorder: 'rgba(236,72,153,0.45)',
    },
    questions: [
      'has traveled to 3+ countries',
      'speaks more than one language',
      'is the eldest sibling',
      'has a pet',
      'loves cooking at home',
      'prefers mornings over evenings',
      'has run a 5K or more',
      'plays a musical instrument',
      'has lived in another city',
      'is a coffee lover',
      'binge-watched a show in one day',
      'has a hidden talent',
      'loves karaoke',
      'has met someone famous',
      'prefers tea over coffee',
      'has gone camping recently',
      'is a night owl',
      'has tried extreme sports',
      'loves board games',
      'has a bucket-list destination',
      'can juggle (literally)',
      'loves sushi',
      'has read 5+ books this year',
      'has a nickname',
      'grew up in a small town',
    ],
  },
  {
    id: 'corporate',
    name: 'Corporate',
    emoji: '🏢',
    description: 'For workplace events & team building',
    color: 'from-blue-600 to-indigo-500',
    css: {
      headA: '#93c5fd', headB: '#60a5fa', headC: '#a5b4fc',
      headLA: '#1d4ed8', headLB: '#2563eb', headLC: '#4338ca',
      accentA: '#2563eb', accentMid: '#4f46e5', accentB: '#818cf8',
      accentRGB: '59,130,246',
      cardFrom: '#1d4ed8', cardTo: '#4f46e5',
      markBg: 'rgba(59,130,246,0.16)', markBorder: 'rgba(99,102,241,0.45)',
    },
    questions: [
      'has worked remotely for 1+ year',
      'has a standing desk',
      'takes lunch away from the screen',
      'has completed an online course this year',
      'has led a meeting this week',
      'uses a planner or to-do app',
      'has presented to an executive',
      'mentors someone at work',
      'has changed companies twice or more',
      'loves whiteboard sessions',
      'drinks water instead of soda at work',
      'has a side hustle',
      'uses a second screen at home',
      'has given feedback in writing',
      'attends optional team events',
      'has onboarded a new hire',
      'takes notes by hand',
      'has a 5-year career plan',
      'volunteers outside of work',
      'has worked in two industries',
      'meditates or exercises before work',
      'has a morning routine',
      'celebrates team wins publicly',
      'documents their work thoroughly',
      'has read a business book this year',
    ],
  },
  {
    id: 'popculture',
    name: 'Pop Culture',
    emoji: '🎬',
    description: 'Movies, games, music & more',
    color: 'from-amber-400 to-rose-500',
    css: {
      headA: '#fde68a', headB: '#fbbf24', headC: '#fb923c',
      headLA: '#92400e', headLB: '#b45309', headLC: '#c2410c',
      accentA: '#d97706', accentMid: '#f97316', accentB: '#ef4444',
      accentRGB: '245,158,11',
      cardFrom: '#d97706', cardTo: '#ef4444',
      markBg: 'rgba(245,158,11,0.16)', markBorder: 'rgba(251,146,60,0.45)',
    },
    questions: [
      'has seen the latest Marvel film',
      'plays video games weekly',
      'listens to a podcast daily',
      'knows all words to a song right now',
      'has rewatched a series twice',
      'follows an esports team',
      'grew up with Harry Potter',
      'has a favourite villain',
      'quotes movies in daily life',
      'has been to a concert this year',
      'watches anime',
      'has a gaming console at home',
      'uses social media daily',
      'has danced at a party recently',
      'can name 3 Tarantino films',
      'has a comfort TV show',
      'loves a movie others haven\'t heard of',
      'follows a streamer on Twitch/YouTube',
      'has played a Nintendo game',
      'knows the Game of Thrones plot',
      'has a favourite decade for music',
      'has cosplayed or dressed up',
      'can name a 90s cartoon theme song',
      'has been to a film premiere or festival',
      'reads webcomics or graphic novels',
    ],
  },
];

export function getThemeById(id: string): QuestionTheme {
  return themes.find((t) => t.id === id) ?? themes[0];
}
