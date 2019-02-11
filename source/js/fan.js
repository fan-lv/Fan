(function () {
    /**
     * 内容的宽度为 900 ，侧边栏的宽度为 300
     * 900 的时候不能出现侧边栏
     */
    window.onresize = (e) => {
        let width = e.currentTarget.innerWidth;
        let open = $('#side-button').hasClass('close');
        if (width <= 900) {
            document.documentElement.style.fontSize = width / 7.5 + 'px';
            //设置body字体大小，不影响body内字体大小
            document.body.style.fontSize = '12px';

            $('#menu-inner').addClass('min-menu-inner');

            $('#side-button').hide();
            if (open) {
                $('#sidebar').velocity('stop').velocity({left: '-300px'}, 800, 'spring');
                $('#main-container').velocity('stop').velocity({marginLeft: '0px'}, 800, 'spring');
            }
        } else {
            document.documentElement.style.fontSize = '12px';
            //设置body字体大小，不影响body内字体大小
            document.body.style.fontSize = '12px';

            $('#menu-inner').removeClass('min-menu-inner');

            $('#side-button').show();
            if (open) {
                $('#sidebar').velocity('stop').velocity({left: '0px'}, 800, 'spring');
                $('#main-container').velocity('stop').velocity({marginLeft: '300px'}, 800, 'spring');
            }
        }
    };

    /**
     * 当宽度小于 900 的时候不显示展开侧边栏按钮
     */
    if (window.innerWidth <= 900) {
        document.documentElement.style.fontSize = window.innerWidth / 7.5 + 'px';
        //设置body字体大小，不影响body内字体大小
        document.body.style.fontSize = '12px';

        $('#menu-inner').addClass('min-menu-inner');

        $('#side-button').hide();
    }

    /**
     * @description post 页面展开侧边栏
     * 第一次加载时候判断页面的宽度，如果宽度小则不展开侧边栏
     */
    if (window.innerWidth > 900 && $('#post').length > 0) {
        setTimeout(function () {
            $('#side-button').click();
        }, 500);
    }

    $('.menu-list-icon').click(() => {
        $('#menu-inner').toggleClass('show-min-menu-inner');
    });

})();