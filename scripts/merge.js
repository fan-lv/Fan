/**
 * created by lvfan
 * 2018-08-31
 */
/**
 * Note: configs in _data/fan.yml will replace configs in hexo.theme.config.
 */
hexo.on('generateBefore', function () {
    if (hexo.locals.get) {
        var data = hexo.locals.get('data') // 获取_data文件夹下的内容
        data && data.fan && (hexo.theme.config = data.fan) // 如果fan.yml 存在，就把内容替换掉主题的config
    }
})