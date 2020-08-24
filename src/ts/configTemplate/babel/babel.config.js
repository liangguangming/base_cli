const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        node: 'current',
      },
      useBuiltIns: 'usage',
    },
  ], [
    '@babel/preset-typescript',
  ],
];

const plugins = [];

module.exports = {
  presets,
  plugins,
};
