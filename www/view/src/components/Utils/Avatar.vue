<template>
    <a-popover
        v-if="popover || user != null"
        placement="topLeft"
        v-model="visible"
        :getPopupContainer="container"
        arrow-point-at-center
        @visibleChange="showUserInfo"
    >
        <div slot="content">
            <div class="user-info" v-if="user != null">
                <h4 v-if="userinfo">
                    <a :href="userinfo.id | userHomepage">{{ userinfo ? userinfo.name : '' }}</a>
                </h4>
            </div>
            <slot></slot>
            <div class="footer" v-if="menus.length > 0">
                <a-row>
                    <a-col class="flex-center" :span="colSpan" v-for="item in menus" :key="item.key">
                        <a-button type="link" @click="$emit('menuClick', item.key, user)">
                            {{ item.title }}
                        </a-button>
                    </a-col>
                </a-row>
            </div>
        </div>
        <a-avatar
            :size="size"
            :shape="shape"
            :icon="source.icon"
            :src="source.src | avatarFormat(`!/fw/${fw}`)"
            :style="{
                cursor: 'pointer',
                backgroundColor: background,
                color: source.forground,
            }"
        >
            {{ name }}
        </a-avatar>
    </a-popover>
    <a-avatar
        v-else
        :size="size"
        :shape="shape"
        :icon="source.icon"
        :src="source.src | avatarFormat(`!/fw/${fw}`)"
        :style="{
            backgroundColor: background,
            color: source.forground,
        }"
    >
        {{ name }}
    </a-avatar>
</template>

<script lang="ts">
import Vue from 'vue';
import { ApiUserInfoById } from '@/request/apis/user';

const colors = ['#ff9274', '#cfd48d', '#67c4c7', '#69ceaa', '#dccabc', '#e8899e'];

interface DataType {
    visible: boolean;
    userinfo: null | {
        name: string;
        id?: string;
        avatar: string;
        email: string;
    };
}

export interface AvatarMenuItem {
    title: string;
    key: string;
}

export default Vue.extend({
    name: 'Avatar',
    props: {
        fw: {
            type: Number,
            default: 64,
        },
        size: {
            default: 'default',
        },
        shape: {
            default: 'circle',
        },
        source: {
            type: Object,
            default: function () {
                return { icon: 'user', text: 'U' };
            },
        },
        user: {
            type: String,
            default: null,
        },
        popover: {
            type: Boolean,
            default: false,
        },
        container: {
            type: Function,
            default: () => document.body,
        },
        menus: {
            type: Array as () => AvatarMenuItem[],
            default: () => [],
        },
    },
    data(): DataType {
        return {
            visible: false,
            userinfo: null,
        };
    },
    computed: {
        colSpan(): number {
            return 24 / this.menus.length;
        },
        background(): string {
            if (this.source.background) {
                return this.source.background;
            }

            if (this.source.text) {
                const index = this.source.text.charCodeAt(0);
                return colors[index % colors.length];
            }

            return '#cccccc';
        },
        name(): string {
            if (!this.source.text) {
                return this.source.text;
            }

            // 如果长度大于 3 一般不是中文名，取首字
            if (this.source.text.length > 3) {
                return this.source.text.substr(0, 1).toUpperCase();
            }

            // 如果长度是 3 一般是中文名，取名称，舍弃姓
            if (this.source.text.length == 3) {
                return this.source.text.substr(this.source.text.length - 2, 2).toUpperCase();
            }

            return this.source.text;
        },
    },
    methods: {
        showUserInfo() {
            if (this.user && this.visible && !this.userinfo) {
                this.visible = false;
                ApiUserInfoById(this.user).then((ret) => {
                    if (ret.data) {
                        this.userinfo = ret.data;
                    } else {
                        this.userinfo = {
                            name: this.name,
                            avatar: '',
                            email: '',
                        };
                    }
                    this.visible = true;
                });
            }
        },
    },
    watch: {
        user() {
            this.userinfo = null;
        },
    },
});
</script>

<style lang="scss" scoped>
.footer {
    padding: 8px 16px;
    margin: 0 -16px;
    margin-top: 8px;
    margin-bottom: -12px;
    border-top: 1px solid #e2e2e2;
}
</style>
