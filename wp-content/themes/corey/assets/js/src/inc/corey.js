jQuery(document).ready(function ($) {

    var   body = $('body')
        , prnt = $('#content')
    ;

    prnt.on('click', '.hidden-personal-info.phone', showPhone);
    prnt.on('click', 'a#email-me',                  showEmailModal);
    body.on('click', '.overlay',                    hideEmailModal);
    prnt.on('click', '.js-modal-close',             hideEmailModal);
    prnt.on('click', '.contact-cancel',             clearModalFields);
    prnt.on('click', '.js-send-email',              sendEmail);

    function showPhone(e) {
        var   phoneElement  = $(e.currentTarget)
            , phoneNumber   = '<a href="tel:443.235.6921" class="branding-hover">443.235.6921</a>'
        ;

        phoneElement.html(phoneNumber).removeClass('hide-personal-info');
    }

    function showOverlay() {
        $('.overlay').show();
    }

    function hideOverlay() {
        $('.overlay').hide();
    }

    function showEmailModal() {
        showOverlay();
        $('.contact-form-modal').show();
    }

    function hideEmailModal() {
        hideOverlay();
        $('.contact-form-modal').hide();
    }

    function clearModalFields() {
        var form = $('.js-modal form :input');

        form.each(function () {
            $(this).val('');
        });
    }

    function sendEmail(e) {
        e.stopImmediatePropagation();
        var   name      = $('#email-name')
            , email     = $('#email-address')
            , subject   = $('#email-subject')
            , emailBody = $('#email-content')
            , send      = {
                  'action'      : 'corey_email'
                , 'name'        : name.val()
                , 'email'       : email.val()
                , 'subject'     : subject.val()
                , 'emailBody'   : emailBody.val()
            }
        ;

        $.ajax({
            url     : corey.ajaxUrl,
            data    : send,
            type    : 'POST',
            success : function (data) {
                var   d     = JSON.parse(data)
                    , msg   = d.message
                ;

                processEmailResponse(msg);
            },
            error   : function (xhr, status, error) {
                if(window.console && console.error) {
                    console.error('THERE WAS AN ERROR:', error, status, xhr);
                }
            }
        });
    }

    function processEmailResponse(msg) {
        var   genErrs   = ['emailFailure', 'naughtyRequestMethod']
            , emErrs    = ['invalidE', 'noEmail']
            , success   = false
            , m         = '' //Message to be returned to user
            , elem
        ;

        if(corey.util.inArray(msg, genErrs)) {
            m       = corey.common.getLang('error.general');
            elem    = $('.js-modal.contact-form-modal');
        }

        if(msg === 'noName') {
            m       = corey.common.getLang('contact.noName');
            elem    = $('#email-name');
        }

        if(corey.util.inArray(msg, emErrs)) {
            switch(msg) {
                case 'invalidE':
                    m = corey.common.getLang('contact.invalidEmail');
                    break;
                case 'noEmail':
                    m = corey.common.getLang('contact.noEmail');
                    break;
            }
            elem = $('#email-address');
        }

        if(msg === 'noSubject') {
            m       = corey.common.getLang('contact.noSubject');
            elem    = $('#email-subject');
        }

        if(msg === 'noBody') {
            m       = corey.common.getLang('contact.noBody');
            elem    = $('#email-content');
        }

        if(msg === 'emailSuccess') {
            m = corey.common.getLang('contact.success');
            success = true;
        }

        showResponse(elem, m, success);
    }

    function showResponse(element, message, success) {
        if(success) {
            hideEmailModal();
            clearModalFields();

            corey.alert.add('alert-success', message, 5, false);
        }

        element.html(message);
    }

});




