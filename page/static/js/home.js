"use strict";

$(function() {
    var $container = $('.container').show()
    $('body > h2').remove()

    var $box = $('#upload-box')
//    var $input = $box.find('input[type=file]')
    var $progress = $box.find('.progress')
    var $doc = $(document)
    var $html = $('html')
    var frmToSubmit

    $box.submit(function(ev) {
        ev.preventDefault()

        var incomplete = false
        $box.find('input[name]').each(function() {
            if (!$(this).val())
                incomplete = true
        })
        if (incomplete || !frmToSubmit) {
            Alert.warning('Please fill all fields!')
            return
        }
        $progress.css('visibility', 'visible')
        frmToSubmit.submit()
    })

    var ACCEPT_FILE_TYPE = /^application\/(x-)?pdf$/i
    var MAX_FILE_SIZE = 15 * 1024 * 1024

    $box.fileupload({
//        dropZone: $html,
//        pasteZone: $html,
        url: '/api/upload/',
        paramName: 'file',  // http POST parameter name
        dataType: 'json',  // data type sent from server

        formData: function() {
            var data = $box.find('input[name]').map(function() {
                return {
                    name: $(this).attr('name'),
                    value: $(this).val()
                }
            })
//            data.push({
//                name: 'assignment',
//                value: 1
//            })
            return data
        },

        add: function(e, data) {
            var error = ""
            var f = data.originalFiles[0]
            if(f.type && !ACCEPT_FILE_TYPE.test(f.type))
                error = 'Only PDF files are allowed.'
            else if(f.size && f.size > MAX_FILE_SIZE)
                error = 'File is too big.'

            if (error) {
                Alert.warning(f.name + ': ' + error)
                return
            }

            $box.find('.filename').html(f.name)
            frmToSubmit = data
//            data.submit()
        },

        fail: function(e, data) {
            Alert.warning('Upload failed [' + data.textStatus + ']\n' + data.errorThrown)
        },

        always: function() {
            $progress.css('visibility', 'hidden')
            // Reset progress bar. Otherwise it will show a backward animation to set it to zero when user initialize a new upload.
            $progress.find('.progress-bar').css('width', 0)
            $box.removeClass('in')
        },

        progress: function(e, data) {
            $progress.find('.progress-bar').css('width', (data.loaded / data.total * 100) + '%')
        },

        done: function(e, data) {
            if (data.result.error) {
                var list = data.result.error
                var k = Object.keys(list)[0]
                var msg = /*k + ':\n' + */ list[k].join('\n')
                Alert.warning(msg)
            } else {
                Alert.success('Your file has been uploaded.', 3600 * 1000)
                $container.hide()
            }
        }
    })

    var removeDroppingTimeout
    $doc.on('dragover', function (e) {
        $html.addClass('dropping')

        clearTimeout(removeDroppingTimeout)
        removeDroppingTimeout = setTimeout(function() {
            $html.removeClass('dropping')
        }, 100)

//        e.preventDefault()
    })

//    $doc.on('dragleave drop', function (e) {
////        $html.removeClass('dropping')
//        e.preventDefault()
//    })
})

$(function() {
    var deadlineStamp = 1433532599000
//    var deadlineStamp = 1425068999000 - 0.5 * 60 * 60 * 1000
    var $deadline = $('#deadline')

    function durationInWords(timeInSeconds) {
        var seconds = Math.floor(Math.abs(timeInSeconds))
        var minutes = Math.floor(seconds / 60)
        var hours = Math.floor(minutes / 60)
        var days = Math.floor(hours / 24)

        function format(x, strx) {
            if (x == 0)
                return ''
            return x + ' ' + (x == 1 ? strx : strx + 's')
        }

        if (seconds < 60)
            return 'Less than a minute'
        else if (minutes < 60)
            return format(minutes, 'minute') + ' ' + format(seconds % 60, 'second')
        else if (hours < 24)
            return format(hours, 'hour') + ' ' + format(minutes % 60, 'minutes')
        else
            return format(days, 'day') + ' ' + format(hours % 24, 'hour')
    }

    function refreshDeadline() {
        var diff = (deadlineStamp - new Date()) / 1000
        var s = durationInWords(diff)
        var passed = diff < 0
        s += (passed ? ' passed' : ' remaining')
        $deadline.html(s).toggleClass('negative', passed)
    }

    refreshDeadline()
    setInterval(refreshDeadline, 1000)
})

$(function() {
    var $alert = $('<div>').addClass('notif').appendTo('body')
    var $success = $('<div class="alert alert-success"></div>')
    var $waring = $('<div class="alert alert-danger"></div>')
    var hideTimeout

    function show($div, msgHtml, delay) {
        $alert.empty().show()
        $div.html(msgHtml).appendTo($alert)
        clearTimeout(hideTimeout)
        hideTimeout = setTimeout(function() {
            $alert.hide()
        }, delay || 10 * 1000)
    }

    window.Alert = {
        success: function(msgHtml, delay) {
            show($success, msgHtml, delay)
        },

        warning: function(msgHtml, delay) {
            show($waring, msgHtml, delay)
        }
    }
})