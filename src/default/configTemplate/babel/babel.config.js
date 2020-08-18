const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        node: 'current',
        esmodules: true,
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
