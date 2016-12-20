/*
 组件详情 内在灵魂，沉稳坚毅
 生成时间：Sat Dec 17 2016   破门狂人R2-D2为您服务！
 */
define([
    'avalon',
    'text!./details.html',
    'css!./details.css',
    '../../src/js/markdown.js',
    '../../src/js/prettify.js',
], function (avalon, html, css,marked,prettify) {
    var vm = avalon.define({
        $id: "details",
        ready: function (i) {


            vm.reset(i)
            index.html = html

            require(['./package/list/list.js'], function (obj) {
              vm.list=obj.list
            })

            vm.getDemo(i)
            vm.getDoc(i)
        },
        list:[],
        reset: function (i) {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                demo:'',
                doc:'',
            })
        },

        demo:'',
        getDemo: function (i) {
            require(['text!./lib/'+i+'/demo.html'], function (that) {
                vm.demo=that
            })
        },
        doc:'',
        getDoc: function (i) {
            require(['text!./lib'+i+'/readme.md'], function (that) {
                vm.doc=marked(that)
            })
        }

    })
    return window[vm.$id] = vm
})