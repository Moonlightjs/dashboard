import { ContentTypeBuilderService } from "@/service";
import {
  CollationType,
  ContentTypeBuilderInput,
} from "@/service/content-type-builder.service";
import { defineStore } from "pinia";
export const useContentTypeStore = defineStore("contentType", {
  state: () => ({
    contentTypes: {} as Record<string, CollationType>,
    isLoadingGetList: false as boolean,
    isLoadingCreate: false as boolean,
    isLoadingUpdate: false as boolean,
    isLoadingDelete: false as boolean,
  }),
  getters: {
    isLoading(): boolean {
      return this.isLoadingGetList || this.isLoadingCreate || this.isLoadingUpdate || this.isLoadingDelete;
    },
  },
  actions: {
    async getListContentType() {
      this.isLoadingGetList = true;
      this.contentTypes = await ContentTypeBuilderService.getList();
      this.isLoadingGetList = false;
    },
    async createContentType(data: ContentTypeBuilderInput) {
      this.isLoadingCreate = true;
      await ContentTypeBuilderService.create(data);
      this.isLoadingCreate = false;
      await this.getListContentType();
    },
    async updateContentType(uid: string, data: ContentTypeBuilderInput) {
      this.isLoadingUpdate = true;
      await ContentTypeBuilderService.update(uid, data);
      this.isLoadingUpdate = false;
      await this.getListContentType();
    },
    async deleteContentType(uid: string) {
      this.isLoadingDelete = false;
      await ContentTypeBuilderService.delete(uid);
      this.isLoadingDelete = true;
      await this.getListContentType();
    },
  },
});
