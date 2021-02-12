import axios from "axios";

// 获取指定文章
export const ApiArticleById = (id: number) => axios.get(`/article/${id}`).then(res => res.data);;
// 获取文章列表
export const ApiArticles = (pageSize: number, pageNum: number) => axios.get(`/articles?pageSize=${pageSize}&pageNum=${pageNum}`);
// 添加文章
export const ApiAddArticle = (params: ArticleInfo) => axios.post(`/article/add`, params);
// 修改文章
export const ApiEditorArticleById = (id: number) => axios.put(`/article/${id}`);
// 删除文章
export const ApiDeleteArticleById = (id: number) => axios.delete(`/article/${id}`);

interface ArticleInfo {
  title: string,
  cid: number,
  desc: string,
  content: string,
  img: string,
}
