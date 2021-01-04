import axios from "axios";
const baseURL =
	process.env.NODE_ENV === "development"
		? "http://dailytest.zhufengpeixun.com"
		: "http://daily.zhufengpeixun.com";
export const instance = axios.create({
	baseURL,
});

instance.interceptors.response.use((response) => {
	if (response.status >= 200 && response.status < 300) {
		return response.data ? response.data : {};
	}
	return {};
});

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
	content: string
): Promise<ICreateAnswerRes> => {
	return instance.post(`/api/answer/${dayId}`, { content });
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
	gitid: number
): Promise<IGetAnswersRes> => {
	return instance.get(`/api/answers/${dayId}`, { params: { gitid } });
};

export interface IGithubDataRes {
	id: number;
}

export const getGithubAccount = (accessToken: string) => {
	return axios.get<IGithubDataRes>(`https://api.github.com/user`, {
		headers: {
			accept: "application/json",
			Authorization: `token ${accessToken}`,
		},
	});
};

export interface IIsStudentRes {
	isStudent: boolean;
}

export const isStudent = (data: IGithubDataRes): Promise<IIsStudentRes> => {
	return instance.post(`/github/searchStudent`, { data });
};
