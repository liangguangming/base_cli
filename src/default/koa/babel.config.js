const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        node: 'current',
      },
      useBuiltIns: 'usage',
    },
  ],
];

const plugins = [];

module.exports = {
  presets,
  plugins,
};
