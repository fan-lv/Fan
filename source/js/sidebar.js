(function() {
    /**
     * @description 侧边栏展开/隐藏
     * @let open true -展开状态; false -收缩状态
     */
    $('#side-button').on('click', function() {
        let open = $('#side-button').hasClass('close');
        if (open) {
            $('#side-button').removeClass('close');
            $('#sidebar').velocity('stop').velocity({ left: '-300px' }, 800, 'spring');
            $('#main-container').velocity('stop').velocity({ marginLeft: '0px' }, 800, 'spring');
        } else {
            $('#side-button').addClass('close');
            $('#sidebar').velocity('stop').velocity({ left: '0px' }, 800, 'spring');
            $('#main-container').velocity('stop').velocity({ marginLeft: '300px' }, 800, 'spring');
        }
    });

    /**
     * @description 文章详情页面侧边栏切换文章与概览
     */
    $('.toggle-sidebar-info span').on('click', function() {
        let toggleText = $(this).attr('data-toggle');
        $(this).attr('data-toggle', $(this).text());
        $(this).text(toggleText);
        if ($('#sidebar .author-info').is(':visible')) {
            $('#sidebar .author-info').velocity('stop').velocity({
                left: '80px',
                opacity: 0
            }, {
                duration: 300,
                display: 'none',
                easing: 'ease-in',
                complete: function() {
                    $('#sidebar .sidebar-toc').velocity('stop').velocity({
                        opacity: 1,
                        left: 0
                    }, {
                        duration: 500,
                        display: 'block',
                        easing: 'ease-out'
                    });
                }
            });
        } else {
            $('#sidebar .sidebar-toc').velocity('stop').velocity({
                opacity: 0,
                left: '-80px'
            }, {
                duration: 300,
                display: 'none',
                easing: 'ease-in',
                complete: function() {
                    $('#sidebar .author-info').velocity('stop').velocity({
                        left: '0px',
                        opacity: 1
                    }, {
                        duration: 500,
                        display: 'flex',
                        easing: 'ease-out'
                    });
                }
            });
        }
        // let left = $('#sidebar .sidebar-toc').css('left');
        // if (left === '0px') {
        //     $('#sidebar .sidebar-toc').velocity('stop').velocity({
        //         left: '-80px',
        //         opacity: '0'
        //     }, {
        //         duration: 300,
        //         easing: 'easeInQuart',
        //         display: 'none',
        //         component: function () {
        //             $('#sidebar .author-info').velocity('stop').velocity({
        //                 left: '0px',
        //                 opacity: '1'
        //             }, {
        //                 duration: 300,
        //                 easing: 'easeOutQuart',
        //                 display: 'flex'
        //             });
        //         }
        //     });
        // } else {
        //     $('#sidebar .author-info').velocity('stop').velocity({
        //         left: '80px',
        //         opacity: '0'
        //     }, {
        //         duration: 300,
        //         easing: 'easeInQuart',
        //         display: 'none',
        //         component: function () {
        //             $('#sidebar .sidebar-toc').velocity('stop').velocity({
        //                 left: '0px',
        //                 opacity: '1'
        //             }, {
        //                 duration: 300,
        //                 easing: 'easeOutQuart',
        //                 display: 'block'
        //             });
        //         }
        //     });
        // }
    });
    /** 
     * @description 为toc-link添加URI解码，适配Hexo 5.0.0+
     */
    var list = document.getElementsByClassName('toc-link');
    for (var i in list) {
        if (list.hasOwnProperty(i)) {
            var tochref = decodeURI(list[i].getAttribute('href'));
            list[i].href = tochref;
        }
    }
}());