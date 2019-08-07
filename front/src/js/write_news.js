

function UploadFile(){

};


UploadFile.prototype.run = function () {
    var self = this;
    self.listenUploadFileEvent();

};

UploadFile.prototype.listenUploadFileEvent = function(){
    var uploadBtn = $('#thunbnail-btn');
    uploadBtn.change(function () {
        var file = uploadBtn[0].files[0];
        var formData = new FormData();
        formData.append('file',file);
        xfzajax.post({
            'url':'/cms/upload_file/',
            'data':formData,
            'processData':false,
            'contentType':false,
            'success':function (result) {
                if(result['code']===200){
                    var url = result['data']['url'];
                    var thumbnailInput = $('#thunbnail-form');
                    thumbnailInput.val(url);
                }
            }
        })
    });
};

$(function () {
    var uploadfile = new UploadFile();
    uploadfile.run();

});