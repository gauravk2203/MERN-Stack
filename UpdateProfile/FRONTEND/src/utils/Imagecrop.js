import cropper from 'cropperjs'


function CropImage (Image) {
    const crooper = new cropper(Image , {
        aspectRatio : 0,
        viewMode : 0,
    })

}

export default CropImage