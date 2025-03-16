// https://vitejs.dev/config/
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// svg 图标插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// mock 插件
import { viteMockServe } from 'vite-plugin-mock';

export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),

      // svg 图标自动引入
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], // 指定 icon 文件夹
        symbolId: 'icon-[dir]-[name]', // symbolId 格式
      }),

      // mock 服务插件
      viteMockServe({
        localEnabled: command === 'serve', // 只在 dev 开启
      }),
    ],

    // 路径别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // 使用绝对路径更稳妥
      },
    },

    // scss 全局变量配置（重点）
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variable.scss" as *;`, // 全局注入，自动引入变量
        },
      },
    },

    // 你可以根据需要开启这个
    // server: {
    //   port: 3000,
    //   open: true,
    // },
  };
});
