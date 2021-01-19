module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: '> 0.25%, not dead',
        useBuiltIns: 'usage',
        corejs: '3',
        modules: false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];
  const plugins = [
    ['@babel/plugin-transform-async-to-generator'],
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    ['@babel/plugin-transform-arrow-functions'],
  ];

  return {
    plugins,
    presets,
  };
};
