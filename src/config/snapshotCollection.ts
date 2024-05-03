export const snapshotCollections: ISnapshotCollection = {
  snapshotUrls: [],
  data: [],
};

export interface ISnapshotCollection {
  snapshotUrls: string[];
  data: IEachSnapshotCollection[];
};

export interface IEachSnapshotCollection {
  snapshotUrl: string;
  status: '未适配' | '已适配' | '无activityId' | '现有规则有效' | '无法适配' | '不予适配';
};