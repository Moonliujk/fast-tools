import { parse } from 'node-html-parser';
import { Compilation, Compiler } from 'webpack';
import { generateDomains } from '../utils/utils';

type PreconnectOptions = {
  customDomains?: string[] | string;
  ignoreDomains?: string[] | string;
};

export class PreconnectTools {
  customDomains: string[];
  ignoreDomains: string[];
  constructor(options: PreconnectOptions) {
    const { customDomains = [], ignoreDomains = [] } = options;
    this.customDomains =
      typeof customDomains === 'string' ? [customDomains] : customDomains;
    this.ignoreDomains =
      typeof ignoreDomains === 'string' ? [ignoreDomains] : ignoreDomains;
  }
  apply(compiler: Compiler) {
    const pluginName = PreconnectTools.name;
    const { webpack } = compiler;
    const { Compilation } = webpack;
    const { RawSource } = webpack.sources;

    compiler.hooks.thisCompilation.tap(
      pluginName,
      (compilation: Compilation) => {
        compilation.hooks.processAssets.tap(
          {
            name: pluginName,
            stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
          },
          (assets) => {
            for (const [fileName, asset] of Object.entries(assets)) {
              if (/\.html?$/.test(fileName)) {
                const html = asset.source() as string;
                const root = this.generateRoot(html);
                compilation.updateAsset(
                  fileName,
                  new RawSource(root.toString())
                );
              }
            }
          }
        );
      }
    );
  }

  // insert link tags into the head tag
  generateRoot(html: string) {
    const root = parse(html);
    const head = root.querySelector('head');
    const domains = generateDomains(
      html,
      this.customDomains,
      this.ignoreDomains
    );
    const linkTags = domains.reduce((acc, cur) => {
      return (
        acc +
        `<link rel="dns-prefetch" href="${cur}"/><link rel="preconnect" href="${cur}"/>`
      );
    }, '');
    head?.insertAdjacentHTML('afterbegin', linkTags);
    return root;
  }
}
