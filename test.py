import requests
import json

url = "https://api.mxai.site/transadd/"

# 测试中文翻译成英文
payload = {
    "tranlateType": "cn2en",
    "messages": "北京市朝阳区建国路88号"
}

headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}

response = requests.post(url, json=payload, headers=headers)
print("Status Code:", response.status_code)
print("Response:", json.dumps(response.json(), indent=2, ensure_ascii=False))