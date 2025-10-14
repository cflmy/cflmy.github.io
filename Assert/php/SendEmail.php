<?php
// sendEmail.php
// Debug开启发送邮件的过程
// Todo 导入依赖
require 'email.class.php';


// Todo 允许跨域请求 (CORS) - 根据你的需求调整 这里以后修改为我的域名
header("Access-Control-Allow-Origin: https://www.cflmy.cn");  // 允许所有来源，不安全！应限制为你的域名
header("Content-Type: application/json"); // 返回 JSON 响应

// 检查请求方法是否为 POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 获取 POST 数据
    $name = strip_tags(trim($_POST["name"]));  // 安全起见，清理输入
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL); // 使用 filter_var 验证和清理邮箱
    $subject = strip_tags(trim($_POST["subject"]));
    $body = strip_tags(trim($_POST["body"]));

    // 基本验证
    if (empty($name) OR empty($subject) OR empty($body) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // 设置一个400（错误请求）响应代码。
        http_response_code(400);
        echo json_encode(array("message" => "Please fill out the form and provide a valid email address."));
        exit;
    }

    
    // 构建 HTML 邮件正文
    $mailbody = "<p><b>姓名:</b> " . htmlspecialchars($name) . "</p>";
    $mailbody .= "<p><b>邮箱:</b> " . htmlspecialchars($email) . "</p>";
    $mailbody .= "<p><b>主题:</b> " . htmlspecialchars($subject) . "</p>";
    $mailbody .= "<p><b>内容:</b></p><p>" . nl2br(htmlspecialchars($body)) . "</p>";
    $mailbody .= "<hr>";
    $mailbody .= "这是一份从主页发来的一份联系邮件。";

    $mailsubject = strip_tags(trim($_POST["subject"])) . "#主页Contact";;

    // 邮件接收地址 - 修改为你自己的邮箱地址
    $recipient = "pingan@cflmy.cn";

    // 构建邮件内容
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Subject: $subject\n\n";  // Include the subject from the form

    $email_content .= "Message:\n$body\n";

    // 构建邮件头部
    $email_headers = "From: $name <$email>"; //避免被识别为垃圾邮件
    $email_headers .= "\r\n"; //换行符
    $email_headers .= "Reply-To: $email";  //建议添加Reply-To

    // 尝试发送邮件
    $mailto='pingan@cflmy.cn'; //邮件的接受方，也就是我的邮箱地址
    $smtpserver= "ssl://smtp.mxhichina.com";
    $smtpserverport = 465;
    $smtpusermail   = "main@cflmy.cn";
    // 发件人的账号，比如test***@example.net
    $smtpuser       = "main@cflmy.cn";
    // 访问SMTP服务时需要提供的密码
    $smtppass = getenv('SMTP_PASSWORD'); // 从环境变量获取密码

    // 确保环境变量存在，否则抛出错误
    if (empty($smtppass)) {
        http_response_code(600);
        echo json_encode(array("message" => "Server configuration error."));
        exit;
    }
    $mailsubject    = "=?UTF-8?B?" . base64_encode($mailsubject) . "?=";
    $mailtype       = "HTML";
    $smtp           = new smtp($smtpserver, $smtpserverport, true, $smtpuser, $smtppass);
    $smtp->debug    = false;
    $cc   ="";
    $bcc  = "";
    $additional_headers = "";
    //设置发件人名称，名称用户可以自定义填写。
    $sender  = strip_tags(trim($_POST["name"]));
    $smtpreplyto    = $email;
    //Todo 
    //echo json_encode(array("message" => "Oops! Something went wrong and we couldn't send your message."));
    
    try {
        if ($smtp->sendmail($mailto,$smtpusermail, $mailsubject, $mailbody, $mailtype, $cc, $bcc, $additional_headers, $sender, $smtpreplyto)) {
            // 设置 200 (OK) 响应代码.
            http_response_code(200);
            echo json_encode(array("message" => "Thank You! Your message has been sent."));
        } else {
            // 如果无法发送邮件，设置 500 (内部服务器错误) 响应代码。
            http_response_code(500);
            echo json_encode(array("message" => "Oops! Something went wrong and we couldn't send your message."));
        }
    } catch (Exception $e) {
        // 捕获异常并记录
        http_response_code(500); // 内部服务器错误
        echo json_encode(array("message" => "An exception occurred: " . $e->getMessage()));
        error_log("Email send failed: " . $e->getMessage()); // 记录到服务器日志
    }
        


} else {
    // 如果不是 POST 请求，则返回错误
    http_response_code(403);  // 禁止访问
    echo json_encode(array("message" => "There was a problem with your submission, please try again."));
}
?>
