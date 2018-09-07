import { Item, User } from "./item";

// import { escapeForHTML } from "./helpers";
import { LayOut } from "./constants";

export default class Template {
  //页面模板
  layOut(command, parameter?) {
    return this[command](parameter);
  }

  // 注册
  private [LayOut.SIGNUP](): string {
    return `<div class="header-img"></div>
            <form id="signUp">
              <div class="form-item">
                <label for="name" class="key">取个悦耳的名字</label>
                <input type="text" id="name" class="value" name="name" placeholder="我是一条鱼"/>
              </div>
              <div class="form-item">
                <label for="password" class="key">密码</label>
                <input type="password" id="password" class="value" name="password" placeholder="123"/>
              </div>
              <div class="form-item">
                <label for="describe" class="key">简单地介绍一下</label>
                <input type="text" id="describe" class="value" name="describe" placeholder="只有7秒记忆"/>
              </div>
              <div class="form-item">
                <label for="avator" class="key">帅图</label>
                <input type="file" id="avator" class="value" name="avator" />
                <input type="hidden" id="avatorVal"/>
                <img class="preview" id="preview" alt="预览头像" style='display:none'>
              </div>
              <div class="text-center">
                <button class="btn" type="button">注册</button>
              </div>
            </form>
            <div class="text-center sign-btn">已注册
              <span>点击登陆</span>
            </div>
            `;
  }

  // 登陆
  private [LayOut.LOGIN](): string {
    return `<div class="header-img"></div>
            <form id="logIn" method="post" >
              <div class="form-item">
                <label for="name" class="key">用户名</label>
                <input type="text" id="name" class="value" name="name" placeholder="我是一条鱼"/>
              </div>
              <div class="form-item">
                <label for="password" class="key">密码</label>
                <input type="password" id="password" class="value" name="password" placeholder="123"/>
              </div>
              <div class="text-center">
                <button class="btn" type="button">登陆</button>
              </div>
            </form>
            <div class="text-center sign-btn">还没账号？
              <span>点击立即注册</span>
            </div>
            `;
  }

  // // 输入提示
  // private [LayOut.INPUTMSG](message: string) {
  //   return `<span class="error-msg">${message}</span>`;
  // }

  /**
   * 作品集合信息
   * @param {object} data 分类作品集合
   */
  gatherItemList(title?: string, itemList?: Item[]): string {
    return `<div class="top">
              <div class="title">
                ${title}
              </div>
              <div class="container">
              ${this.itemList(itemList)}
              </div>
            </div>`;
  }

  /**
   * 作品列表模板
   * @param {Item[]} items
   * @returns {string} 作品集合
   */
  itemList(items: Item[]): string {
    if (items.length == 0) {
      return `<div style = "font-size:10px;padding:1.2em;"> 
              暂时没有内容,赶快去抢沙发吧！
              </div>`;
    }
    return items.reduce(
      (index, item) =>
        index +
        `<div class="item" data-id="${item.id}" data-userId="${item.uid}">
          <div class="row">
            <div class="name">${escapeForHTML(item.title)}</div>
            <div class="time">${escapeForHTML(item.name)} 发表于 ${
          item.moment
        }</div>
          </div>
          <div class="row center heart">
            <div class="posts-icon icon ${
              item.likeType ? "heart-solid" : "heart-void"
            }"></div>
            <div class="num">${item.pv}</div>
          </div>
        </div>`,
      ""
    );
  }

  /**
   * 用户详情模板
   * @param item 用户信息
   */
  private [LayOut.USERDETAIL](user: any) {
    return `<div class="personal-info">
              <div id = "superUserId" hidden >${user.info.id}</div>
              <img class="photo" src ='${user.info.avator}' alt="帅气的头像" />
              <div class="wrapper">
                <div class="name">${user.info.name}</div>
                <label class="desc">${user.info.describes}
                  <span>编辑</span>
                </label>
                <div class="like">
                  <div class="icon ${
                    user.countNum > 0 ? "heart-solid" : "heart-void"
                  }" id = "heardType">
                  </div>
                  <b class="num" id="allLikeNum">${user.countNum}</b>
                </div>
              </div>
              <button class="addtit" >发表文章</button>
            </div>
              ${this.gatherItemList("红心TOP10", user.postsLike)}
              ${this.gatherItemList("最新排行榜", user.postsTime)}
              ${this.gatherItemList("我发表的", user.myPosts)}
            <div class="logOut">退出登录</div>
            `;
  }
}
