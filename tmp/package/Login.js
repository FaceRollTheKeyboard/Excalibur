/*
 {{name}} 内在灵魂，沉稳坚毅
 生成时间：{{date}}   破门狂人R2-D2为您服务！
 */
define('{{en}}',[
    'avalon',
    'text!../../package/{{en}}/{{en}}.html',
    'css!../../package/{{en}}/{{en}}.css',
    '../../plugins/isIt/isIt.js',
    '../../plugins/Gate/Gate.js'
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
                vm.reset()
                index.html=html

                //以及其他方法
                //自动登陆
                Gate.comeIn({
                    haveLogin: function (res){
                        //todo 跳转 (根据实际需求调整)
                        //var G=res.G
                        //index.uid=res.UID
                        //if(G[0]==2){
                        //如果是管理员，跳转教练列表
                        //window.location.href="#!/CoachList/0"
                        //}
                        //else if(G[0]==1){
                        //如果是教练，跳转会员列表
                        //window.location.href="#!/MemberList/0"
                        //if(G[1]==2){
                        //    index.g=1
                        //}
                        //}
                    },
                })
            }



        },
        reset: function () {
            avalon.mix(vm,{
                //要重置的东西最后都放回到这里
                info:{
                    Account:'',
                    Pwd:''
                }
            })
        },
        info:{
            Account:'',
            Pwd:''
        },
        login:function(){
            var data = {
                Account:'',
                Pwd:''
            }
            avalon.mix(data, vm.info)
            //TODO 验证账户名不可为空
            //if(!isIt.pwd(data.Pwd,'密码')){
            //    return
            //}



            if(data.Account == ''){
                tip.on("用户名不能为空")
                return
            }
            if(data.Pwd == ""){
                tip.on("密码不能为空")
                return
            }
            if(data.Account.length>6){
                tip.on("用户名过长")
                return
            }
            $$.call({
                i:"User/login",
                data:data,
                success:function(res,origin){
                    //if(origin.G[0]==2){
                    //    //如果是管理员，跳转教练列表
                    //    window.location.href="#!/CoachList/0"
                    //}
                    //else if(origin.G[0]==1){
                    //    //如果是教练，跳转会员列表
                    //    window.location.href="#!/MemberList/0"
                    //    if(origin.G[1]==2){
                    //        index.g=1
                    //    }
                    //}
                    //index.G=addUp(origin.G)
                    cache.go(res)
                    //index.uid=cache.go('UID')
                    //index.un=res.CoachName
                },
                error:function(err){
                    tip.on(err)
                }
            })
        }

    })
    return window[vm.$id]=vm
})