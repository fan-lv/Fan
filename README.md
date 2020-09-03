<h1 align="center">Fan</h1>
<p align="center">这是一个深色主题，如梦幻般的星空，群星闪烁。</p>
<p align="center"><a href="https://lv-fan.gitee.io/"><b>Preview</b></a></p>

## Install

```
git clone https://github.com/fan-lv/Fan.git themes/Fan
```
修改位于博客根目录下的 `_config.yml` 内的 `theme` 选项值为 `Fan`

## Update

```
cd themes/Fan
git pull
```

## Required packages

- hexo-renderer-jade
- hexo-renderer-stylus

若报错 `extends includes/layout.pug block content include includes/recent-posts.pug include includes/pagination.pug`

安装依赖包，重新生成
```
npm install --save hexo-renderer-jade hexo-renderer-stylus
```

> Notes: 有说 `hexo-renderer-jade` 包过期的，可以用 `hexo-renderer-pug`

其他扩展依赖包参考
```
npm install --save hexo-generator-feed hexo-generator-sitemap hexo-generator-archive hexo-browsersync
```

## Questions
- 若报错 `layout\includes\config.pug:1`, `Cannot read property 'appId' of undefined`, 需要把 `themes` -> `_config.yml` 中 `algolia_search:enable` 改成 `false`

## Feature
### Top article

支持文章置顶功能，在需要置顶的文章（Markdown 文件）加入 `top: 1`，数值越大越靠前。

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

### Comments
目前支持 [Gitment](https://github.com/imsun/gitment)、[Valine](https://valine.js.org/) 评论。

使用方法：
1. 在根目录下 `_config.yml` 文件中加入以下代码，`["gitment", "valine"]` 配置自行选择一个，第二步中选择使用哪个
    ```
    comments:
      gitment:
        enable: true
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
 
2. `themes` -> `_config.yml` 中可以开启或关闭 `comments`，并且通过 `type` 指定使用的评论插件
    ```
    # 评论
    comments:
      enable: true
      # 使用哪种评论插件["gitment", "valine"]
      type: "valine"
    ```

### Algolia_search

1. 注册 [Algolia账户](https://www.algolia.com/users/sign_in)，创建新的 Index，记下 `index name`

2. 安装扩展
    ```
    npm install hexo-algolia --save
    ```

3. 修改 Algolia 搜索 ACL（访问控制列表）
    默认的 `Search-Only API Key` 不能修改，需要在 `All API Keys` -> `New API Key`

    勾选 ACLs: `search` `addObject` `deleteObject` `listIndexes` `deletelndex`
    
    执行安装
    ```
    export HEXO_ALGOLIA_INDEXING_KEY=New API Key
    hexo algolia
    ```
    > Notes: Mac 和 git bash 为 `export`, Windows 为 `set`, Powershell 用 `$env`
 
4. 获取 Key，更新站点根目录配置
    ```
    algolia:
      applicationID: 'Application ID'
      apiKey: 'New API Key'
      indexName: 'index name'
    ```

5. 主题配置下开启 Algolia_search
    ```
    algolia_search:
      enable: true
      hits:
        per_page: 10
    ```
    > 注意，每次更新文章后记得执行 `hexo algolia` 更新索引。

<img width='999' src='https://lvfan.xyz/blog_demo.png' alt='主题预览图'>

## License
[MIT](https://opensource.org/licenses/MIT)

