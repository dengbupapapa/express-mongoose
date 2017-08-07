$(function() {

    $('#submit').click(function() {
        $.ajax({
            url: '/insert/nonsense',
            dataType: 'json',
            type: 'post',
            data: {
                say: $('[name="say"]').val()
            },
            success: function() {

            }
        })
    })

    $('#delUserId').click(function() {
        $.ajax({
            url: '/delete/userId',
            dataType: 'json',
            type: 'post',
            data: {
                say: $('[name="say"]').val()
            },
            success: function() {

            }
        })
    })

    $.ajax({ //查询历史说说
        url: '/find/nonsense',
        dataType: 'json',
        type: 'post',
        success: function(res) {
            var historySayArr = '';
            for (var i = 0; i < res.messageBody.length; i++) {
                historySayArr += '<li>' + res.messageBody[i].content + '&nbsp;&nbsp;' + res.messageBody[i].date + '</li>';
            }
            // console.log(historySayArr);
            $('#history').html(historySayArr)
        }
    })

    $.ajax({ //查询历史附带关联信息
        url: '/findRef/nonsense',
        dataType: 'json',
        type: 'post',
        success: function() {

        }
    })

    // $.ajax({ //查询历史附带关联信息
    //     url: '/findRef',
    //     dataType: 'json',
    //     type: 'post',
    //     // data: {
    //     //     say: $('[name="say"]').val()
    //     // },
    //     succes: function() {

    //     }
    // })

    // $.ajax({
    //     url: '/find/nonsense',
    //     dataType: 'json',
    //     type: 'post',
    //     data: {},
    //     succes: function() {

    //     }
    // })
    // $.ajax({
    //     url: '/postredirectindex',
    //     dataType: 'json',
    //     type: 'post',
    //     data: {},
    //     succes: function() {

    //     }
    // })

})