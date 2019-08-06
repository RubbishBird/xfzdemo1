

function NewCategory() {

};


NewCategory.prototype.run = function () {
    var self = this;
    self.listenAddCategoryEvent();
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
                   'date':{
                      'name':inputValue
                   },
                   'success':function (result) {
                       if(result['code' === 200]){
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

$(function () {
   var category = new NewCategory();
   category.run();
});