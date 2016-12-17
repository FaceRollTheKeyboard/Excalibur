/**
 * Created by mooshroom on 2016/4/15.
 */
mui.plusReady(function () {
    var vm={
        wsMuiUrl:'',
        init: function (url) {
            vm.waitList=[]
            vm.wsMuiUrl=url
            window.addEventListener('wsCall',function(evt){
                //通过event.detail可获得传递过来的参数内容
                var res = evt.detail

                var mmid = "m" + res.m
                //缓存s
                if(res.c=='m'||res.c=="p"){
                    try{
                        cache.go({
                            sid:res.s
                        })
                    }catch(err){
                        console.log(err)
                    }

                }


                //判断回调
                if (res.c == "t") {
                    //这次是桥派来送mid的
                    //绑定mid的回调函数
                    try {
                        vm.mF[mmid] = vm.tF[res.t]
                        vm.tF[res.t] = null
                    }
                    catch (err) {
                        console.log(err)
                    }

                }
                else if (res.c == "m") {
                    //这次是服务器派来送数据的
                    if (typeof vm.mF[mmid] == "function") {
                        //执行回调
                        var data = res.d
                        if(data==null){
                            data={}
                        }
                        if (data.err && data.code == 1) {
                            //TODO 错误提示
                            //tip.on(data.err);
                            console.log("【接口调用错误】" + res.i + ":" + data.err)
                        }
                        vm.mF[mmid](data)
//                        console.log(res.d)
                        //一分钟之后清除回调函数,腾出内存空间
                        setTimeout(function () {
                            vm.mF[mmid] = null
                        }, 60000)
                    }
                    else {
                        console.log("mid丢失:" + res)
                    }
                }
                else if (res.c == "p") {
                    //这次是服务器直接推送的
                    if (typeof vm.todo[res.i] == "function") {
                        vm.todo[res.i](res.d)
                    }
                    else {
                        console.log('没有充分的准备来应对服务器的未知指令')
                    }

                }
                else {
                    //还不知道这家伙是用来干嘛的
                    console.log("未知的c:" + res.c)
                }

                if (vm.debug) {
                    console.log(res)
                }
            });
        },
        tF: {},//缓存的回调方法
        mF: {},//准备执行的回调方法
        waitList:[],
        call: function (obj) {
            //检测是否创建通信专用webview
            var Bridge=plus.webview.getWebviewById('wsView');
            if(Bridge===null){

                //缓存本次请求，创建完成之后继续请求
                // 调用创建
                return
            }

            //获取当前页面
            var thisView=plus.webview.currentWebview().id;

            //生成ticket
            function guid() {
                var now = new Date().getTime()

                function S4() {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                }

                return ("t" + (S4() + S4() + now));
            }

            var t = guid()
            //发送请求
            mui.fire(Bridge,'wsCall',{
                from:thisView,
                i:obj.i,
                t:t,
                data:obj.data,
                success: opt.success
            });

            //缓存回调函数
            if (typeof opt.success == "function") {

                vm.tF[t] = opt.success
            }
            else {
                console.log('没有正确传入回调函数')
            }
            //回收opt
            console.log("done!!")
        },
        buildBridge: function () {
            //创建桥
            plus.webview.create({
                url:vm.wsMuiUrl,
                id:"wsView"
            });
            //完成之后将waitList中的请求发出去
            for(var i=0;i<vm.waitList.length;i++){
                vm.call(vm.waitList[i])
            }
        }
    }
    window.ws=vm
})