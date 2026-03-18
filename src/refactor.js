const fs = require('fs');
const path = require('path');

const srcDir = 'e:/MERN_PROJECTS/New folder (2)/eidisend/src';

const files = [
  'app/error.jsx',
  'app/fun-zone/page.jsx',
  'app/loading.jsx',
  'app/not-found.jsx',
  'app/page.jsx',
  'components/funZone/EidPersonality.jsx',
  'components/funZone/SalamiCalculator.jsx',
  'components/funZone/SurpriseBox.jsx',
  'components/home/CTABanner.jsx',
  'components/home/HeroBanner.jsx',
  'components/home/MotivationGenerator.jsx',
  'components/home/WhySendSalami.jsx',
  'components/notFound/NotFound.jsx',
  'components/shared/Footer.jsx',
  'components/shared/Navbar.jsx'
];

function transformTokens(tokensStr) {
    if (!tokensStr) return tokensStr;

    let tokens = tokensStr.split(/(\s+)/);
    let originalClean = tokens.filter(t => t.trim().length > 0);
    let dirty = false;

    const findMatch = (regexes) => {
        for (let i = 0; i < tokens.length; i++) {
            let t = tokens[i];
            if (t.trim().length === 0) continue;
            let matchedAll = regexes.every(regex => 
               originalClean.some(ct => typeof regex === 'string' ? ct === regex : regex.test(ct))
            );
            if(matchedAll) return true;
        }
        return false;
    };

    const removeMatch = (regex) => {
        for (let i = 0; i < tokens.length; i++) {
            let t = tokens[i].trim();
            if(!t) continue;
            if (typeof regex === 'string' ? t === regex : regex.test(t)) {
                tokens[i] = ''; // remove
                originalClean = originalClean.filter(x => x !== t);
                return; // remove one
            }
        }
    };

    const replacePair = (l, d, repl) => {
        if (findMatch([l, d])) {
            removeMatch(l);
            removeMatch(d);
            tokens.push(' ', repl);
            originalClean.push(repl);
            dirty = true;
        }
    };

    // Backgrounds
    replacePair('bg-[#f0faf4]', 'dark:bg-[#071210]', 'bg-page');
    replacePair('bg-[#071210]', 'dark:bg-[#f0faf4]', 'bg-page');
    replacePair('bg-white', 'dark:bg-[#071210]', 'bg-page');
    replacePair('bg-white', 'dark:bg-[#0d1f16]', 'bg-surface');
    replacePair('bg-white', 'dark:bg-[#0a1a12]', 'bg-overlay');
    replacePair('bg-white', 'dark:bg-[#102318]', 'bg-surface-raised');

    // Texts
    replacePair('text-slate-900', 'dark:text-white', 'text-theme-primary');
    replacePair('text-slate-800', 'dark:text-white', 'text-theme-primary');
    replacePair('text-slate-700', 'dark:text-slate-200', 'text-theme-secondary');
    replacePair('text-slate-600', 'dark:text-slate-300', 'text-theme-secondary');
    replacePair('text-slate-500', 'dark:text-slate-400', 'text-theme-muted');
    replacePair('text-slate-400', 'dark:text-slate-500', 'text-theme-subtle');
    replacePair('text-slate-300', 'dark:text-slate-600', 'text-theme-subtle');
    
    // Other generic texts
    replacePair(/text-slate-\d+/, /dark:text-slate-\d+/, 'text-theme-secondary');
    replacePair(/text-slate-\d+/, 'dark:text-white', 'text-theme-primary');

    // Brands
    replacePair('text-emerald-600', 'dark:text-emerald-400', 'text-brand-theme');
    replacePair('text-emerald-500', 'dark:text-emerald-400', 'text-brand-theme');
    replacePair('text-emerald-700', 'dark:text-emerald-400', 'text-brand-theme');

    // Borders
    replacePair('border-emerald-100', 'dark:border-emerald-900/30', 'border-theme');
    replacePair('border-emerald-100', 'dark:border-emerald-900/40', 'border-theme');
    replacePair('border-emerald-100', 'dark:border-emerald-800/30', 'border-theme');
    replacePair('border-emerald-50', 'dark:border-white/5', 'border-theme');
    replacePair('border-slate-100', 'dark:border-emerald-900/30', 'border-theme');
    replacePair('border-slate-200', 'dark:border-emerald-900/30', 'border-theme');

    // Hover
    replacePair('hover:bg-emerald-50', 'dark:hover:bg-emerald-900/20', 'hover:bg-brand-subtle');
    replacePair('hover:bg-emerald-50', 'dark:hover:bg-emerald-900/25', 'hover:bg-brand-subtle');
    replacePair('hover:bg-slate-50', 'dark:hover:bg-emerald-900/20', 'hover:bg-brand-subtle');

    // Subtle BG
    replacePair('bg-emerald-50', 'dark:bg-emerald-900/30', 'bg-brand-subtle');
    replacePair('bg-emerald-50', 'dark:bg-emerald-900/40', 'bg-brand-subtle');
    replacePair('bg-emerald-50', 'dark:bg-emerald-900/20', 'bg-brand-subtle');
    replacePair('bg-emerald-50/40', 'dark:bg-emerald-900/10', 'bg-brand-subtle');

    // Dividers
    replacePair('bg-emerald-100', 'dark:bg-emerald-900/30', 'bg-brand-subtle');

    if(dirty) {
        return tokens.join('').replace(/\s+/g, ' ');
    }
    return tokensStr;
}

let modifiedCount = 0;

files.forEach(f => {
    let filePath = path.join(srcDir, f);
    let code = fs.readFileSync(filePath, 'utf8');
    
    let result = code.replace(/className=(["'])(.*?)\1|className=\{`(.*?)`\}/gs, (match, q1, c1, c2) => {
        if(c1 !== undefined) {
             return `className=${q1}${transformTokens(c1)}${q1}`;
        } else if (c2 !== undefined) {
             return `className={\`${transformTokens(c2)}\`}`;
        }
        return match;
    });

    if(code !== result) {
        fs.writeFileSync(filePath, result, 'utf8');
        modifiedCount++;
        console.log("Modified", f);
    }
});

console.log("Total modified:", modifiedCount);
