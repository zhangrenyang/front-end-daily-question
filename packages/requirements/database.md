## 题目(subjects)
|字段名|类型|说明|
|:----|:----|:----|
|id|int(11)|ID|
|name|varchar(255)|标题|
|content|text|内容|
|description|varchar(255)|描述|
|created_at|datetime|创建时间|
|updated_at|datetime|更新时间|


## 每日一题(days)
|字段名|类型|说明|
|:----|:----|:----|
|id|int(11)|ID|
|subject_id|int(11)|题目ID|
|description|varchar(255)|描述|
|publish_date|date|发布日期|
|created_at|datetime|创建时间|
|updated_at|datetime|更新时间|



## 每日一题回答(day_answers)
|字段名|类型|说明|
|:----|:----|:----|
|id|int(11)|ID|
|day_id|int(11)|每日一题ID|
|content|int(11)|ID|
|id|text|回答|
|description|varchar(255)|描述|
|created_at|datetime|创建时间|
|updated_at|datetime|更新时间|
