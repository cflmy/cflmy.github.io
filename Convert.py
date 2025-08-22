import yaml
import os

def yaml_to_html(yaml_file_path, output_html_path):
    """
    将 YAML 文件内容转换为静态 HTML 网页。

    Args:
        yaml_file_path (str): 输入的 YAML 文件路径。
        output_html_path (str): 输出的 HTML 文件路径。
    """

    try:
        with open(yaml_file_path, 'r', encoding='utf-8') as file:
            data = yaml.safe_load(file)
    except FileNotFoundError:
        print(f"错误：找不到文件 '{yaml_file_path}'")
        return
    except yaml.YAMLError as e:
        print(f"错误：解析 YAML 文件时出错: {e}")
        return

    # HTML 模板
    html_template = """
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的书签</title>
    <link rel="icon" href="/img/logo.ico">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 20px;
            background-color: #f4f7f6;
            color: #333;
        }}
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }}
        h1 {{
            text-align: center;
            color: #2c3e50;
            margin-bottom: 40px;
        }}
        .category {{
            margin-bottom: 40px;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 20px;
        }}
        .category:last-child {{
            border-bottom: none;
            margin-bottom: 0;
        }}
        .category-header {{
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            cursor: pointer; /* 提示可点击展开/收起 */
        }}
        .category-header i {{
            font-size: 24px;
            color: #3498db;
            margin-right: 15px;
        }}
        .category-header h2 {{
            font-size: 26px;
            color: #2c3e50;
            margin: 0;
        }}
        .category-items {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 20px;
        }}
        .item {{
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }}
        .item:hover {{
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }}
        .item img {{
            width: 40px;
            height: 40px;
            margin: 0 auto 10px auto;
            border-radius: 4px;
            display: block;
        }}
        .item a {{
            text-decoration: none;
            color: #3498db;
            font-weight: bold;
            font-size: 18px;
            display: block;
            margin-bottom: 8px;
            word-wrap: break-word; /* 防止长名称溢出 */
        }}
        .item p {{
            font-size: 14px;
            color: #7f8c8d;
            margin: 0;
            line-height: 1.4;
        }}
        /* 隐藏/显示功能 */
        .hidden {{
            display: none;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>我的书签</h1>
        {categories_html}
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {{
            const categoryHeaders = document.querySelectorAll('.category-header');
            categoryHeaders.forEach(header => {{
                header.addEventListener('click', function() {{
                    const categoryItems = this.nextElementSibling; // 获取下面的 .category-items
                    categoryItems.classList.toggle('hidden');
                }});
            }});
        }});
    </script>
</body>
</html>
"""

    categories_html = ""
    for category_data in data:
        category_name = category_data['category']
        category_icon = category_data['icon']
        items_html = ""
        for item in category_data['items']:
            items_html += f"""
        <div class="item">
            <img src="{item['image']}" alt="{item['name']} favicon">
            <a href="{item['link']}" target="_blank">{item['name']}</a>
            <p>{item['description']}</p>
        </div>
"""

        categories_html += f"""
    <div class="category">
        <div class="category-header">
            <i class="fas {category_icon}"></i>
            <h2>{category_name}</h2>
        </div>
        <div class="category-items">
            {items_html}
        </div>
    </div>
"""

    final_html = html_template.format(categories_html=categories_html)

    try:
        with open(output_html_path, 'w', encoding='utf-8') as file:
            file.write(final_html)
        print(f"成功生成 HTML 文件: '{output_html_path}'")
    except IOError as e:
        print(f"错误：写入 HTML 文件时出错: {e}")

if __name__ == "__main__":
    yaml_file = 'bookmarks.yml'  # 你的 YAML 文件名
    html_file = 'index.html'     # 输出的 HTML 文件名

    # 检查 YAML 文件是否存在
    if not os.path.exists(yaml_file):
        print(f"错误：请在当前目录下创建一个名为 '{yaml_file}' 的 YAML 文件，并将你的书签数据复制进去。")
    else:
        yaml_to_html(yaml_file, html_file)
