/*
 {{name}} 内在灵魂，沉稳坚毅
 生成时间：{{date}}   破门狂人R2-D2为您服务！


 ！！！所有被注释掉的代码都需要在如果列表有筛选的情况下根据实际需要修改后打开！！！


 */
define('{{en}}',[
    'avalon',
    'text!../../package/{{en}}/{{en}}.html',
    'css!../../package/{{en}}/{{en}}.css',
    '../../lib/pager/pager.js'
], function (avalon, html, css) {
    var vm=avalon.define({
        $id:"{{en}}",
        ready: function (i) {
            var obj='{{obj}}'
            if(obj!=""){
                require(['../../obj/Management/'+obj+'.js'], function () {
                    start()
                })
            }else{
                start()
            }

            function start(){
                //解析参数
                /*
                 * 可能的参数格式:P&&keywords&&status[]
                 * 例如：1&&keywords&&1_2_3
                 * */
                var params = String(i).split("&&")
                //置入参数


                vm.reset(params);


                index.html = html;

                vm.search(vm.P)

                //todo 如果有搜索，按需打开
                //vm.$watch('w.*', function () {
                //    clearTimeout(vm.timeout)
                //    vm.timeout = setTimeout(function () {
                //        goto('#!/DietList/' + vm.buildParams(vm.P, vm.w.Keywords, vm.w.Target))
                //    }, 300)
                //})
            }


        },
        reset: function (params) {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                P: params[0],
                //todo 如果有跟多条件，按需打开
                //w: {
                //    Keywords: params[1],
                //    Target:params[2].split("_")
                //}
            })

            //todo 如果需要用到select组件，按需打开
            //setTimeout(function () {
            //    var target=params[2].split("_")
            //    if(target[0]==''){
            //        return
            //    }
            //    ForEach(target, function (el) {
            //        selectDL.list[el-1].checked=true
            //    })
            //},500)


        },
        buildParams: function (p, k, t) {
            var params = []
            params.push(p)
            //todo 如果有更多变量，按需打开
            //params.push(k)
            //params.push(t.join("_"))
            //return params.join("&&")
        },
        P: 1,
        N: 5,
        T: 150,
        $pager: {
            id: "{{en}}Pager",
            N: 5,
            showPage: 6,//显示多少页
            getList: function (p) {
                goto('#!/{{en}}/' + vm.buildParams(p))
            }
        },

        list: [],
        search: function (p) {
            var data = {
                P: p,
                N: vm.N,
                //Keywords: vm.w.Keywords,
                //W: {
                //    Target: vm.w.Target
                //}
            }
            //if(data.W.Target[0]==""){
            //    data.W.Target=[1,2,3]
            //}

            //验证搜索条件的变化
            //if (data.Keywords != vm.$old_w.Keywords) {
            //    data.P = 1
            //}
            //if (data.W.Target.join(',') != vm.$old_w.W.Target.join(',')) {
            //    data.P = 1
            //}
            var obj="{{obj}}"
            require(['../../obj/Management/'+obj+'.js'],function (obj){
                obj.search(data, {
                    success: function (res) {
                        //假设没有数据，重置各种东西
                        avalon.mix({{en}}Pager, {
                            T: 0,
                            P: vm.P
                        });
                        {{en}}Pager.build(vm.P)
                        vm.list = []

                        //填充返回数据
                        vm.list = res.L
                        vm.P = res.P
                        avalon.mix({{en}}Pager, {
                            T: res.T,
                            P: res.P
                        });
                        {{en}}Pager.build(res.P)
                    }
                })
            })



            //vm.$old_w = {
            //    Keywords: data.Keywords,
            //    W: data.W
            //}

        },
        //$old_w: {
        //    Keywords: '',
        //    W: {Target: []}
        //},

    })
    return window[vm.$id]=vm
})