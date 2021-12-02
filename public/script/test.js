const mongoose = $req("mongoose");
$req("./models/Teste");
const Teste = mongoose.model("testes");

$(function() {

    $("form[ajax=true]").on(function(e) {
        alert('curtiu!')
        e.preventDefault();


        var form_data = 'hero';
        var form_url = $(this).attr("action");
        var form_method = $(this).attr("method").toUpperCase();

        
        
        
        req = $.ajax({
            url: form_url, 
            type: form_method,      
            data: form_data,     
            cache: true,
             
            success: 
           
            
            function(returnhtml){                     
                $("#result").html(returnhtml); 
                $("#loadingimg").hide();                    
            }        
        });
    

    });

});