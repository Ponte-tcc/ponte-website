$(document).ready(function() {

    $('#curtida').on('click', function() {

        

        var userCurtidas = $(userUser);
        

        req = $.ajax({
            url : '/curtir',
            type : 'POST',
            data : { userCurtidas : userCurtidas}
        });

        /*req.done(function(data) {

            $('#memberSection'+member_id).fadeOut(1000).fadeIn(1000);
            $('#memberNumber'+member_id).text(data.member_num);

        });*/
    

    });

});