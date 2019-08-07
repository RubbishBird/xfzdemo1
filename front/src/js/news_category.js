

function NewCategory() {

};


NewCategory.prototype.run = function () {
    var self = this;
    self.listenAddCategoryEvent();
    self.listenEditCategoryEvent();
    self.listenDeleteCategoryEvent();
};


NewCategory.prototype.listenAddCategoryEvent = function(){
    var addBtn = $('#add-btn');
    addBtn.click(function () {
       xfzalert.alertOneInput({
           'title':'添加新闻分类',
           'placeholder':'请输入新闻分类',
           'confirmCallback':function (inputValue) {
               xfzajax.post({
                  'url':'/cms/add_news_category/',
                   'data':{
                      'name':inputValue
                   },
                   'success':function (result) {
                       if(result['code'] === 200){
                           console.log(result);
                           window.location.reload();
                       }else{
                           xfzalert.close();
                       }
                   }
               });
           }
       });
    });
};

NewCategory.prototype.listenEditCategoryEvent = function(){
    var editBtn = $('.eidt-btn');
    editBtn.click(function () {
        var currentBtn = $(this);
        // 获取编辑按钮的父级元素
        var tr = currentBtn.parent().parent();
        // 获取标签下绑定的pk与name值
        var pk = tr.attr('data-pk');
        var name = tr.attr('data-name');
        xfzalert.alertOneInput({
           'title':'修改分类名称',
            'placeholder':'请输入新的分类名称',
            'value':name,
            'confirmCallback':function (inputValue) {
                xfzajax.post({
                    'url':'/cms/edit_news_category/',
                    'data':{
                        'pk':pk,
                        'name':inputValue
                    },
                    'success':function (result) {
                        if(result['code'] === 200 ){
                            console.log(result);
                            window.location.reload();
                        }else{
                            xfzalert.close();
                        }
                    }
                })
            }
        });
    });
};

NewCategory.prototype.listenDeleteCategoryEvent = function(){
    var delBtn = $('.del-btn');
    delBtn.click(function () {
        var currentBtn = $(this);
        var tr = currentBtn.parent().parent();
        var pk = tr.attr('data-pk');
        xfzalert.alertConfirm({
            'title':'您确定删除这个分类吗？',
            'confirmCallback':function () {
                 xfzajax.post({
            'url':'/cms/delete_news_category/',
            'data':{
                'pk':pk
            },
            'success':function (result) {
                if (result['code']===200){
                    window.location.reload();
                }else{
                    xfzalert.close();
                }
            }
        });
            }
        })
    });
};

$(function () {
   var category = new NewCategory();
   category.run();
});