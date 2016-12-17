/*
 {{en}} 内在灵魂，沉稳坚毅
 生成时间：{{date}}   破门狂人R2-D2为您服务！
 */
define('{{en}}',[
    'avalon',
    'text!../../lib/{{en}}/{{en}}.html',
    'css!../../lib/{{en}}/{{en}}.css'
], function (avalon, html, css) {
    avalon.component('tsy:{{lowerEn}}', {
        $template: html,
        id:"",
        /*
        * ***************参数队列区**************************/



        /*
         * ***************函数空位**************************/




        /*
         * ***************自启动项目**************************/
        $init: function (vm, elem) {
            //主动读取配置
            var elem = avalon(elem)
            //将参数放入对于的地方
            try {
                if(elem.data('lv')!=undefined){
                    //vm.lv = elem.data('lv')
                    //todo 改写上方的'lv'为你想要获取到的值
                }
            } catch (err) {
            }

            if(vm.id!=""){
                window[vm.id]=vm
            }
        },
        $ready: function (vm, elem) {
            vm.build()
        },


    })
})