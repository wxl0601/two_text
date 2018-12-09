

require(['./js/config.js'],function(){
    require(['mui'],function(mui){
        var pageSize = 10,
            pageNum = 0,
            total;

        mui.init({
            pullRefresh : {
              container:'#pullRefresh',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
              up : {
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
               
                callback :pullfresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
              }
            }
          });

          function pullfresh(){
              var that = this;
            setTimeout(function(){
                pageNum++;
                rend(pageSize,pageNum)
                // mui('#pullRefresh').pullRefresh().disablePullupToRefresh();
                that.endPullupToRefresh(pageNum == total);
            },1000)
          }
          function rend(pageSize,pageNum){
            mui.ajax('/users/api/list',{
                dataType:"json",
                data:{
                    pageSize:pageSize,
                    pageNum:pageNum
                },
                success:function(res){
                    console.log(res)
                    renderImg(res)
                    total = res.total
                }
            })
          }


        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
        var list = document.querySelector('.mui-table-view');
        var baseUrl = 'http://192.168.2.70:3000/images/'
        function renderImg(date){
            var html = ``;
            date.date.forEach(function(file){
                
                var url = `${baseUrl}${file.url}`
                html+=`<li class="mui-table-view-cell mui-media">
				<a href="javascript:;">
					<img class="mui-media-object mui-pull-left" src=${url}>
					<div class="mui-media-body">
						幸福
						<p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
					</div>
				</a>
			</li>`

            })

            list.innerHTML += html;
            
        }
    })
})