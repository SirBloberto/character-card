import http from "../http";

class ImageUpload {
  upload(image) {
    let formData = new FormData();
    formData.append("image", image);
    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  }

  getImages() {
    return http.get("/images");
  }
}

export default new ImageUpload();