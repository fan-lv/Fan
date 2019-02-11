(function () {

    /**
     * @description 监听滚动高度，是否显示返回顶部
     */
    function myCustomFn(el) {
        if (el.mcs.top < -600) {
            if ($('#return-top').css('opacity') === '0') {
                $('#return-top').velocity('stop').velocity({opacity: 1}, {
                    duration: 500,
                    display: 'block'
                });
            }
        } else {
            $('#return-top').velocity('stop').velocity({opacity: 0}, {
                duration: 500,
                display: 'none'
            });
        }
    }

    /**
     * @description 阅读进度
     * @param el
     */
    function readPercent(el) {
        // console.log(el.mcs.content[0].offsetHeight);
        let percent = Math.round(-el.mcs.top / (el.mcs.content[0].offsetHeight - el.offsetHeight) * 100);
        $('.sidebar-toc-progress .progress-num').text(percent);
        $('.sidebar-toc-progress-bar').velocity('stop').velocity({width: percent + '%'}, {
            duration: 100,
            easing: 'easeInOutQuart'
        });
    }

    /**
     * @description 滚动到页面顶部
     */
    $('#return-top').on('click', function () {
        $('#content-outer').mCustomScrollbar('scrollTo', 'top', {
            scrollInertia: 1000,
            scrollEasing: 'easeInOut'
        });
    });

    /**
     * @description 滚动条修饰 - jquery 插件
     */
    $('#content-outer').mCustomScrollbar({
        theme: 'minimal',
        axis: 'y', // horizontal scrollbar
        callbacks: {
            whileScrolling: function () {
                myCustomFn(this);
                readPercent(this);
                findHeadPosition(this);
            },
            onScroll: function () {

            }
        }
    });
    $('#sidebar-toc-content').mCustomScrollbar({
        theme: 'minimal',
        axis: 'y', // horizontal scrollbar
        callbacks: {}
    });

    // $('figure.highlight').mCustomScrollbar({
    //     theme: 'minimal',
    //     axis: 'x', // horizontal scrollbar
    //     mouseWheel: {
    //         enable: false
    //     },
    //     callbacks: {}
    // });

    /**
     * @description menu link scroll to content
     */
    $('.sidebar-toc-content .toc-link').on('click', function (e) {
        e.preventDefault();
        let _id = $(this).attr('href');
        $('#content-outer').mCustomScrollbar('scrollTo', _id, {
            scrollInertia: 500
        });
    });

    /**
     * @description 找到当前页面的位置，更改 active 目录
     * @param el
     */
    function findHeadPosition(el) {
        let currentId = '';
        const menuHeight = $('#menu-outer').height() + 1;
        // console.log(el.mcs);
        let list = $('#post').find('h1,h2,h3,h4,h5,h6');
        list.each(function () {
            if ($(this).offset().top <= menuHeight) {
                currentId = $(this).attr('id');
            }
        });
        $('.sidebar-toc-content .toc-link').removeClass('active');
        if (currentId === '') {
            // currentId = list[0].id;
            return;
        }
        let $this = $('.sidebar-toc-content .toc-link[href="#' + currentId + '"]');
        $this.addClass('active');
        let parents = $this.parents('.toc-child');
        if (parents.length > 0) {
            let child = null;
            parents.length > 1 ? child = parents.eq(parents.length - 1).find('.toc-child') : child = parents;
            if (child.length > 0 && child.is(':hidden')) {
                expandToc(child);
            }
            parents.eq(parents.length - 1).closest('.toc-item').siblings('.toc-item').find('.toc-child').hide();
        } else {
            if ($this.closest('.toc-item').find('.toc-child').is(':hidden')) {
                expandToc($this.closest('.toc-item').find('.toc-child'));
            }
            $this.closest('.toc-item').siblings('.toc-item').find('.toc-child').hide();
        }
    }

    /**
     * @description expand toc-item
     * @param $item
     */
    function expandToc($item) {
        // $item.show();
        $item.velocity('stop').velocity('fadeIn', {
            duration: 500,
            easing: 'easeInQuart'
        });
    }
}());