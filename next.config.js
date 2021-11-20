// https://github.com/vercel/next.js/blob/f0809316eec7eea09781a71cf514c0bacee4d7d2/packages/next/build/webpack/config/blocks/css/loaders/getCssModuleLocalIdent.ts
// Do not tamper with class names
function getCssModuleLocalIdent(_, __, exportName) {
    return exportName;
}

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    webpack(config) {
        const moduleLoader = config.module.rules
            .filter(rule => {
                return rule.oneOf && rule.oneOf.find(rule => rule.test.toString() === '/\\.module\\.css$/');
            })[0].oneOf
            .find(rule => {
                return rule.test.toString() === '/\\.module\\.css$/';
            });
        const cssLoader = moduleLoader.use.find(loader => {
            return loader.loader.includes('\\css-loader\\');
        });

        cssLoader.options.modules.getLocalIdent = getCssModuleLocalIdent;

        return config;
    }
};
