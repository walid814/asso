/*==============================================================*/
// Contact Form  JS
/*==============================================================*/
(function ($) {
    "use strict"; // Start of use strict
    $("#contactForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            formError();
            submitMSG(false, "Did you fill in the form properly?");
        }
        else {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        var name = $("input[name='name']").val();
        var email = $("input[name='email']").val();
        var msg_subject = $("input[name='msg_subject']").val();
        var phone_number = $("input[name='phone_number']").val();
        var message = $("textarea[name='message']").val();
        var token = $('input[name="_token"]').val();
    
        $.ajax({
            type: "POST",
            url: "/nous-contacter",
            data: {
                name: name,
                email: email,
                msg_subject: msg_subject,
                phone_number: phone_number,
                message: message,
                _token: token
            },
            success: function(response) {
                formSuccess();
                submitMSG(true, "Message envoyé avec succès !");
            },
            error: function(xhr) {
                if (xhr.status === 422) {
                    var errors = xhr.responseJSON.errors;
                    var errorMsg = '';
                    for (var key in errors) {
                        if (errors.hasOwnProperty(key)) {
                            errorMsg += errors[key][0] + '\n';
                        }
                    }
                    submitMSG(false, errorMsg);
                } else {
                    formError();
                    submitMSG(false, "Une erreur est survenue lors de l'envoi.");
                }
            }
        });
    }
    
    
    function formSuccess(){
        $("#contactForm")[0].reset();
        submitMSG(true, "Message Submitted!")
    }
    function formError(){
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });
    }
    function submitMSG(valid, msg){
        if(valid){
            var msgClasses = "h4 tada animated text-success";
        }
        else {
            var msgClasses = "h4 text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

}(jQuery)); // End of use strict