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
      return (
        this.isLoadingGetList ||
        this.isLoadingCreate ||
        this.isLoadingUpdate ||
        this.isLoadingDelete
      );
    },
  },
  actions: {
    async getListContentType() {
      this.isLoadingGetList = true;
      try {
        this.contentTypes = await ContentTypeBuilderService.getList();
      } catch (error) {
        console.error(error);
      }
      this.isLoadingGetList = false;
    },
    async createContentType(data: ContentTypeBuilderInput) {
      this.isLoadingCreate = true;
      try {
        await ContentTypeBuilderService.create(data);
      } catch (error) {
        console.error(error);
      }
      this.isLoadingCreate = false;
      await this.getListContentType();
    },
    async updateContentType(uid: string, data: ContentTypeBuilderInput) {
      this.isLoadingUpdate = true;
      try {
        await ContentTypeBuilderService.update(uid, data);
      } catch (error) {
        console.error(error);
      }
      this.isLoadingUpdate = false;
      await this.getListContentType();
    },
    async deleteContentType(uid: string) {
      this.isLoadingDelete = true;
      try {
        await ContentTypeBuilderService.delete(uid);
      } catch (error) {
        console.error(error);
      }
      this.isLoadingDelete = false;
      await this.getListContentType();
    },
  },
});
