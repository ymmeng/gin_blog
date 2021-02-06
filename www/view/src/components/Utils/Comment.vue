<template>
  <div>
    <a-comment>
      <a-avatar
        slot="avatar"
        src="http://192.168.58.111:6080/upload/2021-02-06%2002/d74e2a97-2680-495d-ab33-f4a94e9064f4.jpg"
        alt="Han Solo"
      />
      <div slot="content">
        <a-form-item>
          <a-textarea
            :rows="4"
            :value="value"
            placeholder="来条评论吧..."
            @change="handleChange"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            html-type="submit"
            :loading="submitting"
            type="primary"
            @click="handleSubmit"
          >
            提交评论
          </a-button>
        </a-form-item>
      </div>
    </a-comment>
    <a-list
      v-if="comments.length"
      :data-source="comments"
      :header="`${comments.length} ${
        comments.length > 1 ? '条评论' : '条评论'
      }`"
      item-layout="horizontal"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-comment :content="item.content">
          <template slot="actions">
            <span key="comment-basic-like">
              <a-tooltip title="点赞">
                <a-icon
                  type="like"
                  :theme="action === 'liked' ? 'filled' : 'outlined'"
                  @click="like"
                />
              </a-tooltip>
              <span style="padding-left: '8px'; cursor: 'auto'">
                {{ likes }}
              </span>
            </span>
            <span key="comment-basic-dislike">
              <a-tooltip title="反对">
                <a-icon
                  type="dislike"
                  :theme="action === 'disliked' ? 'filled' : 'outlined'"
                  @click="dislike"
                />
              </a-tooltip>
              <span style="padding-left: '8px'; cursor: 'auto'">
                {{ dislikes }}
              </span>
            </span>

            <a-button>回复</a-button>
            <!-- <span key="comment-basic-reply-to">Reply to</span> -->
          </template>
          <a slot="author">用户名</a>
          <a-tooltip
            slot="datetime"
            :title="moment().format('YYYY-MM-DD HH:mm:ss')"
          >
            <span>{{ moment().format("YYYY-MM-DD HH:mm:ss") }}</span>
          </a-tooltip>
          <a-avatar
            slot="avatar"
            src="http://192.168.58.111:6080/upload/2021-02-06%2002/d74e2a97-2680-495d-ab33-f4a94e9064f4.jpg"
            alt="Han Solo"
          />
        </a-comment>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      comments: [],
      submitting: false,
      value: "",
      moment,
      likes: 0,
      dislikes: 0,
      action: null,
      moment,
    };
  },
  methods: {
    like() {
      this.likes = 1;
      this.dislikes = 0;
      this.action = "liked";
    },
    dislike() {
      this.likes = 0;
      this.dislikes = 1;
      this.action = "disliked";
    },
    handleSubmit() {
      if (!this.value) {
        return;
      }

      this.submitting = true;

      setTimeout(() => {
        this.submitting = false;
        this.comments = [
          {
            author: "Han Solo",
            avatar:
              "http://192.168.58.111:6080/upload/2021-02-06%2002/d74e2a97-2680-495d-ab33-f4a94e9064f4.jpg",
            content: this.value,
            datetime: moment().fromNow(),
          },
          ...this.comments,
        ];
        this.value = "";
      }, 1000);
    },
    handleChange(e) {
      this.value = e.target.value;
    },
  },
};
</script>
