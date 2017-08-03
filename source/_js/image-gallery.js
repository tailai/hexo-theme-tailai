(function($) {
  'use strict';

  // Resize all images of an image-gallery

  /**
   * ImageGallery
   * @constructor
   */
  var ImageGallery = function() {
    // CSS class located in `source/_css/components/_image-gallery.scss`
    this.$galleries = $('.image-gallery');
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

      this.$galleries.each(function() {
        var $gallery = $(this);
        var $images = $gallery.find('.photo-box img')

        if ($images.length == 1) {
          var onlyImage = $images.first()
          imageWidth = onlyImage.get(0).naturalWidth;
          imageHeight = onlyImage.get(0).naturalHeight;
          onlyImage.parent().parent().css({
            width: imageWidth,
            height: imageHeight
          });
          return ;
        }
        var photoBoxWidth;
        var photoBoxHeight;
        var imageWidth;
        var imageHeight;
        var imageRatio;
        var $image;

        var division = 1;
        var imagesCount = $images.length;
        if (imagesCount == 2 || imagesCount == 4) {
          division = 2
        } else if (imagesCount == 1) {
          division = 1
        } else {
          division = 3
        }

        var galleryWidth = $('.image-gallery').width();

        $images.each(function() {
          $image = $(this);
          imageWidth = $image.get(0).naturalWidth;
          imageHeight = $image.get(0).naturalHeight;
          photoBoxWidth = (galleryWidth - 4 * division) / division
          photoBoxHeight = photoBoxWidth;

          $image.parent().parent().css({
            height: photoBoxWidth,
            width: photoBoxWidth
          });

          if (imageHeight > imageWidth) {
            var ratio = imageHeight / imageWidth;
            $image.css({
              width: photoBoxWidth,
              height: photoBoxWidth * ratio
            });
            $image.parent().css({
              top: '-' + (((photoBoxWidth * ratio) / 2) - (photoBoxHeight / 2)) + 'px'
            });
          } else {
            var ratio = imageWidth / imageHeight;
            $image.css({
              width: photoBoxHeight * ratio,
              height: photoBoxHeight
            });
            $image.parent().css({
              left: '-' + (((photoBoxHeight * ratio) / 2) - (photoBoxHeight / 2)) + 'px',
              right: '-' + (((photoBoxHeight * ratio) / 2) - (photoBoxHeight / 2)) + 'px'
            });
          }
        });
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
