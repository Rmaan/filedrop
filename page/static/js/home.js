$(function() {
    var $box = $('#upload-box')
//    var $input = $box.find('input[type=file]')
    var $progress = $box.find('.progress')
    var $html = $('html')
    var frmToSubmit

    $box.find('button.go').click(function() {
        $progress.css('visibility', 'visible')
        frmToSubmit.submit()
    })

    var ACCEPT_FILE_TYPE = /^application\/(x-)?pdf$/i
    var MAX_FILE_SIZE = 15000 * 1024 * 1024

    $box.fileupload({
        dropZone: $html,
        pasteZone: $html,
        url: '/api/upload/',

        paramName: 'file',  // http POST parameter name
        dataType: 'json',

        add: function(e, data) {
            var error = ""
            var f = data.originalFiles[0]
            if(f.type && !ACCEPT_FILE_TYPE.test(f.type))
                error = 'File type is not valid'
            else if(f.size && f.size > MAX_FILE_SIZE)
                error = 'File is too big'

            if (error) {
                alert(f.name + ': ' + error)
                return
            }

            $box.find('.filename').html(f.name)
            frmToSubmit = data
//            data.submit()
        },

        fail: function(e, data) {
            alert('Upload failed [' + data.textStatus + ']\n' + data.errorThrown)
        },

        always: function() {
            $progress.css('visibility', 'hidden')
            // Reset progress bar. Otherwise it will show a backward animation to set it to zero when user initialize a new upload.
            $progress.find('.progress-bar').css('width', 0)
            $box.removeClass('in')
        },

        progress: function(e, data) {
            $progress.find('.progress-bar').css('width', (data.loaded / data.total * 100) + '%')
        }
    })

    $html.on('dragover', function (e) {
        $html.addClass('dropping')
    })

    $html.on('dragleave drop', function (e) {
        $html.removeClass('dropping')
    })
})
