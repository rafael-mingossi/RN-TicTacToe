const exclusionList = require("metro-config/src/defaults/exclusionList");
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  };
  config.resolver = {
    ...resolver,
    blacklistRE: exclusionList([/#current-cloud-backend\/.*/]),
  };

  return config;
})();
