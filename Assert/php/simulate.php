<?php

// 要发送的 POST 数据
$post_data = array(
    'name' => '测试用户',
    'email' => 'test@example.com',  // 修改为你自己的 email
    'subject' => '测试主题',
    'body' => '这是一封测试邮件的内容。\n包含换行。',
);

// sendEmail.php 脚本的 URL
$url = 'http://www.cflmy.cn/Assert/php/SendEmail.php';

// 构建 POST 请求的上下文选项
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($post_data),
    ),
);

// 创建上下文资源
$context  = stream_context_create($options);

// 发送 POST 请求并获取结果
$result = file_get_contents($url, false, $context);

// 输出结果
if ($result === FALSE) {
    echo "Error sending request.\n";
} else {
    echo "Response from SendEmail.php:\n";
    echo $result . "\n";
}

?>
