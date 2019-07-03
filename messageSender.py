#-*-coding:utf-8-*-
import requests

def messageSender(mobile,messageCode):
    url = "http://v.juhe.cn/sms/send"
    params = {
        "mobile": mobile,
        "tpl_id": "170182",
        "tpl_value":"#code#=" + messageCode,
        "key": "aba388b7c65852f83a60a31fa7bdf7de"
    }

    response = requests.get(url,params=params)
    result = response.json()
    if result['error_code']  == 0:
        return True
    else:
        return False