import axios from "axios";

// 获取指定用户信息
export const ApiUserInfoById = (id: number) => axios.get(`/user/${id}`);
// 更新指定用户信息
export const ApiEditorUserById = (id: number) => axios.put(`/user/${id}`);
// 新增用户
export const ApiAddUser = (params: UserInfo) => axios.post(`/user/add`, params);
// 用户登录
export const ApiUserLogin = (params: UserInfo) => axios.post(`/login`, params);
// 删除用户
export const ApiDeleteUserById = (id: number) => axios.delete(`/user/${id}`);

interface UserInfo {
  username: string;
  password: string;
}
