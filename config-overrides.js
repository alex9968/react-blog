  /* config-overrides.js */
  /*
  * @Author: mzhang.eric 
  * @Last Modified time: 2019-01-10 18:37:17
  * @Description: 使用 react-app-rewired 扩展和改造 CRA v2.1.1 项目, 基于 webpack v4.19.1  + react-app-rewired v1.6.2 版本
  */

  const rewireLess = require('react-app-rewire-less');
  const { injectBabelPlugin, paths } = require('react-app-rewired');
  // const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

  module.exports = function override(config, env) {

    // 使用 babel-plugin-import 按需加载组件
    config = injectBabelPlugin(
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
      config,
    );

    // 增加 less 支持
    config = rewireLess.withLoaderOptions({
      // 解决报错: Inline JavaScript is not enabled. Is it set in your options?
      javascriptEnabled: true,
    })(config, env);

    // 设置别名路径
    config.resolve.alias = {
      ...config.resolve.alias,
      '/': paths.appSrc, // 在使用中有些 Eslint 规则会报错, 禁用这部分代码的 Eslint 检测即可
    };

    // // 处理 html 文档中图片路径问题
    // config.module.rules[2].oneOf.push({
    //   test: /\.html$/,
    //   loader: 'html-withimg-loader'
    // });

    

    return config;
  };
