import axios from "axios";
const baseURL = "http://daily.zhufengpeixun.com";
// const baseURL = "http://dailytest.zhufengpeixun.com";
// const baseURL = "http://127.0.0.1:3021";

export const instance = axios.create({
	baseURL,
});

instance.interceptors.request.use((value) => {
	console.log("请求参数", value);
	return value;
});

instance.interceptors.response.use(
	(response) => {
		if (response.status >= 200 && response.status < 300) {
			return response.data ? response.data : {};
		}
		console.log(response.status);
		return {};
	},
	(err) => {
		console.log("报错", err);
	}
);

interface IRes<T> {
	data: T;
}

interface IListQuery {
	current?: number;
	pageSize?: number;
}

export interface ListItem {
	name: string;
	day_id: number;
	publish_date: string;
	content: string;
	type: "md" | "js";
}

type IListRes = IRes<ListItem[]>;

export const getProblemList = (
	params: IListQuery = {
		current: 1,
		pageSize: 9999,
	}
): Promise<IListRes> => {
	return instance.get("/api/questions", { params });
};

export interface ICreateAnswerRes {
	success: boolean;
	errorMsg?: string;
}

export const createAnswer = (
	dayId: string,
	content: string,
	gitId: number
): Promise<ICreateAnswerRes> => {
	return instance.post(`/api/answer/${dayId}`, { content, gitId });
};

export interface Answer {
	answer_id: number;
	answer_content: string;
	answer_date: Date | string;
}

export interface IGetAnswersRes {
	success: boolean;
	subject_name: string;
	subject_content: string;
	refer_answer: string;
	errorMsg?: string;
	data: Answer[];
}

export const getAnswers = (
	dayId: string,
	gitId: number
): Promise<IGetAnswersRes> => {
	return instance.get(`/api/answers/${dayId}`, { params: { gitId } });
};

export interface IEnglishDailyRes {
	sentenceViewList: {
		dailysentence: {
			title: string;
			content: string;
			note: string;
		};
		sentenceLecture: {
			lectureConfigList: [
				{
					paraphraseList: {
						sentence: string;
						symbol: string;
						paraphrase: string;
						highlightWords: string[] | null;
					}[];
				}
			];
		};
	}[];
}

/**
 * 获取每日英语数据接口，非珠峰 api，特殊处理
 */
export const getDailyEnglish = () => {
	return instance.get<IEnglishDailyRes>(
		"http://sentence.iciba.com/api/sentence/list?app_type=0&brand=apple&ck=&client=3&limit=1",
		{
			baseURL: "",
		}
	);
};
