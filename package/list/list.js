/*
 组件列表 内在灵魂，沉稳坚毅
 生成时间：Sat Dec 17 2016   破门狂人R2-D2为您服务！
 */
define([
    'avalon',
    'text!./list.html',
    'css!./list.css'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "list",
        ready: function (i) {

            vm.reset()
            index.html = html

            //以及其他方法


        },
        reset: function () {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
            })
        },


        list:[
            {
                name:"提示框组件",
                en:"tip"
            },
            {
                name:"模态框",
                en:"modal"
            },
            {
                name:"进度条组件",
                en:"progress"
            },
        ]

    })
    return window[vm.$id] = vm
})