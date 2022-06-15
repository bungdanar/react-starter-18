import mime from 'mime-types'

export class FileUtility {
  private static readonly MAX_FILE_SIZE = 10485760

  private static readonly PDF_MIME_TYPE = ['application/pdf']
  private static readonly RAR_MIME_TYPE = [
    'application/x-rar-compressed',
    'application/vnd.rar',
  ]
  private static readonly ZIP_MIME_TYPE = [
    'application/zip',
    'application/x-zip-compressed',
    'multipart/x-zip',
  ]
  private static readonly STREAM_MIME_TYPE = ['application/octet-stream']

  private static get ALLOWED_TYPES(): string[] {
    return [
      ...this.PDF_MIME_TYPE,
      ...this.RAR_MIME_TYPE,
      ...this.ZIP_MIME_TYPE,
      ...this.STREAM_MIME_TYPE,
    ]
  }

  static readonly MAX_FILE_COUNT = 3

  static checkFileInputValidity = (file: File | undefined | null) => {
    let isValid = true
    let errMsg = ''
    let identifier: number | null = null

    if (file) {
      const result = mime.lookup(file.name) as string
      identifier = 1

      if (!FileUtility.ALLOWED_TYPES.includes(result)) {
        isValid = false
        errMsg = 'File tidak didukung'
      } else if (file.size > FileUtility.MAX_FILE_SIZE) {
        isValid = false
        errMsg = 'File terlalu besar'
      }
    }

    return {
      isValid,
      errMsg,
      identifier,
    }
  }
}
