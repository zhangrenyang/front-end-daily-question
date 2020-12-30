import axios from "axios";
import { Interface } from "readline";
const baseURL = "http://daily.zhufengpeixun.com/api";
const instance = axios.create({
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
  name: string,
  day_id: number,
  publish_date: string,
  content: string,
  type: 'md' | 'js'
}

type IListRes = IRes<ListItem[]>;

export const getProblemList = (
	params: IListQuery = {
		current: 1,
		pageSize: 9999,
	}
): Promise<IListRes> => {
	return instance.get("/questions", { params });
};
