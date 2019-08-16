

function UploadFile(){

};


UploadFile.prototype.run = function () {
    var self = this;
    // self.listenUploadFileEvent();
    self.listenQiniuUploadFileEvent();

};

// 上传至本地服务器
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

// 上传至七牛服务器
UploadFile.prototype.listenQiniuUploadFileEvent = function(){
    var self = this;
    var uploadBtn = $('#thunbnail-btn');
    uploadBtn.change(function () {
        var file = this.files[0];
        xfzajax.get({
            'url':'/cms/qntoken/',
            'success':function (result) {
                if (result['code'] === 200) {
                    var token = result['data']['token'];
                    // var key = (new Date()).getTime() + '.' + file.name.split('.')[1];
                    var key = file.name
                    var putExtra = {
                        fname:key,
                        params:{},
                        mimeType:["image/png", "image/jpeg", "image/gif","image/bmp","image/jpg"],
                    };
                    var config = {
                        useCdnDomain: true,
                        region: qiniu.region.z2,
                        retryCount:6,
                    };
                    var observable = qiniu.upload(file, key, token, putExtra, config);
                    observable.subscribe({
                        'next':self.handleFileUploadProgress,
                        'error':self.handleFileUploadError,
                        'complete':self.handleFileUploadComplete,
                    });

                    // var url = result['data']['url'];
                    // var thumbnailInput = $('#thunbnail-form');
                    // thumbnailInput.val(url);
                }
            }
        })
    });

};

UploadFile.prototype.handleFileUploadProgress = function(response){
    var total = response.total;
    var percent = total.percent;
    var percentText = percent.toFixed(0) + '%';
    var progressgroup = $('#process-group');
    progressgroup.show();
    var progressbar = $('.progress-bar');
    progressbar.css({'width':percentText})
    progressbar.text(percentText);
};

UploadFile.prototype.handleFileUploadError = function(error){
    console.log(error.message);
};

UploadFile.prototype.handleFileUploadComplete = function(response){
    var progressgroup = $('#process-group');
    progressgroup.hide();
    var domain = 'http://pw9qu83i4.bkt.clouddn.com/';
    var filename = response.key;
    var url = domain + filename;
    var thumbnailInput = $('#thunbnail-form');
    thumbnailInput.val(url);
};


$(function () {
    var uploadfile = new UploadFile();
    uploadfile.run();

});