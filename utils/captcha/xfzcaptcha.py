#-*-coding:utf-8-*-

import random
#Image是一个画板（context）,ImageDraw是一个画笔，ImageFont画笔的字体
from PIL import Image,ImageDraw,ImageFont
import time
import os
import string


class Captcha(object):
    #字体的位置
    font_path = os.path.join(os.path.dirname(__file__),'verdana.ttf')
    number = 4
    #生成验证码的高度和宽度
    size = (100,40)
    bgcolor = (0,0,0)
    #随机字体颜色
    random.seed(int(time.time()))
    fontcolor = (random.randint(200,255),random.randint(100,255),random.randint(100,255))
    #验证码字体大小
    fontsize = 20
    linecolor = (random.randint(200,255),random.randint(0,255),random.randint(0,255))
    draw_line = True
    draw_point = True
    line_number = 3

    SOURCE = list(string.ascii_letters)
    for index in range(0,10):
        SOURCE.append(str(index))

    @classmethod
    def gene_text(cls):
        return ''.join(random.sample(cls.SOURCE,cls.number))

    #用来绘制干扰线
    @classmethod
    def __gene_line(cls,draw,width,height):
        begin = (random.randint(0,width),random.randint(0,height))
        end = (random.randint(0,width),random.randint(0,height))
        draw.line([begin,end],fill=cls.linecolor)

    #用来绘制干扰点
    @classmethod
    def __gene_points(cls,draw,point_chance,width,height):
        chance = min(100,max(0,int(point_chance)))    #大小限制在[0,100]
        for w in range(width):
            for h in range(height):
                tmp = random.randint(0,100)
                if tmp > 100 - chance:
                    draw.point((w,h),fill=(0,0,0))

    #生成验证码
    @classmethod
    def gene_code(cls):
        width,height = cls.size
        image = Image.new('RGBA',(width,height),cls.bgcolor)   #创建画板
        font = ImageFont.truetype(cls.font_path,cls.fontsize)         #验证码的字体
        draw = ImageDraw.Draw(image)   #创建画笔
        text = cls.gene_text()     #生成字符串
        font_width,font_height = font.getsize(text)
        draw.text(((width - font_width) / 2, (height - font_height) /2), text,font=font,fill=cls.fontcolor)  #填充字符串


        #如果需要绘制干扰线
        if cls.draw_line:
            #遍历line_number次，就是画line_number根线条
            for x in range(0,cls.line_number):
                cls.__gene_line(draw,width,height)
            #如果需要绘制噪点
            if cls.draw_point:
                cls.__gene_points(draw,10,width,height)

            return (text,image)

