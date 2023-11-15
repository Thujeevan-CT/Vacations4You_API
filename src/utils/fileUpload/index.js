const fs = require("fs");
const path = require("path");
const { randomBytes } = require("crypto");
const DIR_PATH = require("../../../config")();

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB in bytes

module.exports = class FileUpload {
  constructor(
    req,
    imagePath = "",
    fieldName = "avatar",
    required = true,
    allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"]
  ) {
    this.req = req;
    this.imagePath = imagePath;
    this.fieldName = fieldName;
    this.allowedMimeTypes = allowedMimeTypes;
    this.required = required;
  }

  validate = () => {
    const errors = [];

    if (this.required) {
      if (!this.req.files && !this.req.body[this.fieldName]) {
        return [`${this.fieldName} is required!`];
      }
    }

    console.log(this.req)
    
    const isFileUpload = !!this.req.files;
    const isBase64Data = !!this.req.body[this.fieldName];
    
    console.log('isFileUpload', isFileUpload)
    console.log('isBase64Data', isBase64Data)

    if (isFileUpload) {
      const file = this.req.files[this.fieldName];
      if (!file) {
        if (this.required) {
          errors.push(`${this.fieldName} is required!`);
        }
      } else if (!this.allowedMimeTypes.includes(file.mimetype)) {
        errors.push(
          `${this.fieldName} file type should be one of ${this.allowedMimeTypes.join(
            ", "
          )}`
        );
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        errors.push(
          `${this.fieldName} file size should not exceed 2MB`
        );
      }
    } else if (isBase64Data) {
      const base64Data = this.req.body[this.fieldName];
      const mimeMatch = base64Data.match(/^data:(.*);base64,(.*)$/);

      if(!mimeMatch){
        return ['Image is not valid base 64 format! eg: data:image/jpeg;base64,...'];
      }

      if (!mimeMatch || !this.allowedMimeTypes.includes(mimeMatch[1])) {
        errors.push(
          `${this.fieldName} file type should be one of ${this.allowedMimeTypes.join(
            ", "
          )}`
        );
      }
      const base64FileSize = (mimeMatch[2].length * 3) / 4 - 2; // Convert base64 size to bytes
      if (base64FileSize > MAX_FILE_SIZE_BYTES) {
        errors.push(
          `${this.fieldName} file size should not exceed 2MB`
        );
      }
    }

    if (errors.length > 0) {
      return errors;
    }

    return false;
  };


  upload = async () => {
    const base64Data = this.req.body[this.fieldName];

    if (!base64Data) {
      return false;
    }

    const mimeMatch = base64Data.match(/^data:(.*);base64,(.*)$/);

    if (!mimeMatch || !this.allowedMimeTypes.includes(mimeMatch[1])) {
      return false;
    }

    const fileExtension = mimeMatch[1].split('/')[1];
    const randomString = randomBytes(4).toString("hex");
    const fieldPath = `${this.imagePath}/${Date.now()}-${randomString}.${fileExtension}`;

    if (!fs.existsSync(path.join(DIR_PATH, this.imagePath))) {
      fs.mkdirSync(path.join(DIR_PATH, this.imagePath), {
        recursive: true,
      });
    }

    const uploadImageFieldAndPath = `/${fieldPath}`;

    try {
      const base64Buffer = Buffer.from(mimeMatch[2], "base64");
      fs.writeFileSync(path.join(DIR_PATH, fieldPath), base64Buffer);
      return { [this.fieldName]: uploadImageFieldAndPath };
    } catch (err) {
      return false;
    }
  }
};
