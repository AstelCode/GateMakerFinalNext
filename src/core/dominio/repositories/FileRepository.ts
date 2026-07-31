export interface FileRepository {
  upload(
    destPath: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fileStream: any,
    contentType: string,
  ): Promise<{ src: string; basePath: string; weight: number }>;

  delete(destPath: string): Promise<void>;

  /**
   *
   * @param path The path don't have to containt sub foldelrs
   */

  deleteFolder(path: string): Promise<void>;

  getSignedUrl?(destPath: string): Promise<string>;
}
