<h1 align="center">Fan</h1>
<p align="center">这是一个深色主题，如梦幻般的星空，群星闪烁。</p>


[Preview](https://www.lvfan.xyz/)   

## 安装

```
git clone https://github.com/fan-lv/Fan.git themes/Fan
```
修改位于博客根目录下的<code>_config.yml</code>内的<code>theme</code>选项值为<code>Fan</code>

## 更新

```
cd themes/Fan
git pull
```

## 需要的依赖包

- hexo-renderer-jade
- hexo-renderer-stylus

## 问题
- 如果报错 appId undefined,需要把 themes->_config.yml 中 algolia_search:enable 改成 false

## 说明
- 支持文章置顶功能，在需要置顶的文章加入 top: 1，数值越大越靠前。

## License
[MIT](https://opensource.org/licenses/MIT)

