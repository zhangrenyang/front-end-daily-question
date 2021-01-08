## 每日一题列表

### 接口地址

```js
GET / api / questions;
```

### 参数

#### query 参数

| 变量名   | 类型 | 说明     |
| :------- | :--- | :------- |
| current  | 整数 | 当前页数 |
| pageSize | 整数 | 每页条数 |

### 返回值

#### 返回结果

| 变量名   | 类型         | 说明     |
| :------- | :----------- | :------- |
| success  | 布尔值       | 是否成功 |
| current  | 整数         | 当前页数 |
| pageSize | 整数         | 每页条数 |
| total    | 整数         | 总页数   |
| data     | 问题对象数组 | 问题数组 |

#### 问题对象

| 变量名       | 类型   | 说明                          |
| :----------- | :----- | :---------------------------- |
| id           | 整数   | 每日一题 ID                   |
| name         | 字符串 | 题目名称                      |
| type         | 字符串 | 题目类型，目前有两种,md 和 js |
| content      | 字符串 | 题目内容                      |
| publish_date | 日期   | 发布时间                      |

示例

```json
{
	"success": true,
	"current": 1,
	"pageSize": 10,
	"total": 10,
	"data": [
		{
			"id": 1,
			"name": "请说一下什么是虚拟DOM?",
			"publish_date": "2020-12-22"
		}
	]
}
```

## 回答问题

### 接口地址

```js
POST /api/answer/:day_id
```

### 参数

#### 路径参数

| 变量名 | 类型 | 说明        |
| :----- | :--- | :---------- |
| day_id | 整数 | 每日一题 ID |

#### 请求体参数

| 变量名  | 类型   | 说明       |
| :------ | :----- | :--------- |
| content | 字符串 | 回答的内容 |

#### 示例

```json
{
	"success": true
}
```

### 返回值

| 变量名  | 类型   | 说明     |
| :------ | :----- | :------- |
| success | 布尔值 | 是否成功 |

## 每日一题回答列表

### 接口地址

```js
GET /api/answers/:day_id
```

### 参数

#### 路径参数

| 变量名 | 类型 | 说明        |
| :----- | :--- | :---------- |
| day_id | 整数 | 每日一题 ID |

### 返回值

#### 返回结果

| 变量名          | 类型         | 说明                          |
| :-------------- | :----------- | :---------------------------- |
| success         | 布尔值       | 是否成功                      |
| subject_name    | 字段串       | 题目                          |
| subject_content | 字符串       | 题目内容                      |
| subject_type    | 字符串       | 题目类型，目前有两种,md 和 js |
| refer_answer    | 字符串       | 参考答案                      |
| data            | 回答对象数组 | 全部回答                      |

#### 回答对象

| 变量名         | 类型   | 说明     |
| :------------- | :----- | :------- |
| answer_id      | 数字   | 回答 ID  |
| answer_content | 字符串 | 回答内容 |

示例

```json
{
	"success": true,
	"subject_name": "请说一下什么是虚拟DOM?",
	"subject_content": "请说一下什么是虚拟DOM?",
	"refer_answer": "虚拟DOM其实是一个JavaScript对象",
	"data": [
		{
			"answer_id": 1,
			"answer_content": "虚拟DOM其实是一个JavaScript对象?",
			"answer_date": "2020-12-22"
		}
	]
}
```

## 查看用户是否回答过

### 接口地址

```js
GET /api/searchHasSelfAnswer?gitId=1&dayId=151
```

### 参数

#### 查询参数

| 变量名 | 类型 | 说明           |
| :----- | :--- | :------------- |
| day_id | 整数 | 每日一题 ID    |
| gitId  | 整数 | github 用户 ID |

### 返回值

#### 返回结果

| 变量名        | 类型   | 说明         |
| :------------ | :----- | :----------- |
| hasSelfAnswer | 布尔值 | 是否回答过了 |

示例

```json
{
	"hasSelfAnswer": false
}
```
