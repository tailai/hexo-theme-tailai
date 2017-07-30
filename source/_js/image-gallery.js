(function($) {
  'use strict';

  // Resize all images of an image-gallery

  /**
   * ImageGallery
   * @constructor
   */
  var ImageGallery = function() {
    // CSS class located in `source/_css/components/_image-gallery.scss`
    this.photosBox = '.photo-box';
    this.$images = $(this.photosBox + ' img');
  };
  ImageGallery.prototype = {

    /**
     * Run ImageGallery feature
     * @return {void}
     */
    run: function() {
      var self = this;

      // Resize all images at the loading of the page
      self.resizeImages();

      // Resize all images when the user is resizing the page
      $(window).smartresize(function() {
        self.resizeImages();
      });
    },

    /**
     * Resize all images of an image gallery
     * @return {void}
     */
    resizeImages: function() {
      var photoBoxWidth;
      var photoBoxHeight;
      var imageWidth;
      var imageHeight;
      var imageRatio;
      var $image;

      var division = 1;
      var imagesCount = this.$images.length;
      if (imagesCount == 2 || imagesCount ==4) {
        division = 2
      } else if (imagesCount == 1) {
        division = 1
      } else {
        division = 3
      }


      this.$images.each(function() {
        $image = $(this);
        photoBoxWidth = $image.parent().parent().width();
        photoBoxHeight = $image.parent().parent().innerHeight();
        imageWidth = $image.width();
        imageHeight = $image.height();


        photoBoxWidth = photoBoxWidth / division - 4;
        photoBoxHeight = photoBoxWidth;

        $image.parent().parent().css({
          height: photoBoxWidth,
          width: photoBoxWidth
        });

        // Checks if image height is larger than his box
        if (imageHeight > imageWidth && imageHeight > photoBoxHeight) {
          var ratio = imageWidth / photoBoxWidth;
          // Center image in his box
          $image.parent().css({
            top: '-' + (((imageHeight / ratio) / 2) - (photoBoxHeight / 2)) + 'px'
          });
        }

        // Checks if image width is larger than his box
        if (imageWidth > imageHeight && imageWidth > photoBoxWidth) {
          var ratio = imageHeight / photoBoxHeight
          // Center image in his box
          $image.parent().css({
            width: photoBoxWidth * (imageWidth / imageHeight),
            left: '-' + (((imageWidth / ratio) / 2) - (photoBoxWidth / 2)) + 'px'
          });
        }

        // Checks if image height is smaller than his box
        if (imageHeight < photoBoxHeight) {
          imageRatio = (imageWidth / imageHeight);
          // Resize image with the box height
          $image.css({
            height: photoBoxHeight,
            width: (photoBoxHeight * imageRatio)
          });
          // Center image in his box
          $image.parent().css({
            left: '-' + (((photoBoxHeight * imageRatio) / 2) - (photoBoxWidth / 2)) + 'px'
          });
        }

        // Update new values of height and width
        imageWidth = $image.width();
        imageHeight = $image.height();

        // Checks if image width is smaller than his box
        if (imageWidth < photoBoxWidth) {
          imageRatio = (imageHeight / imageWidth);

          $image.css({
            width: photoBoxWidth,
            height: (photoBoxWidth * imageRatio)
          });
          // Center image in his box
          $image.parent().css({
            top: '-' + (((imageHeight) / 2) - (photoBoxHeight / 2)) + 'px'
          });
        }

      });
    }
  };

  $(document).ready(function() {
    if ($('.image-gallery').length) {
      var imageGallery = new ImageGallery();

      // Small timeout to wait the loading of all images.
      setTimeout(function() {
        imageGallery.run();
      }, 500);
    }
  });
})(jQuery);
