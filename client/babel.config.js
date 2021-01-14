module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          edge: '17',
          firefox: '60',
          chrome: '58',
          safari: '11.1',
          ie: '11',
        },
        useBuiltIns: 'usage',
        corejs: '3',
        modules: 'cjs',
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
