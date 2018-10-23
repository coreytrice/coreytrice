<?php

    add_action('wp_ajax_corey_email',           'corey_email_callback');
    add_action('wp_ajax_nopriv_corey_email',    'corey_email_callback');

    function corey_email_callback() {
        $post = $_POST;

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            //Check for name or error out
            if(isset($post['name']) && !empty($post['name'])) {
                $name = sanitize_text_field(trim($post['name']));
            }else{
                $msg['message'] = 'noName';
                echo json_encode($msg);
                die();
            }

            //Check for email or error out
            if(isset($post['email']) && !empty($post['email'])) {
                $email = sanitize_email($post['email']);
                
                //Check to make sure email is an email or error out
                if(!is_email($email)) {
                    $msg['message'] = 'invalidE';
                    echo json_encode($msg);
                    die();
                }
            }else{
                $msg['message'] = 'noEmail';
                echo json_encode($msg);
                die();
            }

            // Check for subject or error out
            if(isset($post['subject']) && !empty($post['subject'])) {
                $subject = sanitize_text_field($post['subject']);
            }else{
                $msg['message'] = 'noSubject';
                echo json_encode($msg);
                die();
            }

            // Check for body content or error out
            if(isset($post['emailBody']) && !empty($post['emailBody'])) {
                $body = sanitize_text_field($post['emailBody']);
            }else{
                $msg['message'] = 'noBody';
                echo json_encode($msg);
                die();
            }

            // Email encoding
            $encoding = 'utf-8';

            // Set preferences for subject
            $subjectPreferences = [
                'input-charset'     => $encoding,
                'output-charset'    => $encoding,
                'line-length'       => 76,
                'line-break-chars'  => "\r\n"
            ];

            // Mail header
            $header  = 'Content-type: text/html; charset=' . $encoding . " \r\n";
            $header .= 'From: ' . $name .' <' . $email . "> \r\n";
            $header .= "MIME-Version: 1.0 \r\n";
            $header .= "Content-Transfer-Encoding: 8bit \r\n";
            $header .= 'Date: ' . date('r (T)') . " \r\n";
            $header .= iconv_mime_encode('Subject', $subject, $subjectPreferences);

            $mail = mail('corey@coreytrice.com', $subject, $body, $header);

            if($mail) {
                //RETURN SUCCESS HERE
                $msg['message'] = 'emailSuccess';
                echo json_encode($msg);
                die();
            }else{
                //RETURN FAILURE HERE
                $msg['message'] = 'emailFailure';
                echo json_encode($msg);
                die();
            }
        }else{
            $msg['message'] = 'naughtyRequestMethod';
            echo json_encode($msg);
            die();
        }
    }
