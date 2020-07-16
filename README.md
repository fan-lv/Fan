<h1 align="center">Fan</h1>
<p align="center">这是一个深色主题，如梦幻般的星空，群星闪烁。</p>


[Preview](https://www.lvfan.xyz/)   

<!-- <img width='999' src='https://lvfan.xyz/blog_demo.png' alt='主题预览图'> -->

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

## 补充说明
### 文章置顶
支持文章置顶功能，在需要置顶的文章（Markdown 文件）加入 top: 1，数值越大越靠前。

如：
```
title: xxx
author: xxx
tags:
  - xxx
categories:
  - xxx
date: xxx
top: 1
```

### 评论功能
目前支持 [Gitment](https://github.com/imsun/gitment) 、[Valine](https://valine.js.org/)评论。

使用方法：
1. 在 config 文件中加入以下代码，['gitment', 'valine'] 配置可以自行选择一个，第二步中选择使用哪个
    ```
    comments:
      gitment:
        owner: 'Your GitHub ID'
        repo: 'The repository to store your comments. Make sure you're repo's owner'
        client_id: 'GitHub client ID'
        client_secret: 'GitHub client secret'
      # 可以自由配置 valine 的其他配置项
      valine:
        appId: 'Your appId'
        appKey: 'Your appKey'
        placeholder: 'xxx'
        ...(valine配置项，参考链接 https://valine.js.org/configuration.html)
    ```
2. themes->_config.yml 中可以开启或关闭 comments，并且通过 type 指定使用的评论插件
    ```
    # 评论
    comments:
        enable: true
        # 使用哪种评论插件["gitment", "valine"]
        type: "valine"
    ```

## License
[MIT](https://opensource.org/licenses/MIT)

