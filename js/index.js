$(function () {

    if (localStorage.todo_list) {
        todos = JSON.parse(localStorage.todo_list)
        rander()
    } else {
        var todos = []
        localStorage.todo_list = JSON.stringify(todos)
    }

    function rander() {
        $(".now").empty();

        $.each(todos, function (i, v) {
            $(" <li class='list'><div class='content'><span class='theme'>" + v.title + "</span></div><div class='delet'>deleat</div></li>").appendTo(".now")
    })
    }
    //实现拖拽
    var left=null;
    $(".now").on("touchstart",".list",function(e){
        left=e.originalEvent.changedTouches[0].pageX
    })
    $(".now").on("touchmove",".list",function(e){
        var n=e.originalEvent.changedTouches[0].pageX
        var x=n-left;
       $(this).css({"transform":"translate3d("+x+"px,0,0)","overflow-x":"visible"})
           .delay(200).queue(function(){
           $(this).addClass("active").dequeue()
       })
    })
    //删除
    $(".now").on("touchstart",".list .delet",function(){
       $(this).closest("li").addClass("active1")
           .delay(500).queue(function(){
            $(this).closest("li").remove().dequeue()

        })
        var i=$(this).closest('li').index();
        todos.splice(i,1);
        localStorage.todo_list=JSON.stringify(todos);
    })
 /* $(".font").on("touchstart",function(){
      $('.now').remove();
      localStorage.todo_list=JSON.stringify(todos);

    })*/


    //点击缩放
    $(".icon-plus").on("touchstart",function(){
        $(".header").addClass("active")
        $(".now").addClass("active3")
        $(".addcontent").addClass("active")
    })
    $(".off").on("touchstart",function(){
        $(".header").removeClass("active")
        $(".now").removeClass("active3")
        $(".addcontent").removeClass("active")
    })


    //input赋值
    $(".addcontent .lists .yes").on("touchstart",function(){

        var inpu=$(".addcontent .title #inp").val()

        todos.push({title: inpu, stste: 1,
        });
        localStorage.todo_list=JSON.stringify(todos);
        $(".header").removeClass("active")
        $(".now").removeClass("active3")
        $(".addcontent").removeClass("active")
        $(".addcontent .title #inp").val("")
        rander()
    })

    $(".addcontent .lists .no").on("touchstart",function(){
        $(".header").removeClass("active")
        $(".now").removeClass("active3")
        $(".addcontent").removeClass("active")
        rander()
    })

var now=$('.now');
    now.on('click',function(e){
        console.log(5)
        var ev=e||window.event;
        var obj=ev.target||ev.srcElement;

        if(obj.nodeName=="TD"){
            var oldval=obj.innerHTML;
            obj.innerHTML="";
            //var inputs=document.createElement("input");
            var inputs=$('<input>');
            console.log(inputs)
            inputs.value=oldval;
            inputs,type="text";
            obj.appendChild(inputs)
            inputs.focus()//获取焦点
            //失去焦点之前获取焦点
            inputs.onblur=function(){
                var newval=inputs.value;
                obj.removeChild(inputs);
                inputs=null//销毁
                obj.innerHTML=newval;

                if(newval!=oldval){
                    var pro=obj.className;

                    var i=obj.parentNode.id//i下标
                    console.log(i)
                    info[i][pro]=newval;
                    console.log(info)
                }
            }

        }



    });
})