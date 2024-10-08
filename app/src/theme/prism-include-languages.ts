import siteConfig from '@generated/docusaurus.config';
import type * as PrismNamespace from 'prismjs';
import type { Optional } from 'utility-types';

export default function prismIncludeLanguages(
  PrismObject: typeof PrismNamespace,
): void {
  const {
    themeConfig: { prism },
  } = siteConfig;
  const { additionalLanguages } = prism as { additionalLanguages: string[] };

  globalThis.Prism = PrismObject;

  additionalLanguages.forEach((lang) => {
    if (lang === 'php') {
      require('prismjs/components/prism-markup-templating.js');
    }

    try {
      // Try to load built-in PrismJS language components
      require(`prismjs/components/prism-${lang}`);
    } catch (error) {
      // If not found, check for custom languages
      if (lang === 'gdscript') {
        require('./languages/prism-gdscript')(PrismObject);
      } else if (lang === 'rescript') {
        require('./languages/prism-rescript')(PrismObject);
      } else {
        console.warn(`Language '${lang}' not found in PrismJS components.`);
      }
    }
  });

  delete (globalThis as Optional<typeof globalThis, 'Prism'>).Prism;
}
