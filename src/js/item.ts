/**
 * 用户数据接口
 * @param {number} id 用户Id
 * @param {string} name 用户名称
 * @param {string} password 密码
 * @param {string} describe 用户描述
 * @param {string} avator 用户头像
 * @param {Item [] } itemList 作品列表
 * @param {number} allLikeNum 点赞总数
 * @param {boolean} nowType 当前点赞状态
 *
 *
 */
export interface User {
  id?: number;
  name?: string;
  password?: string;
  describe?: string;
  avator?: string;
  itemList?: Item[];
  allLikeNum?: number;
  nowType?: string;
}

/**
 * 作品数据接口
 * @param {number} id 作品Id
 * @param {string} title 作品名称
 * @param {number} pv 点赞数
 * @param {string} name 作者名字
 * @param {number} uid 作者Id
 * @param {string} moment 发表时间
 * @param {string} type 作品类型（受欢迎/top10）
 * @param {boolean} likeType 点赞状态
 *
 */
export interface Item {
  id?: number;
  title?: string;
  pv?: string;
  name?: string;
  uid?: string;
  moment?: string;
  likeNum?: number;
  likeType?: boolean;
}

// /**
//  * Enum containing a know-empty record type , matching only empty records unlike Object
//  *
//  * @enum {Object}
//  */
// const Empty = {
//   Record: {}
// };

// /**
//  * Empty ItemQuery type,based on the Empty @enum
//  *
//  * @typedef {Empty}
//  */
// export var EmptyItemQuery;

// /**
//  * Reference to the only EmptyItemQuery instance
//  *
//  * @typedef {EmptyItemQuery}
//  */
// export const emptyItemQuery = Empty.Record;

// /**
//  * @typedef {!({id:number} | {name:string} | EmptyItemQuery)}
//  */
// export var ItemQuery;

// /**
//  * @typedef {!({id:number,title:string} | {id:number,completed:boolean})}
//  */
// export var ItemUpdate;
