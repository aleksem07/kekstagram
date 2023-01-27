const FILE_TYPES = ['jpg', 'jpeg', 'png'];

// const PictureSize = {
//   WIDTH: 600,
//   HEIGHT: 600,
// };

const fileChooser = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview img');
const previewSmall = document.querySelectorAll('.effects__preview');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
      // preview.width = PictureSize.WIDTH;
      // preview.height = PictureSize.HEIGHT;

      previewSmall.forEach((filter) => {
        filter.style.backgroundImage = `url(${reader.result})`;
      });
    });
    reader.readAsDataURL(file);
  }
});
